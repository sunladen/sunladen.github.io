import sqlite3 from 'sqlite3';
import fs from 'fs';
import crypto from 'crypto';


async function init( dbpath ) {

	const dbinit = fs.existsSync( dbpath );

	db = new sqlite3.Database( dbpath );

	if ( ! dbinit ) {

		await new Promise( res => {

			db.run( 'CREATE TABLE accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, salt TEXT, hash TEXT, lastlogin DATETIME)', res );

			db.run( 'CREATE TABLE characters (id INTEGER PRIMARY KEY AUTOINCREMENT, accountName TEXT, name TEXT)', res );

		} );

	    console.log( `db.init -> Created database ` );

	}

	if ( process.env.ADMINUSER && process.env.ADMINPASS ) {

		if ( ! await Account.getByName( process.env.ADMINUSER ) )

			await Account.create( process.env.ADMINUSER, process.env.ADMINPASS );

	}

}


function close() {

	db.close();

}


const Account = {

	create: async ( name, password ) => {

		if ( await Account.getByName( name ) ) {

			console.log( `WARN: db.Account.create -> '${name}' already exists` );
			return false;

		}

		var salt = crypto.randomBytes( 16 ).toString( 'hex' );
		var hash = crypto.createHmac( 'sha512', salt ).update( password ).digest( 'hex' );

		await new Promise( res => {

			db.run( `INSERT INTO accounts (name, salt, hash) VALUES( "${name}", "${salt}", "${hash}");`, res );

		} );

		return true;

	},


	getByName: async ( name ) => {

		return new Promise( res => {

			db.get( `SELECT salt, hash FROM accounts WHERE name="${name}";`, ( err, row ) => res( row ) );

		} );

	},

	save: async( account ) => {

		return new Promise( res => {

			db.run( `UPDATE accounts SET name = account.name, salt = account.salt, hash = account.hash, lastlogin = account.lastlogin WHERE id = account.id;`, res );

		} );

	}
};


const Character = {

	create: async ( accountName, name ) => {

		if ( await Character.getByName( name ) ) {

			console.log( `WARN: db.Character.create -> '${name}' already exists` );
			return false;

		}

		await new Promise( res => {

			db.run( `INSERT INTO characters (accountName, name) VALUES( "${accountName}", "${name}" );`, res );

		} );

		return true;

	},

	getByAccountName: async ( accountName ) => {

		return new Promise( res => {

			db.get( `SELECT accountName, name FROM characters WHERE accountName="${accountName}";`, ( err, row ) => res( row ) );

		} );

	},

	getByName: async ( name ) => {

		return new Promise( res => {

			db.get( `SELECT accountName, name FROM characters WHERE name="${name}";`, ( err, row ) => res( row ) );

		} );

	},

	save: async( character ) => {

		return new Promise( res => {

			db.run( `UPDATE characters SET accountName = character.accountName, name = character.name WHERE id = character.id;`, res );

		} );

	}

};



var db;


export default { init, close, Account, Character };

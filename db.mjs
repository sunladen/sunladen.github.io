import sqlite3 from 'sqlite3';
import fs from 'fs';
import crypto from 'crypto';


var db;


async function init( dbpath ) {

	// check if database needs initialising
	const dbinit = fs.existsSync( dbpath );

	db = new sqlite3.Database( dbpath );

	if ( ! dbinit ) {

		await new Promise( res => {

			db.run( 'CREATE TABLE accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, salt TEXT, hash TEXT, lastlogin DATETIME)', res );

		} );

	    console.log( `db.init -> Created database ` );

	}

	if ( process.env.ADMINUSER && process.env.ADMINPASS ) {

		if ( ! await accountByName( process.env.ADMINUSER ) )

			await createAccount( process.env.ADMINUSER, process.env.ADMINPASS );

	}

}


async function createAccount( name, password ) {

	if ( await accountByName( name ) ) {

		console.log( `WARN: db.createAccount -> '${name}' already exists` );
		return false;

	}

	var salt = crypto.randomBytes( 16 ).toString( 'hex' );
	var hash = crypto.createHmac( 'sha512', salt ).update( password ).digest( 'hex' );

	await new Promise( res => {

		db.run( `INSERT INTO accounts (name, salt, hash) VALUES( "${name}", "${salt}", "${hash}");`, res );

	} );

	console.log( `db.createAccount -> '${name}', '${password}' ` );

	return true;

}


async function accountByName( name ) {

	return new Promise( res => {

		db.get( `SELECT salt, hash FROM accounts WHERE name="${name}";`, ( err, row ) => res( row ) );

	} );

}



export default { init, createAccount };

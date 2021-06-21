import Database from 'better-sqlite3';
import fs from 'fs';
import crypto from 'crypto';


const datapath = '../.data';
const dbpath = `${datapath}/sqlite.db`;
const dbinit = fs.existsSync( dbpath );


if ( ! fs.existsSync( datapath ) ) fs.mkdirSync( datapath );


const db = new Database( dbpath );


function Account( name, password ) {

	if ( Account.byName.get( name ) ) {

		console.log( `WARN: db.Account.create -> '${name}' already exists` );
		return false;

	}

	var salt = crypto.randomBytes( 16 ).toString( 'hex' );
	var hash = crypto.createHmac( 'sha512', salt ).update( password ).digest( 'hex' );

	Account.insert.run( name, salt, hash );

	return true;

}

Account.table = 'account';
Account.fields = {
	name: 'TEXT',
	salt: 'TEXT',
	hash: 'TEXT',
	lastlogin: 'DATETIME'
};



function Character( accountName, name ) {

	if ( Character.byName.get( name ) ) {

		console.log( `WARN: db.Character.create -> '${name}' already exists` );
		return false;

	}

	Character.insert.run( accountName, name );

	return true;

}

Character.table = 'character';
Character.fields = {
	accountName: 'TEXT',
	name: 'TEXT'
};



function close() {

	db.close();

}


if ( ! dbinit ) {

	for ( var type of [ Account, Character ] ) {

		console.log( type.table, type.fields );

		var createParams = [ 'id INTEGER PRIMARY KEY AUTOINCREMENT' ];
		var insertFields = [];
		var insertValues = [];
		var updateParams = [];

		for ( var field in type.fields ) {

			createParams.push( `${field} ${type.fields[ field ]}` );
			insertFields.push( `${field}` );
			insertValues.push( '?' );
			updateParams.push( `${field}=$${field}` );

		}

		db.prepare( `CREATE TABLE ${type.table} (${createParams.join( ', ' )});` ).run();

		type.insert = db.prepare( `INSERT INTO ${type.table} (${insertFields.join( ', ' )}) VALUES (${insertValues.join( ', ' )});` );
		type.update = db.prepare( `UPDATE ${type.table} SET ${updateParams.join( ', ' )} WHERE id=$id;` );

		for ( var field in type.fields ) {

			type[ `by${field[ 0 ].toUpperCase() + field.substr( 1 )}` ] = db.prepare( `SELECT * FROM ${type.table} WHERE ${field}=?;` );

		}

	}

}

if ( process.env.ADMINUSER && process.env.ADMINPASS ) {

	if ( ! Account.byName.get( process.env.ADMINUSER ) ) {

		Account( process.env.ADMINUSER, process.env.ADMINPASS );

	}

}


export default { close, Account, Character };

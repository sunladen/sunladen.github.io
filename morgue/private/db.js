import Database from 'better-sqlite3';
import fs from 'fs';
import crypto from 'crypto';


const types = [];


const Account = Type( 'Account',
	{
		name: 'TEXT',
		salt: 'TEXT',
		hash: 'TEXT'
	},
	( name, password ) => {

		if ( ! Account.byName( name ).length ) return console.log( `WARN: Account with name '${name}' already exists` ) && false;

		var salt = crypto.randomBytes( 16 ).toString( 'hex' );
		var hash = crypto.createHmac( 'sha512', salt ).update( password ).digest( 'hex' );

		return Account.insert( name, salt, hash );

	},
	account => [ 'account', account.accountId, account.name ]
);


const AccountContainer = Type( 'AccountContainer',
	{
		accountId: 'INTEGER',
		containerId: 'INTEGER'
	},
	( accountId, containerId ) => AccountContainer.insert( accountId, typeof containerId !== 'number' ? 1 : containerId ),
	accountcontainer => [ 'accountcontainer', accountcontainer.accountId, accountcontainer.containerId ]
);



const Container = Type( 'Container',
	{
		name: 'TEXT',
		parentId: 'INTEGER',
		x: 'INTEGER',
		y: 'INTEGER'
	},
	( name, parentId, x, y ) => {

		x = typeof x === 'number' ? x : 0;
		y = typeof y === 'number' ? y : 0;

		return Container.insert( name, typeof parentId !== 'number' ? 1 : parentId, x, y );

	},
	container => [ 'container', container.containerId, container.name, container.parentId, container.x, container.y ]
);





function close() {

	db.close();

}





const datapath = '../.data';
const dbpath = `${datapath}/sqlite.db`;
const dbinit = fs.existsSync( dbpath );

if ( ! fs.existsSync( datapath ) ) fs.mkdirSync( datapath );

const db = new Database( dbpath );


function Type( name, fields, constructor, serialise, customQueries ) {

	constructor.type = name;
	constructor.fields = fields;
	constructor.serialise = serialise;
	constructor.customQueries = customQueries;
	types.push( constructor );
	return constructor;

}


if ( ! dbinit ) {

	for ( var type of types ) {

		var idField = `${type.type[ 0 ].toLowerCase()}${type.type.substr( 1 )}Id`;

		var createParams = [ `${idField} INTEGER PRIMARY KEY AUTOINCREMENT`, 'type TEXT', 'lastupdated DATETIME' ];

		for ( var field in type.fields ) createParams.push( `${field} ${type.fields[ field ]}` );

		db.prepare( `CREATE TABLE ${type.type} (${createParams.join( ', ' )});` ).run();

	}

}



for ( var type of types ) {

	var insertFields = [];
	var insertValues = [];
	var updateParams = [];

	for ( var field in type.fields ) {

		insertFields.push( `${field}` );
		insertValues.push( '?' );
		updateParams.push( `${field}=$${field}` );

	}

	var idField = `${type.type[ 0 ].toLowerCase()}${type.type.substr( 1 )}Id`;

	type.statement = {
		insert: db.prepare( `INSERT INTO ${type.type} (lastupdated, type, ${insertFields.join( ', ' )}) VALUES (CURRENT_TIMESTAMP, '${type.type}', ${insertValues.join( ', ' )}) RETURNING *;` ),
		update: db.prepare( `UPDATE ${type.type} SET lastupdated=CURRENT_TIMESTAMP, ${updateParams.join( ', ' )} WHERE ${idField}=$${idField};` ),
		all: db.prepare( `SELECT * FROM ${type.type};` )
	};

	( type => {

		if ( ! type.insert ) type.insert = ( ...args ) => {

			var row = type.statement.insert.get( ...args );
			console.log( `INFO: ${type.type} ->`, row );
			return row;

		};

		if ( ! type.update ) type.update = ( ...args ) => type.statement.update.run( ...args );
		if ( ! type.all ) type.all = () => type.statement.all.all();

		var fields = Object.assign( {}, type.fields );

		fields[ idField ] = null;

		for ( var field in fields ) {

			var byField = `by${field[ 0 ].toUpperCase()}${field.substr( 1 )}`;

			type.statement[ byField ] = db.prepare( `SELECT * FROM ${type.type} WHERE ${field}=?;` );
			type.statement[ byField ] = db.prepare( `SELECT * FROM ${type.type} WHERE ${field}=?;` );

			if ( ! type.hasOwnProperty( byField ) ) ( byField => {

				type[ byField ] = value => type.statement[ byField ].all( value );

			} )( byField );

		}

		if ( type.customQueries ) {

			for ( var customQuery in type.customQueries ) {

				var definition = type.customQueries[ customQuery ];

				type.statement[ customQuery ] = db.prepare( definition.query );

				type[ customQuery ] = definition.fn;

			}

		}

	} )( type );

}



if ( ! Container.byContainerId( 1 ).length ) Container( 'root', 0 );

for ( var container of Container.all() ) console.log( container );

process.env.ADMINUSER && process.env.ADMINPASS && ! Account.byName( process.env.ADMINUSER ).length && Account( process.env.ADMINUSER, process.env.ADMINPASS );

process.on( 'SIGINT', () => db.close() );

export default { close, Account, AccountContainer, Container };

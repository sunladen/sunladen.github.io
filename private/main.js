import crypto from 'crypto';
import db from './db.js';
import Server from './server.js';


const blacklisted_names = [ 'admin', 'system', 'guest', 'sunladen' ];
const known_names = [];
const identified = {};
const loggedin = {};



const server = new Server();


process.on( 'SIGINT', () => {

	console.log( 'SIGINT received, stopping...' );
	server.close();
	process.exit();

} );


server.on( 'connected', ws => {

} );


server.on( 'reconnected', ws => {

	sendCompleteState( ws );

} );


server.on( 'identify', ( ws, id ) => {

	if ( id.length < 3 ) return server.send( [ 'error', `id '${id}' not long enough, must be between 3 and 12 characters` ], ws.id );
	if ( id.length > 12 ) return server.send( [ 'error', `id '${id}' too long, must be between 3 and 12 characters` ], ws.id );

	var welcome = ! identified.hasOwnProperty( id );
	var err;

	if ( ! welcome && server.session_id[ ws.session ] !== id ) return server.send( [ 'error', `'${id}' not available` ], ws.id );

	if ( welcome && ! id.startsWith( 'Guest-' ) ) {

		err = `Not logged in as '${id}'`;
		id = ws.id;

	}

	if ( ws.id !== id ) delete server.clients[ ws.id ];

	ws.id = id;
	server.clients[ ws.id ] = ws;
	identified[ id ] = ws;
	server.session_id[ ws.session ] = id;

	server.send( [ 'identify', id, err ], ws.id );

	if ( id.startsWith( 'Guest-' ) ) sendCompleteState( ws );

	if ( welcome ) server.send( [ 'welcome', id ] );

} );


function sendCompleteState( ws ) {

	var character = db.Container.byName( ws.id );
	character = character.length ? character[ 0 ] : db.Container( ws.id, 1 );
	var parent = db.Container.byContainerId( character.parentId )[ 0 ];
	server.send( db.Container.serialise( parent ), ws.id );

	for ( var container of db.Container.byParentId( character.parentId ) )
		server.send( db.Container.serialise( container ), ws.id );

	server.send( db.Container.serialise( character ) );

}



const re_tags = /(<([^>]+)>)/ig;
const re_name = /@([\w-]+)/ig;

server.on( 'say', ( ws, message ) => {

	// remove XML/HTML markup from message
	message = message.replace( re_tags, '' );

	// markup referenced names
	message = message.replace( re_name, ( match, name ) => known_names.hasOwnProperty( name ) ? `@${name}` : `@&#8203;${name}` );

	server.send( [ 'say', message, ws.id ] );

} );



server.on( 'register', ( ws, name, password ) => {

	for ( var i = 0; i < blacklisted_names.length; i ++ )
		if ( name.toLowerCase().indexOf( blacklisted_names[ i ] ) > - 1 ) return server.send( [ 'error', `Name '${name}' not available` ], ws.id );

	if ( server.clients.hasOwnProperty( name ) && server.clients[ name ] !== ws ) return server.send( [ 'error', `Name '${name}' not available` ], ws.id );

	if ( db.Account.byName( name ).length ) return server.send( [ 'error', `Name '${name}' not available` ], ws.id );

	db.Account( name, password );

	server.send( [ 'success', `Successfully registered. Login to continue as '${name}'.` ], ws.id );

} );



server.on( 'login', ( ws, name, password ) => {

	if ( identified.hasOwnProperty( name ) ) return server.send( [ 'error', `Name '${name}' already logged in` ], ws.id );

	var account = db.Account.byName( name );

	if ( ! account.length ) return server.send( [ 'error', 'Invalid username or password' ], ws.id );

	account = account[ 0 ];

	var hash = crypto.createHmac( 'sha512', account.salt ).update( password ).digest( 'hex' );

	if ( hash !== account.hash ) return server.send( [ 'error', 'Invalid username or password' ], ws.id );

	db.Account.update( account );

	if ( server.clients.hasOwnProperty( ws.id ) ) delete server.clients[ ws.id ];
	if ( identified.hasOwnProperty( ws.id ) ) delete identified[ ws.id ];
	if ( loggedin.hasOwnProperty( ws.id ) ) delete loggedin[ ws.id ];

	var character = db.Container.byName( name );

	if ( ! character.length ) {

		character = db.Container.byName( ws.id );

		if ( character.length ) {

			character = character[ 0 ];
			db.AccountContainer( account.accountId, character.containerId );
			character.name = name;
			db.Container.update( character );

		} else {

			character = db.Container( name );
			character = character[ 0 ];

		}

	}

	if ( ws.character && ws.character.containerId !== character.containerId ) {

		var message = db.Container.serialise( ws.character );
		message.unshift( 'remove' );
		server.send( message );

	}

	ws.character = character;

	server.send( db.Container.serialise( ws.character ) );

	ws.id = name;

	server.session_id[ ws.session ] = ws.id;
	server.clients[ ws.id ] = ws;
	identified[ ws.id ] = ws;
	known_names[ ws.id ] = null;

	server.send( [ 'ident', name ], ws.id );
	server.send( [ 'welcome', name ] );

} );



server.on( 'logout', ( ws ) => {

	if ( ! loggedin.hasOwnProperty( ws.id ) ) return server.send( [ 'error', `Not logged in` ], ws.id );

	delete identified[ ws.id ];
	delete loggedin[ ws.id ];

	server.disconnect( ws.id );

} );


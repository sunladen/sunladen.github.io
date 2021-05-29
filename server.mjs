'use strict';

import WebSocket from 'ws';
import http from 'http';
import fs from 'fs';
import crypto from 'crypto';
import db from './db.mjs';
import api from './api.mjs';
import encoding from './encoding.mjs';


const CLIENT_UPDATE_INTERVAL = 10000;
const ws_connection = {};
const ws_identified = {};
const ws_sessions = {};
const ws_loggedin = {};
const requests = {};

const blacklisted_names = [ 'admin', 'sunladen' ];
const known_names = [];

const datapath = './.data';
const dbpath = `${datapath}/sqlite.db`;


var wss;


api.ident = ( ws, id, err ) => {

	if ( ! nameIsValid( ws, id, true ) ) return;

	if ( ws_connection.hasOwnProperty( ws.id ) ) delete ws_connection[ ws.id ];

	console.log( `ws_identified[ '${id}' ] = ws;` );

	var welcome = ! ws_identified.hasOwnProperty( id );
	var err;

	if ( welcome && ! id.startsWith( 'Guest-' ) ) {

		err = `Not logged in as '${id}'`;
		id = ws.id;

	}

	known_names[ id ] = null;

	ws.id = id;
	ws_identified[ id ] = ws;
	ws_sessions[ ws.session_id ] = id;

	api.send( ws, 'ident', id, err );

	if ( welcome ) broadcast( null, [ 'welcome', id ] );

};




requests.say = ( ws, message ) => {

	// remove XML/HTML markup from message
	message = message.replace( re_tags, '' );

	// markup referenced names
	message = message.replace( re_name, ( match, name ) => {

		return known_names.hasOwnProperty( name ) ? `@${name}` : `@&#8203;${name}`;

	} );

	broadcast( null, [ 'say', message, ws.id ] );

};




requests.register = async ( ws, name, password ) => {

	if ( ! await nameIsValid( ws, name ) ) return;

	await db.createAccount( name, password );

	send( ws, [ 'success', `Successfully registered. Login to continue as '${name}'.` ] );

};




requests.login = async ( ws, name, password ) => {

	if ( ws_identified.hasOwnProperty( name ) ) {

		return send( ws, [ 'error', `Name '${name}' already logged in` ] );

	}

	var account = await db.accountByName( name );

	if ( ! account ) return send( ws, [ 'error', 'Invalid username or password (1)' ] );

	var hash = crypto.createHmac( 'sha512', account.salt ).update( password ).digest( 'hex' );

	if ( hash !== account.hash ) return send( ws, [ 'error', 'Invalid username or password (2)' ] );

	if ( ws_connection.hasOwnProperty( ws.id ) ) delete ws_connection[ ws.id ];
	if ( ws_identified.hasOwnProperty( ws.id ) ) delete ws_identified[ ws.id ];
	if ( known_names.hasOwnProperty( ws.id ) ) delete known_names[ ws.id ];

	ws.id = name;

	ws_identified[ ws.id ] = ws;
	ws_sessions[ ws.session_id ] = ws.id;
	ws_loggedin[ ws.id ] = ws;
	known_names[ ws.id ] = null;

	api.send( ws, 'ident', ws.id );
	broadcast( null, [ 'welcome', id ] );

};



requests.logout = async ( ws ) => {

	if ( ! ws_loggedin.hasOwnProperty( ws.id ) ) return send( ws, [ 'error', `Not logged in` ] );

};



function send( ws, message ) {

	console.log( `${ws.id} -> `, message );

	ws.send( encoding.encode( message ) );

}



function broadcast( origin_ws, message ) {

	var origin_id = origin_ws ? origin_ws.id : '';
	var encoded_message = encoding.encode( message );

	console.log( `${origin_id} -> broadcast`, message );

	wss.clients.forEach( ws => {

		if ( ws !== origin_ws ) ws.send( encoded_message );

	} );

}


const re_tags = /(<([^>]+)>)/ig;
const re_name = /@([\w-]+)/ig;


async function nameIsValid( ws, name, self_identity ) {

	if ( name.length < 3 ) {

		send( ws, [ 'error', `Name '${name}' not long enough, must be between 3 and 12 characters` ] );
		return false;

	}

	if ( name.length > 12 ) {

		send( ws, [ 'error', `Name '${name}' too long, must be between 3 and 12 characters` ] );
		return false;

	}

	for ( var i = 0; i < blacklisted_names.length; i ++ ) {

		if ( name.toLowerCase().indexOf( blacklisted_names[ i ] ) > - 1 ) {

			send( ws, [ 'error', `Name '${name}' not available` ] );
			return false;

		}

	}

	if ( self_identity ) return true;

	if ( ws_identified.hasOwnProperty( name ) ) {

		send( ws, [ 'error', `Name '${name}' not available` ] );
		return false;

	}

	if ( await db.accountByName( name ) ) {

	    send( ws, [ 'error', `Name '${name}' not available` ] );
		return false;

	}


	return true;

}



// create .data directory if it doesn't exist
if ( ! fs.existsSync( datapath ) ) fs.mkdirSync( datapath );


( async () => {

	await db.init( dbpath );

	process.on( "SIGINT", () => {

		console.log( "SIGINT received, stopping..." );
		broadcast( null, [ 'say', null, 'Server shut down' ] );
		db.close();
		process.exit();

	} );


	const httpserver = http.createServer( ( req, res ) => {

		if ( "GET" === req.method ) {

			var content = "";

			try {

				var filepath = "." + ( ( "/" === req.url ) ? "/index.html" : req.url );

				content = fs.readFileSync( filepath );

				res.writeHead( 200, {
					"Content-Type": {
						html: "text/html",
						js: "text/javascript",
						mjs: "text/javascript",
						css: "text/css",
						json: "application/json"
					}[ filepath.split( "." ).pop().toLowerCase() ] || "text/*"
				} );

			} catch ( err ) {

				res.code = "ENOENT" === err.code ? 404 : 500, res.writeHead( res.code, { "Content-Type": "text/html" } ), content = "<!doctype html><html><head><title>PBBG</title></head><body>" + err.message + "</body></html>";

			}

			return res.end( content, "utf-8" );

		}

	} );


	httpserver.listen( process.env.PORT || 7714, () => {

		console.log( `Server started on ${process.env.PORT ? 'port ' + process.env.PORT : 'http://localhost:7714'}` );

	} );

	wss = new WebSocket.Server( { server: httpserver } );

	const re_session_id = /[?&]{1}session=(\w+)/;

	wss.on( 'connection', ( ws, req ) => {

		console.log( `connection -> ${req.url}` );

		if ( re_session_id.test( req.url ) ) {

			ws.session_id = re_session_id.exec( req.url )[ 1 ];

			if ( ws_sessions.hasOwnProperty( ws.session_id ) ) {

				ws.id = ws_sessions[ ws.session_id ];
				ws_identified[ ws.id ] = ws;
		        if ( ws_loggedin.hasOwnProperty( ws.id ) ) ws_loggedin[ ws.id ] = ws;

			}

		}

		console.log( `(1) ws.id = ${ws.id}` );

		ws.id = ws.id ? ws.id : 'Guest-' + Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 );
		console.log( `(2) ws.id = ${ws.id}` );
		ws.last_heard = ( new Date() ).getTime();

		ws.on( 'pong', () => {

			if ( ! ws_identified.hasOwnProperty( ws.id ) ) return;
			ws_identified[ ws.id ].last_heard = ( new Date() ).getTime();

		} );

		ws.on( 'message', message => api.receive( ws, message ) );

		if ( ws_identified.hasOwnProperty( ws.id ) ) {

			console.log( `${ws.id} reconnected` );

		} else {

	    	ws_connection[ ws.id ] = ws;
	    	ws.session_id = Math.floor( ( 1 + Math.random() ) * 0x1000000000000000 ).toString( 16 );
	    	console.log( `${ws.id} connected` );
	    	ws_sessions[ ws.session_id ] = ws.id;

		}

		send( ws, [ 'connected', ws.id, ws.session_id ] );

	} );



	setInterval( () => {

		var expired = ( new Date() ).getTime() - CLIENT_UPDATE_INTERVAL * 2;

		for ( const id in ws_connection ) {

			var ws = ws_connection[ id ];

			if ( ws.last_heard < expired ) {

				console.log( `${id} failed to identify` );
				var session_id = ws_connection[ id ].session_id;
				if ( ws_sessions.hasOwnProperty( session_id ) ) delete ws_sessions[ session_id ];
				delete ws_connection[ id ];
				ws.terminate();

			}

		}

		for ( const id in ws_identified ) {

			var ws = ws_identified[ id ];

			console.log( `${ws.id} last_heard ${ws.last_heard - expired}` );

			if ( ws.last_heard < expired ) {

				var session_id = ws_identified[ id ].session_id;

				delete ws_identified[ id ];

				if ( ws_sessions.hasOwnProperty( session_id ) ) delete ws_sessions[ session_id ];
				if ( ws_loggedin.hasOwnProperty( id ) ) delete ws_loggedin[ id ];

				console.log( `${ws.id} disconnected, ${id}` );
				broadcast( ws, [ 'disconnected', id ] );

				ws.terminate();

			}

			ws.ping();

		}

	}, CLIENT_UPDATE_INTERVAL );

} )();


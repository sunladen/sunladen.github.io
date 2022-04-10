import { WebSocketServer } from 'ws';
import crypto from 'crypto';


const wss = new WebSocketServer( { port: process.env.PORT } );


wss.on( 'connection', ws => {

	ws.on( 'message', message => {

		try {

			message = JSON.parse( message );

		} catch ( e ) {

			return;

		}

		console.log( 'received: %s', message );

		if ( message.type === 'identity' ) {

			identified.hasOwnProperty( ws.id ) && delete identified[ ws.id ];

			var id = message.value;

			ws.id = id ?? `client-${uuid()}`;

			identified[ ws.id ] = ws;

			console.log( `client ${ws.id} connected` );
			send( { type: 'identity', value: ws.id }, ws.id );
			send( { type: 'contents', value: contents }, ws.id );
			ws.last_heard = ( new Date() ).getTime();
			ws.on( 'pong', () => {

				identified.hasOwnProperty( ws.id ) && ( identified[ ws.id ].last_heard = ( new Date() ).getTime() );

			} );

		}

	} );

} );


const uuid = ( bytes = 16 ) => crypto.randomBytes( bytes ).toString( "hex" );


const identified = {};
const CLIENT_PING_INTERVAL = 10000;
const CLIENT_UPDATE_INTERVAL = 2000;


var messages = {};


setInterval( () => {

	var expired = ( new Date() ).getTime() - ( CLIENT_PING_INTERVAL * 2 );

	for ( const id in identified ) {

		var ws = identified[ id ];

		if ( ws.last_heard >= expired ) {

			ws.ping();
			continue;

		}

		disconnect( id );

	}

}, CLIENT_PING_INTERVAL );


setInterval( () => {

	const _messages = Object.assign( {}, messages );

	messages = {};

	const _global = _messages.global || [];
	const _global_stringified = JSON.stringify( _global );

	for ( const id in identified ) {

		var ws = identified[ id ];

		if ( _messages.hasOwnProperty( id ) ) {

			ws.send( JSON.stringify( _messages[ id ].concat( _global ) ) );

		} else if ( _global.length ) {

			ws.send( _global_stringified );

		}

	}

}, CLIENT_UPDATE_INTERVAL );



function disconnect( id ) {

	if ( ! identified.hasOwnProperty( id ) ) return;

	const ws = identified[ id ];
	delete identified[ id ];
	console.log( `client "${id}" disconnected` );
	send( { type: 'remove', value: id } );
	ws.terminate();

}


function send( message, target = 'global' ) {

	( messages.hasOwnProperty( target ) ? messages[ target ] : messages[ target ] = [] ).push( message );

}



const contents = {
	'camp': {
		name: 'camp',
		contents: {
			'firepit': {
				name: 'firepit',
				contents: {
					'fire': {
						name: 'fire',
						contents: {
							'hatchet head': {
								name: 'hatchet head',
								contents: {
									'metal': {
										weight: 1.5
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

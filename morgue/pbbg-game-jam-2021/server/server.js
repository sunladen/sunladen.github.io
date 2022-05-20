import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import RBush from './rbush.js';

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

			if ( identified.hasOwnProperty( ws.id ) ) {

				ws.spatial = identified[ ws.id ].spatial;

			} else {

				ws.spatial = new SpatialItem( ws.id );
				spiralNonblockedLocation( ws.spatial );
				tree.insert( ws.spatial );

			}

			identified[ ws.id ] = ws;

			console.log( `client ${ws.id} connected` );
			send( { type: 'identity', value: ws.id }, ws.id );

			const itemIds = Object.keys( items );

			for ( var id of itemIds ) id !== ws.id && send( { type: 'item', value: items[ id ] }, ws.id );

			send( { type: 'item', value: ws.spatial } );

			ws.last_heard = ( new Date() ).getTime();
			ws.on( 'pong', () => {

				identified.hasOwnProperty( ws.id ) && ( identified[ ws.id ].last_heard = ( new Date() ).getTime() );

			} );

		} else if ( message.type === 'move' ) {

			move( message.value.id, message.value.x, message.value.y );

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

class SpatialItem {

	constructor( id, x = 0, y = 0, width = 20, height = 20 ) {

		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.update();

		items[ id ] = this;

	}

	setXY( x = 0, y = 0, update = true ) {

		this.x = x;
		this.y = y;
		this.update( update );

	}

	setWidthHeight( width = 20, height = 20 ) {

		this.width = width;
		this.height = height;
		this.update();

	}

	update( update = true ) {

		if ( update && this.inTree ) tree.remove( this );
		this.minX = this.x - this.width * 0.5;
		this.maxX = this.x + this.width * 0.5;
		this.minY = this.y - this.height * 0.5;
		this.maxY = this.y + this.height * 0.5;
		if ( update ) {

			tree.insert( this );
			this.inTree = true;

		}

	}

}

const tree = new RBush();
const items = {};

function spiralNonblockedLocation( item ) {

	var dx = 0, dy = 0, layer = 1, leg = 0;

	while ( tree.collides( item ) ) {

		if ( leg === 0 ) ( dx += item.width ) >= layer * item.width && ++ leg;
		else if ( leg === 1 ) ( dy += item.height ) >= layer * item.height && ++ leg;
		else if ( leg === 2 ) - ( dx -= item.width ) >= layer * item.width && ++ leg;
		else if ( - ( dy -= item.height ) >= layer * item.height ) {

			leg = 0;
			++ layer;

		}

		item.setXY( item.x + dx, item.y + dy, false );

	}

}

function move( id, toX, toY ) {

	const item = items[ id ];
	item.setXY( toX, toY );
	send( { type: 'move', value: { id: id, toX: toX, toY: toY } } );

}

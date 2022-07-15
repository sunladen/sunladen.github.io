import { WebSocketServer } from 'ws';
import crypto from 'crypto';

const port = process.env.PORT;
const verifyClient = ( info ) => [ 'http://localhost:8000', 'https://sunladen.github.io' ].indexOf( info.req.headers.origin ) > - 1;
const secretRE = /[?&]{1}secret=([0-9a-fA-F]{8})/;
const wss = new WebSocketServer( { port, verifyClient } );

wss.on( 'connection', ( ws, req ) => {

	console.log( `-> ${req.url}` );

	let secret = secretRE.exec( req.url );
	ws.secret = secret ? secret[ 1 ] : null;
	ws.id = ws.secret in wsBySecret ? wsBySecret[ ws.secret ].id : null;
	if ( ws.secret in wsBySecret ) {
		ws.id = wsBySecret[ ws.secret ].id;
	} else {
		while ( ! ws.id || ws.id in wsById ) ws.id = uuid();
		while ( ! ws.secret || ws.secret in wsBySecret ) ws.secret = uuid();
	}

	console.log( ws.id, ws.secret );

	ws.on( 'message', ( data ) => {

		try {

			ws.timestamp = Date.now();
			console.log( `-> ${data}` );
			const messages = JSON.parse( data );
			for ( const message of ( messages.constructor !== Array ) ? [ messages ] : messages ) inMessages.push( { message: message, from: ws.id } );

		} catch ( e ) {
			console.error( e );
		}

	} );

	ws.timestamp = Date.now();

	send( 'verified', { id: ws.id, secret: ws.secret }, ws.id );

	if ( ! ( ws.id in wsById ) ) {
	    send( 'connected', { id: ws.id } );
		connected( ws.id );
	}

	wsById[ ws.id ] = wsBySecret[ ws.secret ] = ws;

} );

const wsById = {};
const wsBySecret = {};

function uuid( bytes = uuid.size, id ) {

	while ( ! id || id in uuid.used ) id = crypto.randomBytes( bytes ).toString( 'hex' );
	return uuid.used[ id ] = id;

}

uuid.size = 4;
uuid.used = {};

let inMessages = [];
let outMessages = [];

const updateInterval = 3333;

setInterval( () => {

	try {

		const _inMessages = inMessages;
		inMessages = [];

		for ( const _in of _inMessages ) this[ `on${_in.message._}` ]( _in.message, _in.from );

		const disconnectedHorizon = Date.now() - updateInterval * 2;

		for ( const id in wsById ) {
			const ws = wsById[ id ];
			if ( ws.timestamp < disconnectedHorizon ) {
			    delete wsById[ id ];
			    delete wsBySecret[ ws.secret ];
			    disconnected( id );
			    ws.terminate();
				send( 'disconnected', { id } );
			}
		}

		//update();

		const _outMessages = outMessages;
		outMessages = {};

		const _global = _outMessages.global || [];
		const sent = {};

		for ( const id in _outMessages ) {

			if ( ! ( id in wsById ) ) continue;

			const ws = wsById[ id ];
			const message = JSON.stringify( _global.length ? _outMessages[ id ].concat( _global ) : _outMessages[ id ] );
			ws.send( message );
			console.log( '<- %s', message );
			sent[ id ] = null;

		}

		if ( ! _global.length ) return;

		const message = JSON.stringify( _global );

		for ( const id in wsById ) {
			if ( id in sent ) continue;
			const ws = wsById[ id ];
			ws.send( message );
			console.log( '<- %s', message );
		}

	} catch ( e ) {
		console.error( e );
	}

}, updateInterval );

function send( _, message, to = 'global' ) {

	message._ = _;
	( to in outMessages ? outMessages[ to ] : ( outMessages[ to ] = [] ) ).push( message );

}

function connected( id ) {

}

function disconnected( id ) {

}

class Entity {

	constructor( args = {} ) {

		Object.assign( this, args );

		this.id || ( this.id = uuid() );
		this.type = this.constructor.name;
		this.name || ( this.name = '[Unnamed]' );
		this.parent = null;
		this.contents = [];
		this.world = { id: this.id, type: this.type, name: this.name, contents: [] };
		this.delta = this.world;

		entitiesById[ this.id ] = this;
		dirtyEntities[ this.id ] = this;

	}

	setProperty( property, value ) {

		if ( this[ property ] === value ) return;
		let worldValue = this[ property ] = value;
		property === 'parent' ? worldValue = value.id : typeof value === 'number' && ( worldValue = ( Math.round( value * 100 ) / 100 ).toFixed( 2 ) );
		this.world[ property ] !== worldValue && ( this.world[ property ] = this.delta[ property ] = worldValue, dirtyEntities[ this.id ] = this );

	}

	add( entity ) {

		if ( entity.parent === this ) return;
		if ( entity.parent ) {

			const index = entity.parent.contents.indexOf( entity );
			if ( index > - 1 ) entity.parent.contents.splice( index, 1 );

		}

		entity.setProperty( 'parent', this );
		this.contents.push( entity );

	}

}

const entitiesById = {};
const playersById = {};
const dirtyEntities = {};

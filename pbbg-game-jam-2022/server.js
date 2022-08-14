import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import fs from 'fs';

let entitiesById = {};
let entitiesByType = {};
let dirtyEntities = {};

function connected( id ) {

	let player;
	player = id in entitiesByType[ 'Player' ] ? entitiesByType[ 'Player' ][ id ] : new Player( { id } );
	//if ( ! player.containsName( /^Hatchet$/ ) ) player.add( new Hatchet() );
	if ( ! player.parent ) playerspawn.add( player );

}

function disconnected( id ) {

	const player = entitiesByType[ 'Player' ][ id ];
	save( player );
	player.destroy();
	delete entitiesByType[ 'Player' ][ id ];

}

function load( file ) {

	if ( ! fs.existsSync( file ) ) return null;

	const data = JSON.parse( fs.readFileSync( file ) );
	const parent = {};

	let first;

	for ( const type of Object.keys( data ) ) {

		const Class = eval( type );

		for ( const e of data[ type ] ) {

			const id = e[ 0 ];
			const name = e[ 1 ];
			const parentId = e[ 2 ];
			const entity = id in entitiesById ? entitiesById[ id ] : new Class( { id, name } );
			if ( ! first ) first = entity;
			parentId && ( parent[ entity.id ] = parentId );

		}

	}

	for ( const id in parent ) parent[ id ] in entitiesById && entitiesById[ parent[ id ] ].add( entitiesById[ id ] );

	return first;

}

function loadPlayerBySecret( secret ) {

	if ( ! secret ) return;

	console.log( `loadPlayerBySecret( "${secret}" )` );

	for ( const file of fs.readdirSync( '.data/players' ) ) {

		if ( file.startsWith( `${secret}-` ) ) return load( `.data/players/${file}` );

	}

}

function save( entity, data = {} ) {

	if ( ! entity ) return;

	if ( entity.type === 'Player' ) data = {};

	entity.type in data || ( data[ entity.type ] = [] );
	data[ entity.type ].push( [ entity.id, entity.name, entity.parent ? entity.parent.id : null ] );

	for ( const content of entity.contents ) save( content, data );

	if ( entity.type === 'Entity' ) {
		fs.writeFileSync( '.data/world.json', JSON.stringify( data ) );
	} else if ( entity.type === 'Player' ) {
		fs.writeFileSync( `.data/players/${wsById[ entity.id ].secret}-${entity.name}.json`, JSON.stringify( data ) );
	}

	return data;

}

class Entity {

	constructor( args = {} ) {

		Object.assign( this, args );

		this.id || ( this.id = uuid() );
		this.type = this.constructor.name;
		this.name || ( this.name = '[Unnamed]' );
		this.value = null;
		this.parent = null;
		this.contents = [];
		this.world = { id: this.id, type: this.type, name: this.name, contents: [] };
		this.delta = { type: this.type, name: this.name };

		if ( ! ( this.type in entitiesByType ) ) entitiesByType[ this.type ] = {};
		entitiesByType[ this.type ][ this.id ] = entitiesById[ this.id ] = this;
		dirtyEntities[ this.id ] = this;

	}

	setProperty( property, value ) {

		if ( this[ property ] === value ) return;
		let worldValue = this[ property ] = value;
		property === 'parent' ? worldValue = value.id : typeof value === 'number' && ( worldValue = ( Math.round( value * 100 ) / 100 ).toFixed( 2 ) );
		this.world[ property ] !== worldValue && ( this.world[ property ] = this.delta[ property ] = worldValue, dirtyEntities[ this.id ] = this );

	}

	add( entity ) {

		console.log( `add; ${entity.name}(${entity.id}) -> ${this.name}(${this.id})` );

		if ( entity.parent === this ) return;
		if ( entity.parent ) {

			const index = entity.parent.contents.indexOf( entity );
			if ( index > - 1 ) entity.parent.contents.splice( index, 1 );

		}

		entity.setProperty( 'parent', this );

		const index = this.contents.indexOf( entity );
		if ( index === - 1 ) {
			this.contents.push( entity );
			this.world.contents.push( entity.world );
		}

		return entity;

	}

	destroy() {
		if ( this.parent ) {
			for ( const content of this.contents ) this.parent.add( content, true );
			const siblings = this.parent.contents;
			const index = siblings.indexOf( this );
			if ( index > - 1 ) siblings.splice( index, 1 );
		}
		if ( this.id in dirtyEntities ) delete dirtyEntities[ this.id ];
		send( 'destroy', { id: this.id } );
		this.destroyed = true;
	}

	update() {

		this.delta.id = this.id;
		send( null, this.delta );
		this.delta = {};
	}

	containsName( regex ) {

		for ( const content of this.contents ) if ( regex.test( content.name ) ) return content;

	}

}

class Location extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: '[Unnamed location]' }, args ) );

	}

}

class Player extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: `Guest-${args.id}` }, args ) );

	}

}

class NPC extends Entity {

	constructor( args = {} ) {

		super( Object.assign( {}, args ) );
		if ( ! ( 'NPC' in entitiesByType ) ) entitiesByType[ 'NPC' ] = {};
		entitiesByType[ 'NPC' ][ this.id ] = this;

	}

}

class Rabbit extends NPC {

	constructor( args = {} ) {

		super( Object.assign( { name: `Rabbit` }, args ) );

	}

}

class Hatchet extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: 'Hatchet' }, args ) );

	}

}

function buildNewWorld() {

	entitiesById = {};
	entitiesByType = {};
	const world = new Entity();
	playerspawn = world.add( new Location( { name: 'Start Location' } ) );

	function playerspawnUpdate() {

		if ( ! playerspawn.containsName( /^Rabbit$/ ) ) {
		 	playerspawn.add( new Rabbit() );
		// 	playerspawn.add( new Rabbit() );
		// 	playerspawn.add( new Rabbit() );
		// 	playerspawn.add( new Rabbit() );
		// 	playerspawn.add( new Rabbit() );
		}

		dirtyEntities[ this.id ] = this;

	}

	playerspawn.update = playerspawnUpdate.bind( playerspawn );

	return world;

}

function uuid( bytes = uuid.size, id ) {

	while ( ! id || id in uuid.used ) id = crypto.randomBytes( bytes ).toString( 'hex' );
	return uuid.used[ id ] = id;

}

uuid.size = 4;
uuid.used = {};

if ( ! fs.existsSync( '.data/players' ) ) fs.mkdirSync( '.data/players', { recursive: true } );

let playerspawn;
let world = load( '.data/world.json' ) || buildNewWorld();
world = buildNewWorld();

process.on( 'exit', () => save( world ) );
process.on( 'SIGINT', () => process.exit( 2 ) );
process.on( 'uncaughtException', ( e ) => { console.log( e.stack ); process.exit( 99 ); } );

const wsById = {};
const wsBySecret = {};

let wsCount = 0;

let inMessages = [];
let outMessages = [];

function send( _, message, to = 'global' ) {

	if ( ! wsCount ) return;
	if ( _ ) message._ = _;
	( to in outMessages ? outMessages[ to ] : ( outMessages[ to ] = [] ) ).push( message );

}

const heartbeat = 3333;

function update() {
	try {
		const _inMessages = inMessages;
		inMessages = [];

		for ( const _in of _inMessages ) this[ `on${_in.message._}` ]( _in.message, _in.from );

		const disconnectedHorizon = Date.now() - heartbeat * 2;

		for ( const id in wsById ) {
			const ws = wsById[ id ];
			if ( ws.timestamp < disconnectedHorizon ) {
			    disconnected( id );
			    delete wsById[ id ];
				wsCount--;
			    delete wsBySecret[ ws.secret ];
			    ws.terminate();
				send( 'disconnected', { id } );
			}
		}

		const _dirtyEntities = dirtyEntities;
		dirtyEntities = {};

		for ( const id in _dirtyEntities ) {
			const entity = _dirtyEntities[ id ];
			if ( entity.destroyed ) continue;
			entity.update();
		}

		const _outMessages = outMessages;
		outMessages = {};

		const _global = _outMessages.global || [];
		const sent = {};

		for ( const id in _outMessages ) {

			const message = JSON.stringify( _global.length ? _outMessages[ id ].concat( _global ) : _outMessages[ id ] );

			if ( ! ( id in wsById ) ) {
				id !== 'global' && console.log( `WARN: disconnected @${id} <- ${message}` );
				continue;
			}

			wsById[ id ].send( message );
			console.log( `@${id} <- ${message}` );
			sent[ id ] = null;

		}

		if ( ! _global.length ) return;

		const message = JSON.stringify( _global );
		console.log( `@global <- ${message}` );

		for ( const id in wsById ) {
			if ( id in sent ) continue;
			const ws = wsById[ id ];
			ws.send( message );
		}

	} catch ( e ) {
		console.error( e );
	}
}

function listen() {
	const port = process.env.PORT;
	const verifyClient = ( info ) => [ 'http://localhost:8000', 'https://sunladen.github.io' ].indexOf( info.req.headers.origin ) > - 1;
	const secretRE = /[?&]{1}secret=([0-9a-fA-F]{8})/;
	const wss = new WebSocketServer( { port, verifyClient } );

	wss.on( 'connection', ( ws, req ) => {

		console.log( `-> ${req.url}` );

		let secret = secretRE.exec( req.url );

		if ( secret ) {
			ws.secret = secret[ 1 ];
			if ( ws.secret in wsBySecret ) ws.id = wsBySecret[ ws.secret ].id;
		}

		if ( ! ws.id && ws.secret ) {
			const player = loadPlayerBySecret( ws.secret );
			if ( player ) ws.id = player.id;
		}

		if ( ! ws.id ) {
			while ( ! ws.id || ws.id in wsById ) ws.id = uuid();
			while ( ! ws.secret || ws.secret in wsBySecret ) ws.secret = uuid();
		}

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

		const isNewConnection = ! ( ws.id in wsById );
		wsById[ ws.id ] = wsBySecret[ ws.secret ] = ws;
		wsCount++;

		send( 'verified', { id: ws.id, secret: ws.secret, heartbeat: heartbeat, world: world.world }, ws.id );

		if ( isNewConnection ) {
			send( 'connected', { id: ws.id } );
			connected( ws.id );
		}

	} );
}

update();
listen();
setInterval( update, heartbeat );

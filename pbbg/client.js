const serverURL = new URL( document.location.host === 'localhost:8000' ? 'ws://localhost:6500/' : 'wss://daffodil-polite-seat.glitch.me/' );

const domNav = document.getElementById( 'nav' );
const domMain = document.getElementById( 'main' );

function onverified( message ) {

	identity = { id: message.id, secret: message.secret };
	localStorage.setItem( 'client.identity', JSON.stringify( identity ) );
	read( message.world );

	const worker = new Worker( URL.createObjectURL( new Blob( [
		`onmessage = () => setInterval( () => postMessage( 0 ), ${message.heartbeat} )`
	] ) ) );
	worker.onmessage = () => { socket.send( JSON.stringify( outMessages ) ); outMessages = []; };
	worker.postMessage( 0 );

}

function ondestroy( message ) {

	if ( message.id in entitiesById ) entitiesById[ message.id ].destroy();

}

function onconnected( message ) {

}

function ondisconnected( message ) {

}

function onupdate( message ) {

	read( message );

}

function read( entityData ) {

	console.log( 'read', entityData );

	const id = entityData.id;
	let entity = null;

	if ( id in entitiesById ) {

		entity = entitiesById[ id ];

	} else {

		try {

			const Class = eval( entityData.type );
			entity = new Class( entityData );

		} catch( err ) {

			console.log( `Unknown type "${entityData.type}"`, err );

		}

	}

	entity.update( entityData );

	if ( 'contents' in entityData ) for ( const content of entityData.contents ) read( content );

}

const entitiesById = {};
const entitiesByType = {}

class Entity {

	constructor( args = {} ) {

		Object.assign( this, args );

		this.name || ( this.name = '[Unnamed]' );
		this.parent = null;
		this.contents = [];

		if ( ! ( this.type in entitiesByType ) ) entitiesByType[ this.type ] = {};
		entitiesByType[ this.type ][ this.id ] = entitiesById[ this.id ] = this;

		if ( args.parent in entitiesById ) entitiesById[ args.parent ].add( this );

		let domNavParent = this.parent && this.parent.domNavContents ? this.parent.domNavContents : domNav;

		this.domNav = E( domNavParent, 'div', this.id, this.constructor.name );
		this.domNavLabel = E( this.domNav, 'div', null, 'label' );
		this.domNavIcon = E( this.domNavLabel, 'div', null, 'icon', getGlyph( this.constructor.name ) );
		this.domNavName = E( this.domNavLabel, 'div', null, 'name', this.name );
		this.domNavContents = E( this.domNav, 'div', null, 'contents' );

		this.domNavLabel.addEventListener( 'click', () => {
			this.showMain();
		} );

		this.domMain = E( null, 'div', this.id, this.constructor.name );
		this.domMainHeader = E( this.domMain, 'div', null, 'header' );
		this.domMainIcon = E( this.domMainHeader, 'div', null, 'icon', getGlyph( this.constructor.name ) );
		this.domMainName = E( this.domMainHeader, 'div', null, 'name', this.name );
		this.domMainContents = E( this.domMain, 'div', null, 'contents' );

		this.domItem = E( null, 'div', this.id, this.constructor.name );
		this.domItemLabel = E( this.domItem, 'div', null, 'label' );
		this.domItemIcon = E( this.domItemLabel, 'div', null, 'icon', getGlyph( this.constructor.name ) );
		this.domItemName = E( this.domItemLabel, 'div', null, 'name', this.name );

	}

	setProperty( property, value ) {

		property === 'parent' ? entitiesById[ value ].add( this ) : this[ property ] = value;
		const onproperty = `on${property}`;
		if ( onproperty in this ) this[ onproperty ]();

	}

	forContent( type, callback ) {

		if ( typeof type === 'function' ) {
			callback = type;
			type = null;
		}

		if ( ! type ) {
			for ( const content of this.contents ) callback( content );
			return;
		}

		for ( const content of this.contents ) content.type === type && callback( content );

	}

	add( entity ) {

		console.log( `add ${entity.name}(${entity.id}) -> ${this.name}(${this.id})` );

		console.log( `entity.parent = ${entity.parent}` );

		if ( entity.parent === this ) return;
		if ( entity.parent ) {

			const index = entity.parent.contents.indexOf( entity );
			if ( index > - 1 ) entity.parent.contents.splice( index, 1 );

		}

		entity.parent = this;
		this.contents.push( entity );

		return entity;

	}

	destroy() {

		if ( this.parent ) {
			for ( const content of this.contents ) this.parent.add( content, true );
			const siblings = this.parent.contents;
			const index = siblings.indexOf( this );
			if ( index > - 1 ) siblings.splice( index, 1 );
		}

		this.domNav.remove();

	}

	update( data ) {

		for ( const p of Object.keys( data ) ) {

			if ( p !== 'id' && p !== 'type' && p !== 'contents' ) this.setProperty( p, data[ p ] );

		}

	}

	showMain() {

		this.domMainContents.innerHTML = '';

		this.forContent( content => {

			this.domMainContents.append( content.domItem );

		} );

		domMain.innerHTML = '';
		domMain.append( this.domMain );

	}

}

class Location extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: '[Unnamed location]' }, args ) );

	}

}

class Character extends Entity {

	constructor( args = {} ) {

		super( args );

		this.domNavHealth = E( this.domNavLabel, 'div', null, 'health' );
		this.domNavHealth.style.minWidth = '33%';

	}

	onhealth() {

		const percent = Math.round( ( this.health.amount / this.health.total ) * 100 ).toFixed( 2 )
		this.domNavHealth.style.minWidth = `${percent}%`;

	}

}

class Player extends Character {

	constructor( args = {} ) {

		super( Object.assign( { name: `Guest-${args.id}` }, args ) );

	}

}

class NPC extends Character {

}

class InstancedMob extends Entity {

}

function E( parent, tagName, id, className, content ) {

	const element = document.createElement( tagName );
	id && ( element.id = id );
	className && ( element.className = className );
	content && ( content instanceof Element ? element.append( content ) : element.textContent = content );
	parent && parent.append( element );
	return element;

}

const GLYPHS = {
	Location: '🏞',
	Player: '웃',
	InstancedMob: '⧉'
};

function getGlyph( name ) {

	return name in GLYPHS ? GLYPHS[ name ] : '?';

}

let outMessages = [];

function send( message ) {

	outMessages.push( message );

}

let identity = JSON.parse( localStorage.getItem( 'client.identity' ) ) ?? {};

if ( identity.secret ) serverURL.search = `secret=${identity.secret}`;

const socket = new WebSocket( serverURL );
socket.onopen = () => console.log( `Connected to ${serverURL}` );
socket.onclose = () => setTimeout( () => window.location.replace( window.location.href ), 1000 );
socket.onmessage = ( e ) => {
	const messages = JSON.parse( e.data );
	console.log( 'Messages from server ', messages );
	for ( const message of messages ) {
		const funcName = '_' in message ? `on${message._}` : 'onupdate';
		try {
			eval( funcName )( message );
		} catch ( err ) {
			console.log( err );
		}
	}
}

const serverURL = new URL( document.location.host === 'localhost:8000' ? 'ws://localhost:6500/' : 'wss://daffodil-polite-seat.glitch.me/' );

const domNav = document.getElementById( 'nav' );

function onverified( message ) {

	identity = { id: message.id, secret: message.secret };
	localStorage.setItem( 'client.identity', JSON.stringify( identity ) );
	read( message.world );

	const worker = new Worker( URL.createObjectURL( new Blob( [ `onmessage = () => setInterval( () => postMessage( 0 ), ${message.heartbeat} )` ] ) ) );
	worker.onmessage = () => { const _outMessages = outMessages; outMessages = []; socket.send( JSON.stringify( _outMessages ) ); };
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

	if ( id in entitiesById ) {
		entitiesById[ id ].update( entityData );
	} else {
		try {
			const Class = eval( entityData.type );
			const entity = new Class( entityData );
		} catch( err ) {
			console.log( `Unknown type "${entityData.type}"` );
		}
	}

	if ( 'contents' in entityData ) for ( const content of entityData.contents ) read( content );

}

const headingResizeObserver = new ResizeObserver( entries => {

	for ( const entry of entries ) {
		const id = entry.target.parentNode.id;
		const entity = entitiesById[ id ];
		const style = entity.domExpandChevron.style;
		style.width = '100%';
		style.minWidth = style.maxWidth = `${entity.domExpandChevron.offsetHeight}px`;
	}

} );

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
	}

	update( data ) {

		if ( data.name !== this.name ) this.name = data.name;
		if ( data.parent && data.parent !== this.parent ) entitiesById[ data.parent ].add( this );

	}

}

class Location extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: '[Unnamed location]' }, args ) );
		this.domNav = E( domNav, 'div', this.id, 'location' );
		this.domNavLabel = E( this.domNav, 'div', null, 'label' );
		this.domNavIcon = E( this.domNavLabel, 'div', null, 'icon', GLYPHS.Location );
		this.domNavName = E( this.domNavLabel, 'div', null, 'name', this.name );
		this.domNavContents = E( this.domNav, 'div', null, 'contents' );

	}

	destroy() {

		super.destroy();
		this.domNav.remove();

	}

}

class Player extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: `Guest-${args.id}` }, args ) );

		let domParent = this.parent && this.parent.domNavContents ? this.parent.domNavContents : domNav;

		this.domNav = E( domParent, 'div', this.id, `player${identity.id===this.id?' self':''}` );
		this.domNavIcon = E( this.domNav, 'div', null, 'icon', GLYPHS.Player );
		this.domNavName = E( this.domNav, 'div', null, 'name', this.name );

	}

	destroy() {

		super.destroy();
		this.domNav.remove();

	}

}

class Hatchet extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: 'Hatchet' }, args ) );

	}

}

class Rabbit extends Entity {

	constructor( args = {} ) {

		super( Object.assign( { name: 'Rabbit' }, args ) );

	}

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
	'Location': '🏞',
	'Player': '웃',
	'Hatchet': 'ᨚ',
	'Tree': '⽊'
};

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

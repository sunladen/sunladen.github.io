const updateInterval = 3333;
const serverURL = new URL( document.location.host === 'localhost:8000' ? 'ws://localhost:6500/' : 'wss://daffodil-polite-seat.glitch.me/' );

let identity = JSON.parse( localStorage.getItem( 'client.identity' ) ) ?? {};

if ( identity.secret ) serverURL.search = `secret=${identity.secret}`;

const socket = new WebSocket( serverURL );
socket.onopen = () => console.log( `Connected to ${serverURL}` );
socket.onclose = () => setTimeout( () => window.location.replace( window.location.href ), updateInterval );
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

const heartbeat = new Worker( URL.createObjectURL( new Blob( [ `onmessage = () => setInterval( () => postMessage( 0 ), ${updateInterval} )` ] ) ) );
heartbeat.onmessage = () => { const _outMessages = outMessages; outMessages = []; socket.send( JSON.stringify( _outMessages ) ); };
heartbeat.postMessage( 0 );

let inMessages = [];
let outMessages = [];

function send( message ) {

	outbound.push( message );

}

function onverified( message ) {

	identity = { id: message.id, secret: message.secret };
	localStorage.setItem( 'client.identity', JSON.stringify( identity ) );
	read( message.world );

}

function ondestroy( message ) {

	if ( message.id in entitiesById ) entitiesById[ message.id ].destroy();

}

function onconnected( message ) {

	//might not need this? maybe for notification purposes?

}

function onupdate( message ) {

	read( message );

}

function read( entityData ) {

	console.log( 'read', entityData );

	if ( ! ( entityData.id in entitiesById ) ) {
		const entity = new Entity( entityData.id, entityData.type, entityData );
		if ( entity.type === 'Entity' )	document.getElementById( 'world' ).append( entity.dom );
	} else {
		entitiesById[ entityData.id ].update( entityData );
	}

	if ( 'contents' in entityData ) for ( const content of entityData.contents ) read( content );

}

const headingResizeObserver = new ResizeObserver( entries => {

	for ( const entry of entries ) {
		const id = entry.target.parentNode.id;
		const entity = entitiesById[ id ];
		entity.domExpandChevron.style.minWidth = `${entity.domExpandChevron.offsetHeight}px`;
	}

} );

class Entity {

	constructor( id, type, args = {} ) {

		Object.assign( this, args );

		this.id = id;
		this.type = type;
		this.name || ( this.name = '[Unnamed]' );
		this.parent = null;
		this.contents = [];

		this.headingEventsAdded = false;

		this.dom = E( null, 'div', this.id, `entity ${this.type}${identity.id===id?' self':''}` );

		this.heading = E( this.dom, 'div', null, 'heading' );
		this.domMoveTo = E( this.heading, 'div', null, 'moveto glyph', '👣' );
		this.domIndent = E( this.heading, 'div', null, 'indent' );
		this.domIcon = E( this.heading, 'div', null, 'icon glyph', GLYPHS[ this.type ] || '?' );
		this.domName = E( this.heading, 'div', null, 'name', this.name );
		this.domContentCount = E( this.heading, 'div', null, 'contentcount' );
		this.domExpandChevron = E( this.heading, 'div', null, 'expandchevron', '›' );
		this.domExpandChevron.style.visibility = 'hidden';
		this.domContents = E( this.dom, 'div', null, 'contents' );

		headingResizeObserver.observe( this.heading );

		entitiesById[ this.id ] = this;

		if ( args.parent in entitiesById ) entitiesById[ args.parent ].add( this );

	}

	add( entity ) {

		console.log( `add ${entity.name}(${entity.id}) -> ${this.name}(${this.id})` );

		console.log( `entity.parent = ${entity.parent}` );

		if ( entity.parent === this ) return;
		if ( entity.parent ) {

			const index = entity.parent.contents.indexOf( entity );
			if ( index > - 1 ) {
				entity.parent.contents.splice( index, 1 );
				if ( entity.parent.contents.length ) {
					entity.parent.domContentCount.textContent = `${this.contents.length}`;
					entity.parent.domExpandChevron.style.visibility = 'visible';
				} else {
					entity.parent.domContentCount.textContent = '';
					entity.parent.domExpandChevron.style.visibility = 'hidden';
				}
			}

		}

		entity.parent = this;
		this.contents.push( entity );

		this.domContents.append( entity.dom );

		entity.indent();

		this.domContentCount.textContent = `${this.contents.length}`;

		if ( this.parent && this.contents.length ) {
			this.domContentCount.textContent = `${this.contents.length}`;
			this.domExpandChevron.style.visibility = 'visible';
		} else {
			this.domContentCount.textContent = '';
			this.domExpandChevron.style.visibility = 'hidden';
		}

		identity.id === entity.id ? this.expand() : this.collapse();

		return entity;

	}

	indent() {

		let depth = 0;
		let ancestor = this;

		while ( ancestor = ancestor.parent ) depth++;

		this.domIndent.style.minWidth = `${depth * 0.5}em`;

		this.collapse();

		if ( ! this.headingEventsAdded ) {
			this.heading.addEventListener( 'mouseover', ( e ) => {
				e.stopPropagation();
				this.heading.style.background = '#eee';
				this.heading.style.borderLeft = '2px solid #888';
			} );
			this.heading.addEventListener( 'mouseout', ( e ) => {
				e.stopPropagation();
				this.heading.style.background = 'white';
				this.heading.style.borderLeft = '2px solid #fff';
			} );
			this.heading.addEventListener( 'click', ( e ) => {
				e.stopPropagation();
				this.domContents.style.display === 'none' ? this.expand() : this.collapse();
			} );
			this.headingEventsAdded = true;
		}

	}

	expand() {
		this.domContents.style.display = 'block';
		this.domExpandChevron.style.transform = 'rotate(90deg) scale(-1, 1)';
		if ( this.parent ) this.parent.expand();
	}

	collapse() {
		for ( const content of this.contents ) content.collapse();
		this.domContents.style.display = 'none';
		this.domExpandChevron.style.transform = 'rotate(90deg)';
	}

	destroy() {
		if ( this.parent ) {
			for ( const content of this.contents ) this.parent.add( content, true );
			const siblings = this.parent.contents;
			const index = siblings.indexOf( this );
			if ( index > - 1 ) siblings.splice( index, 1 );
			this.dom.remove();
		}
	}

	update( data ) {

		if ( data.name !== this.name ) this.name = data.name;
		if ( data.parent !== this.parent ) entitiesById[ data.parent ].add( this );

	}

}

const entitiesById = {};

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
	'Player': '🧍',
	'Hatchet': '🪓',
	'Tree': '🌲'
};

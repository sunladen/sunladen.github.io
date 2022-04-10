import Client from './client.js';


export default class TextBattleLoot extends Client {

	constructor( container ) {

		super( location.port ? 'ws://localhost:6500' : 'wss://bead-rural-poison.glitch.me/' );

		this.container = container;
		this.container.innerHTML += `
		<div class="tbl-flex">
			<div class="tbl-grow">
				<div class="tbl-outer"></div>
				<div class="tbl-focus"></div>
			</div>
		</div>
		`;

		let marginTop = getComputedStyle( this.container ).getPropertyValue( 'margin-top' );
		this.container.style.height = `calc(100% - ${2 * parseInt( marginTop )}px)`;

		if ( this.container === document.body ) document.documentElement.style.height = '100%';

		this.focusDomElement = this.container.querySelector( '.tbl-focus' );

		this.focusNode = this;

		this.changeFocus( '.' );

		instances.push( this );

	}

	receive( message ) {

		console.log( `i got ${message.type}` );

	}

	changeFocus( path ) {

		this.focusDomElement.innerHTML = '';

		//for ( let node of contentNode.contents ) {

		//	this.focusDomElement.append( node.domElement );

		//}

	}

}


if ( ! document.getElementById( 'tbl-style' ) ) {

	document.head.innerHTML += `<style id="tbl-style">
.tbl-flex { display: flex; box-sizing: border-box; height: 100%; }
.tbl-grow { flex-grow: 1; border: 5px solid red; }
	</style>
	`;

}


const instances = [];


function update() {

	setTimeout( update, 1000 );

	for ( let instance of instances ) {


	}

}


setTimeout( update, 0 );


class Node {

	constructor( parent ) {

		this.parent = parent;
		this.contextNode = document.createElement( 'div' );
		this.child = {};

	}

	set( path, value ) {

		let split = path.trim().split( '/' );
		let key = split.shift();

		if ( key === '' ) return this.get( '/' ).set( split.join( '/' ), value );
		if ( key === '..' && this.parent ) return this.parent.set( split.join( '/' ), value );
		if ( key === '.' || key === '..' ) return this.set( split.join( '/' ), value );
		if ( split.length === 0 ) return this.child[ key ] = value;
		if ( ! this.child.hasOwnProperty( key ) ) this.child[ key ] = new Node();
		return this.child[ key ].set( split.join( '/' ), value );

	}

	get( path ) {

		let split = path.trim().split( '/' );
		let key = split.shift();
		let node = this;

		if ( key === '' ) while ( node.parent !== null ) node = node.parent;
		if ( split.length === 0 )

			return node.get( split.join( '/' ) );

	}

}


class ContentNode {

	constructor( id ) {

		this.id = id;
		this.contents = [];
		this.domElement = document.createElement( 'div' );
		this.domElement.textContent = this.id;

	}

	append( contentNode ) {

		contentNode.parent = this;
		this.contents.push( contentNode );
		this.domElement.append( contentNode.domElement );

	}

}



function createContentHierarchy( contents, parentNode ) {

	if ( ! parentNode ) {

		parentNode = new ContentNode( 'root' );
		parentNode.type = 'root';

	}

	for ( let item of contents ) {

		let node = new ContentNode( item.id );
		node.type = item.type;
		parentNode.append( node );

		if ( item.hasOwnProperty( 'contents' ) ) createContentHierarchy( item.contents, node );

	}

	return parentNode;

}

const template = document.createElement( "template" );

class Item {

	constructor( type ) {

		this.type = type;
		this.dmg = 0;
		template.innerHTML = `
		  <div class="item-type">
			${type}
		  </div>
		  <div class="item-stats">
			<div class="item-damage-modifier"><label>DMG</label><span class="item-damage-modifier-value">${this.dmg}</span></div>
		  </div>
		</div>`;
		this.dom = template.content.firstElementChild;
		template.innerHTML = '';

	}

}


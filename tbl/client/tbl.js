class Content {

	constructor( data ) {

		this.parent = null;
		this.data = data || {};
		this.contents = {};

	}

	add( data, path ) {

		let pathArray = path.trim().split( '/' );
		let key = pathArray.shift();

		if ( key === '' ) return this.root().add( data, pathArray.join( '/' ) );

		if ( key === '..' && this.parent ) return this.parent.add( data, pathArray.join( '/' ) );

		if ( key === '.' || key === '..' ) return this.add( data, pathArray.join( '/' ) );

		console.log( key );

		//for ( let index in pathArray ) {

		//	let key = pathArray[ index ];

		//	if ( key === '' ) parent = this.root();

		//	console.log( key, parent );

		//	if ( Object.keys( location ).indexOf( key ) < 0 ) {

		//		location[ key ] = index < pathArray.length - 1 ? {} : item;

		//	}

		//	location = location[ key ];

		//}

		//console.log( this.contentHierarchy );

	}

	root() {

		let root = this;

		while ( root.parent !== null ) root = root.parent;

		return root;

	}

}


export default class TextBattleLoot extends Content {

	constructor( container ) {

		super();

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

		this.content = new Content();

		instances.push( this );

	}
	focus( path ) {

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


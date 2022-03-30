export default class TextBattleLoot {

	constructor( container ) {

		this.container = container;
		this.domElement = document.createElement( 'div' );
		this.container.append( this.domElement );
		this.parentsDomElement = document.createElement( 'div' );
		this.domElement.append( this.parentsDomElement );
		this.focusDomElement = document.createElement( 'div' );
		this.domElement.append( this.focusDomElement );

		this.style();

		this.contentHierarchy = createContentHierarchy( [ {
			id: 'camp',
			type: 'location',
			contents: [
				{
					id: 'vendor',
					type: 'npc'
				}, {
					id: 'tree',
					type: 'resource'
				}, {
					id: 'michael',
					type: 'player'
				}, {
					id: 'stephen',
					type: 'player'
				}
			]
		} ] );

		this.setFocus( this.contentHierarchy.contents[ 0 ] );

		instances.push( this );

	}

	style() {

		applyStyle( this.container, { display: 'flex', boxSizing: 'border-box' } );
		applyStyle( this.domElement, { flexGrow: 1, border: '5px solid red' } );

		let marginTop = getComputedStyle( this.container ).getPropertyValue( 'margin-top' );
		this.container.style.height = `calc(100% - ${2 * parseInt( marginTop )}px)`;

		if ( this.container === document.body ) document.documentElement.style.height = '100%';

	}

	setFocus( contentNode ) {

		this.focusDomElement.innerHTML = '';

		for ( let node of contentNode.contents ) {

			this.focusDomElement.append( node.domElement );

		}

	}

}


const instances = [];


function update() {

	setTimeout( update, 1000 );

	for ( let instance of instances ) {


	}

}


setTimeout( update, 0 );



function applyStyle( element, styleDict ) {

	for ( let style in styleDict ) {

		element.style[ style ] = styleDict[ style ];

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


var headStyleElement = document.getElementById( 'text-battle-loot-global-style' );

if ( ! headStyleElement ) {

	headStyleElement = document.createElement( 'style' );
	headStyleElement.id = 'text-battle-loot-global-style';
	headStyleElement.textContent = `
    *, *:before, *:after {
      box-sizing: inherit;
    }
	`;
	document.head.append( headStyleElement );

}


import Chat from './chat.mjs';

const fontSize = 32;

class World {

	constructor() {

		this.entities = [];
		this.dom = document.createElement( 'div' );
		document.body.append( this.dom );
		this.dom.style.fontSize = `${fontSize}px`;
		this.dom.style.position = 'absolute';
		this.dom.style.left = `${window.innerWidth * 0.5}px`;
		this.dom.style.top = `${window.innerHeight * 0.5}px`;

		var self = this;

		window.addEventListener( 'resize', () => self.refreshVisibility(), false );

	}

	add( entity, x = 0, y = 0 ) {

		this.entities.push( entity );
		this.dom.append( entity.dom );
		entity.setXY( x, y );
		entity.dom.style.display = this.outsideViewport( entity ) ? 'none' : 'block';

	}

	outsideViewport( entity ) {

		var rect = entity.dom.getBoundingClientRect();

		return ( rect.top > window.innerHeight || rect.left > window.innerWidth || rect.bottom < 0 || rect.right < 0 );

	}

	refreshVisibility() {

		this.dom.style.left = `${window.innerWidth * 0.5}px`;
		this.dom.style.top = `${window.innerHeight * 0.5}px`;

		for ( var i = 0; i < this.entities.length; i ++ ) {

			var entity = this.entities[ i ];
			entity.dom.style.display = this.outsideViewport( entity ) ? 'none' : 'block';

		}

	}

}

class Entity {

	constructor( text ) {

		this.dom = document.createElement( 'div' );
		this.dom.className = 'entity';
		this.dom.style.position = 'absolute';
		this.dom.textContent = text;

	}

	setXY( x, y ) {

		var rect = this.dom.getBoundingClientRect();

		this.dom.style.left = `${x - rect.width * .5}px`;
		this.dom.style.top = `${y - rect.height * .5}px`;

	}

}

class Player extends Entity {

	constructor( name ) {

		super( '🧍' );
		this.name = name;

	}

}


const world = new World();

for ( var y = - fontSize * 20; y <= fontSize * 20; y += fontSize ) {

	for ( var x = - fontSize * 20; x <= fontSize * 20; x += fontSize ) {

		var entity = new Entity( '⬛' );//🟫' );
		world.add( entity, x, y );

	}

}

var entity = new Player( 'You' );
world.add( entity );

var host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
const chat = new Chat( `${location.protocol.replace( 'http', 'ws' )}//${host}`, document.body );
chat.focus();



import Chat from './chat.mjs';

const fontSize = 32;

class Layer {

	constructor( columns ) {

		this.columns = columns;
		this.chr = [];

		this.dom = document.createElement( 'div' );
		this.dom.style.position = 'absolute';
		this.dom.style.fontSize = `${100 / columns}vw`;
		this.dom.style.height = '100%';

		document.body.append( this.dom );

		var chr;

		for ( var x = 0; x < columns; x ++ ) {

			this.chr[ x ] = [];
			chr = this.chr[ x ][ 0 ] = document.createElement( 'div' );
			chr.style.display = 'inline-block';
			chr.style.margin = '0';
			chr.style.padding = '0';
			chr.style.border = '0px solid grey';
			chr.style.width = `${100 / columns}vw`;
			chr.textContent = '·'; //'｜'; '▢'; '·';
			this.dom.append( chr );

		}

		this.resize();

		var self = this;

		window.addEventListener( 'resize', () => self.resize(), false );

	}

	set( x, y, chr ) {

		this.chr[ x ][ y ].textContent = chr;

	}

	resize() {

		var chr = this.chr[ 0 ][ 0 ];
		var divs = window.innerHeight / chr.offsetHeight;

		this.rows = Math.ceil( divs );

		this.dom.style.marginTop = `${( divs - this.rows ) * chr.offsetHeight}px`;

		for ( var y = 1; y < this.rows; y ++ ) {

			if ( this.chr[ 0 ][ y ] ) continue;

			for ( var x = this.columns - 1; x >= 0; x -- ) {

				chr = this.chr[ x ][ y ] = document.createElement( 'div' );
				chr.style.display = 'inline-block';
				chr.style.border = '0px solid grey';
				chr.style.width = `${100 / this.columns}vw`;
				chr.textContent = '·'; //'｜'; '▢'; '·';
				this.dom.insertBefore( chr, this.dom.firstChild );

			}

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


//const layer0 = new Layer( 80 );

//for ( var y = 0; y <= 20; y ++ ) {
//
//	for ( var x = 0; x <= 80; x ++ ) {
//
//		layer0.set( x, y, '·' );
//
//	}
//
//}

//var entity = new Player( 'You' );
//world.add( entity );

var host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
window.chat = new Chat( `${location.protocol.replace( 'http', 'ws' )}//${host}`, document.body );



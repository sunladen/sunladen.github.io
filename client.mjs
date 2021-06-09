import Chat from './chat.mjs';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

class World {

	constructor( container ) {

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.camera.position.set( 0, 0, 10 );
		this.camera.lookAt( 0, 0, 0 );

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.container = container;

		container.append( this.renderer.domElement );

		this.fitContainer();

		container.addEventListener( 'resize', this.fitContainer );

		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		container.addEventListener( 'mousemove', event => {

			this.mouse.x = ( event.clientX / this.renderer.width ) * 2 - 1;
			this.mouse.y = - ( event.clientY / this.renderer.height ) * 2 + 1;

		} );

		this.render();

	}

	fitContainer() {

		var rect = this.container.getBoundingClientRect();
		this.camera.aspect = rect.width / rect.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( rect.width, rect.height );

	}

	render() {

		requestAnimationFrame( this.render.bind( this ) );

		this.renderer.render( this.scene, this.camera );

	}

}



class CanvasPlane {

	/**
	 * @param {Float} width
	 * @param {Float} heigth
	 * @param {Integer=1} widthSegments
	 * @param {Integer=1} heightSegments
	 */
	constructor( width, height, widthSegments = 1, heightSegments = 1 ) {

		this.ctx = document.createElement( 'canvas' ).getContext( '2d' );
		this.ctx.canvas.width = width;
		this.ctx.canvas.height = height;
		this.ctx.fillStyle = '#FFF';
		this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
		this.texture = new THREE.CanvasTexture( this.ctx.canvas );

		this.geometry = new THREE.PlaneGeometry( width, height, widthSegments, heightSegments );
		this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
		this.mesh = new THREE.Mesh( this.geometry, this.material );

	}

}


class Ground extends CanvasPlane {

	constructor( width, depth ) {

		super( width, depth, width, depth );

		this.vertices = this.geometry.attributes.position;

		for ( var i = 0; i < this.vertices.count; i ++ ) {

			var x = this.vertices.getX( i );
			var y = this.vertices.getY( i );
			var z = this.vertices.getZ( i );

			y += - 1 + Math.random() * 2;

			this.vertices.setXYZ( i, x, y, z );

		}

		this.geometry.verticesNeedUpdate = true;

	}

	update() {
	}

}

class Player extends CanvasPlane {

	 constructor() {

		 super( 1, 1 );

	}

}


const world = new World( document.body );
const ground = new Ground( 100, 100 );

world.scene.add( ground.mesh );


var host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
const chat = new Chat( `${location.protocol.replace( 'http', 'ws' )}//${host}`, document.body );
chat.focus();



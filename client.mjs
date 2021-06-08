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

		container.append( renderer.domElement );

		this.fitContainer();

		container.addEventListener( 'resize', this.fitContainer );

		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		container.addEventListener( 'mousemove', event => {

			this.mouse.x = ( event.clientX / this.renderer.width ) * 2 - 1;
			this.mouse.y = - ( event.clientY / this.renderer.height ) * 2 + 1;

		} );

	}

	fitContainer() {

		var rect = this.container.getBoundingClientRect();
		this.camera.aspect = rect.width / rect.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( rect.width, rect.height );

	}

	render() {

		this.renderer.render( this.scene, this.camera );

	}

}


const world = new World( document.body );

const geometry = new THREE.PlaneGeometry( 100, 100, 100, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0x224411, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );


var host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
const chat = new Chat( `${location.protocol.replace( 'http', 'ws' )}//${host}`, document.body );
chat.focus();

function animate() {
}

animate();


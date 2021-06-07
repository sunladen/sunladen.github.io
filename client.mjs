import Chat from './chat.mjs';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', resize => {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

} );

const geometry = new THREE.PlaneGeometry( 100, 100, 100, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0x224411, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

renderer.render( scene, camera );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener( 'mousemove', mousemove => {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

} );


var host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
const chat = new Chat( `${location.protocol.replace( 'http', 'ws' )}//${host}`, document.body );
chat.focus();

function animate() {
}
animate();


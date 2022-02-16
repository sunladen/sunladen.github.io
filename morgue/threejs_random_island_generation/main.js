// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js';
import { openSimplexNoise } from './openSimplexNoise.js';

document.head.innerHTML += `<style>
    * { box-sizing: border-box; }
	body { overflow: hidden; margin: 0; }
</style>`;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var aspect = screenWidth / screenHeight;

const worldSize = 128;
const frustumSize = 600;
const islandSphereRadiusSq = worldSize * worldSize * 3;
const islandSphereRadius = Math.sqrt( islandSphereRadiusSq );

const scene = new THREE.Scene();

//

var camera = new THREE.PerspectiveCamera( 90, 0.5 * aspect, 1, 1000 );
camera.position.z = worldSize;

var cameraPerspective = new THREE.PerspectiveCamera( 90, 0.5 * aspect, 0.1, 1000 );
cameraPerspective.position.z = 250;
var cameraPerspectiveHelper = new THREE.CameraHelper( cameraPerspective );
scene.add( cameraPerspectiveHelper );

//

var cameraOrtho = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 1000 );
var cameraOrthoHelper = new THREE.CameraHelper( cameraOrtho );
scene.add( cameraOrthoHelper );

//

var activeCamera = cameraPerspective; //cameraOrtho;
var activeHelper = cameraPerspectiveHelper;


// counteract different front orientation of cameras vs rig

cameraOrtho.rotation.y = Math.PI;
cameraPerspective.rotation.y = Math.PI;

var cameraRig = new THREE.Group();

cameraRig.add( cameraPerspective );
cameraRig.add( cameraOrtho );

scene.add( cameraRig );



// lighting /////////////////////////////////////////////////////////////////

var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

var dirLight = new THREE.DirectionalLight( 0xffffff, 2 );
dirLight.position.set( - 1, 1, 0 );
//dirLight.position.multiplyScalar( 50 );
dirLight.name = "dirlight";
dirLight.shadowCameraVisible = true;

scene.add( dirLight );

dirLight.castShadow = true;
dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 1024 * 2;


// console.log( dirLight.shadow.camera );

// dirLight.shadow.camera.left = - 300;
// dirLight.shadow.camera.right = 300;
// dirLight.shadow.camera.top = 300;
// dirLight.shadow.camera.bottom = - 300;

// dirLight.shadow.camera.far = 3500;
// dirLight.shadow.bias = - 0.0001;


/////////////////////////////////////////////////////////////////////////////



const noise = openSimplexNoise( Date.now() );


const dirtOctaves = [
	{ frequency: 0.03, amplitude: 6 },
	{ frequency: 0.1, amplitude: 1.5 }
];
// const rockOctaves = [
	// { frequency: 0.07, amplitude: 1 },
	//{ frequency: 0.6, amplitude: 0.5 },
	// { frequency: 5, amplitude: .2 }
// ];

var dirtGeometry = new THREE.PlaneBufferGeometry( worldSize, worldSize, worldSize, worldSize );
var dirtPositionAttribute = dirtGeometry.getAttribute( 'position' );
// var rockGeometry = new THREE.PlaneBufferGeometry( worldWidth, worldDepth, worldWidth, worldDepth );
// var rockPositionAttribute = rockGeometry.getAttribute( 'position' );

const vertex = new THREE.Vector3();

for ( let vertexIndex = 0; vertexIndex < dirtPositionAttribute.count; vertexIndex ++ ) {

	vertex.fromBufferAttribute( dirtPositionAttribute, vertexIndex );

	var z = Math.sqrt( islandSphereRadiusSq - vertex.x * vertex.x - vertex.y * vertex.y ) - islandSphereRadius + 3;

	for ( let o of dirtOctaves ) {

		z += noise.noise2D( vertex.x * o.frequency, vertex.y * o.frequency ) * o.amplitude;

	}

	dirtPositionAttribute.array[ vertexIndex * 3 + 2 ] = z;

	// vertex.fromBufferAttribute( rockPositionAttribute, vertexIndex );

	// z = base;

	// for ( let o of rockOctaves ) {

	// 	z += noise.noise2D( ( vertex.x + 25 ) * o.frequency, ( vertex.y + 25 ) * o.frequency ) * o.amplitude;

	// }

	// rockPositionAttribute.array[ vertexIndex * 3 + 2 ] = z;

}

dirtGeometry.computeVertexNormals();
// rockGeometry.computeVertexNormals();

// const texture = new THREE.CanvasTexture( dirtTexture( worldWidth, worldDepth ) );
// texture.wrapS = THREE.ClampToEdgeWrapping;
// texture.wrapT = THREE.ClampToEdgeWrapping;


// //scene.add( rockMesh );



var dirtMaterial = new THREE.MeshStandardMaterial( {
	color: 'brown',
	polygonOffset: true,
	polygonOffsetFactor: 1, // positive value pushes polygon further away
	polygonOffsetUnits: 1
} );
var dirtMesh = new THREE.Mesh( dirtGeometry, dirtMaterial );
scene.add( dirtMesh );

var geo = new THREE.WireframeGeometry( dirtMesh.geometry ); // or WireframeGeometry
var mat = new THREE.LineBasicMaterial( { color: 0xffffff } );
var wireframe = new THREE.LineSegments( geo );
//wireframe.material.depthTest = false;
wireframe.material.opacity = 0.25;
wireframe.material.transparent = true;
scene.add( wireframe );


var waterGeometry = new THREE.PlaneGeometry( worldSize, worldSize );
var waterMaterial = new THREE.MeshStandardMaterial( { color: 'blue' } );
var waterMesh = new THREE.Mesh( waterGeometry, waterMaterial );
scene.add( waterMesh );




function dirtTexture( width, height ) {

	const canvas = document.createElement( 'canvas' );
	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext( '2d' );
	context.fillStyle = 'brown';
	context.fillRect( 0, 0, width, height );

	const image = context.getImageData( 0, 0, canvas.width, canvas.height );
	const imageData = image.data;

	for ( let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

		// imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
		// imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
		// imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );

	}

	context.putImageData( image, 0, 0 );

	return canvas;

}


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.physicallyCorrectLights = true;
document.body.appendChild( renderer.domElement );

renderer.autoClear = false;



const controls1 = new OrbitControls( cameraPerspective, renderer.domElement );
const controls2 = new OrbitControls( cameraOrtho, renderer.domElement );


function animate() {

	requestAnimationFrame( animate );

	render();

}


function render() {

	if ( activeCamera === cameraPerspective ) {

		cameraPerspective.far = cameraPerspective.position.length() + worldSize * 0.5;
		cameraPerspective.updateProjectionMatrix();

		cameraPerspectiveHelper.update();
		cameraPerspectiveHelper.visible = true;

		cameraOrthoHelper.visible = false;

	} else {

		cameraOrtho.far = cameraOrtho.position.length() + worldSize * 0.5;
		cameraOrtho.updateProjectionMatrix();

		cameraOrthoHelper.update();
		cameraOrthoHelper.visible = true;

		cameraPerspectiveHelper.visible = false;

	}

	cameraRig.lookAt( dirtMesh.position );

	renderer.clear();

	activeHelper.visible = false;

	renderer.setViewport( 0, 0, screenWidth, screenHeight );
	renderer.render( scene, activeCamera );

	activeHelper.visible = true;

	renderer.setViewport( screenWidth / 2, screenHeight / 2, screenWidth / 2, screenHeight / 2 );
	renderer.render( scene, camera );

}


animate();

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';


class World {

	constructor( width, height, container = document.body ) {

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 'red' );

		this.camera = new THREE.PerspectiveCamera( 75, null, 0.1, 1000 );
		this.camera.position.set( 0, 0, 10 );
		this.camera.lookAt( 0, 0, 0 );


		this.renderer = new THREE.WebGLRenderer();
		this.renderer.gammaFactor = 2.2;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.container = container;

		container.append( this.renderer.domElement );

		this.fitContainer();

		new OrbitControls( this.camera, this.renderer.domElement );

		container.addEventListener( 'resize', this.fitContainer );

		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

		container.addEventListener( 'mousemove', event => {

			this.mouse.x = ( event.clientX / this.renderer.width ) * 2 - 1;
			this.mouse.y = - ( event.clientY / this.renderer.height ) * 2 + 1;

		} );

		this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		this.directionalLight.position.set( width * 0.35, - height * 0.35, width * 0.5 );
		this.directionalLight.castShadow = true;
		this.scene.add( this.directionalLight );

		this.directionalLight.shadow.mapSize.width = 1024; // default 512
		this.directionalLight.shadow.mapSize.height = 1024; // default 512

		this.directionalLight.shadow.camera.near = 0.5; // default
		this.directionalLight.shadow.camera.far = Math.sqrt( width * width, height * height ); // default

		const d = width * 0.5;

		this.directionalLight.shadow.camera.left = - d;
		this.directionalLight.shadow.camera.right = d;
		this.directionalLight.shadow.camera.top = d;
		this.directionalLight.shadow.camera.bottom = - d;

		this.scene.add( new THREE.CameraHelper( this.directionalLight.shadow.camera ) );

		this.ground = new Ground( width, height );
		this.scene.add( this.ground );

		this.render();

	}

	fitContainer() {

		var rect = this.container.getBoundingClientRect();
		this.camera.aspect = rect.width / rect.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( rect.width, rect.height );

	}

	render() {

		this.renderer.render( this.scene, this.camera );

		requestAnimationFrame( this.render.bind( this ) );

	}

}



const cubeGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );

let txt = [];
txt.push( 'abcdefghijklmnop' );
txt.push( 'qrtsuvwxyzABCDEF' );
txt.push( 'GHIJKLMNOPQRSTUV' );
txt.push( 'WXYZ0123456789`~' );
txt.push( "!@#$%^&*()_+=[]'" );
txt.push( '{};:"<>/?░▚▼►▲◄' );

const ctx = document.createElement( 'canvas' ).getContext( '2d' );
ctx.canvas.width = 512;
ctx.canvas.height = 512;
ctx.fillStyle = '#fff';
ctx.fillRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

const fontSize = 40;
ctx.font = `${fontSize}pt monospace`;
ctx.fillStyle = "#000000";
ctx.textAlign = "left";
ctx.textBaseline = "top";

for ( let i = 0; i < txt.length; i ++ ) {

	ctx.fillText( txt[ i ], 0, ( fontSize + 8 ) * i );

}

const texture = new THREE.Texture( ctx.canvas );
texture.needsUpdate = true;

const material = new THREE.MeshPhongMaterial( { map: texture } );
material.color.convertSRGBToLinear();





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
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
		this.texture = new THREE.CanvasTexture( this.ctx.canvas );

		this.geometry = new THREE.PlaneGeometry( width, height, widthSegments, heightSegments );
		this.material = new THREE.MeshPhongMaterial( { map: this.texture } );
		this.material.color.convertSRGBToLinear();
		this.object = new THREE.Mesh( this.geometry, this.material );
		this.object.castShadow = true;
		this.object.receiveShadow = true;

	}

}


class Ground extends THREE.Object3D {

	constructor( width, depth ) {

		super();

		var halfWidth = width * 0.5;
		var halfDepth = depth * 0.5;
		var heightVariance = 0.5;

		for ( var y = - halfDepth; y <= halfDepth; y ++ ) {

			for ( var x = - halfWidth; x <= halfWidth; x ++ ) {

				var sprite = new THREE.Mesh( cubeGeometry, material );
				sprite.castShadow = true;
				sprite.receiveShadow = true;

				var z = - heightVariance * 0.5 + ( Math.random() * heightVariance );

				sprite.position.set( x, y, z );

				this.add( sprite );

			}

		}

	}

	update() {
	}

}

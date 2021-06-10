import Chat from './chat.mjs';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';


class World {

	constructor( width, height, container = document.body ) {

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 'red' );

		this.camera = new THREE.PerspectiveCamera( 75, null, 0.1, 1000 );
		this.camera.position.set( 0, 0, 50 );
		this.camera.lookAt( 0, 0, 0 );


		this.renderer = new THREE.WebGLRenderer();
		this.renderer.gammaFactor = 2.2;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
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
		this.scene.add( this.ground.mesh );


		this.render();

	}

	fitContainer() {

		var rect = this.container.getBoundingClientRect();
		this.camera.aspect = rect.width / rect.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( rect.width, rect.height );

	}

	render() {

		this.directionalLight.position.copy( this.camera.position );

		this.renderer.render( this.scene, this.camera );

		requestAnimationFrame( this.render.bind( this ) );

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
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
		this.texture = new THREE.CanvasTexture( this.ctx.canvas );

		this.geometry = new THREE.PlaneGeometry( width, height, widthSegments, heightSegments );
		this.material = new THREE.MeshPhongMaterial( { map: this.texture } );
		this.material.color.convertSRGBToLinear();
		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

	}

}


class Ground extends CanvasPlane {

	constructor( width, depth ) {

		super( width, depth, width, depth );

		this.vertices = this.geometry.attributes.position;

		const d = 1;

		for ( var i = 0; i < this.vertices.count; i ++ ) {

			var x = this.vertices.getX( i );
			var y = this.vertices.getY( i );
			var z = this.vertices.getZ( i );

			z += - d * 0.5 + ( Math.random() >= 0.5 ? d : 0 );

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


const world = new World( 128, 128 );


var host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
const chat = new Chat( `${location.protocol.replace( 'http', 'ws' )}//${host}`, document.body );
chat.focus();



import Client from './client.js';
import Chat from './chat.js';



const host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
const client = new Client( `${location.protocol.replace( 'http', 'ws' )}//${host}` );
client.chat = new Chat( client );


// const positions = utils.E( 'div', { class: 'positions' } );
// document.body.append( positions );

// const world = {};

// io.on( 'container', ( ws, containerId, name, parentId, x, y ) => {

// 	world[ containerId ] = { name: name, parentId: parentId, x: x, y: y };

// 	chat.write( `{ containerId: ${containerId}, name: '${name}', parentId: ${parentId}, x: ${x}, y: ${y} }` );

// } );

// // 	var self = client.chat.id.name === name ? 'self' : '';
// // 	var id = `container-${containerId}`;
// // 	var div = document.getElementById( id ) || utils.E( 'div', { id: id, class: 'position ${self}' } );
// // 	div.innerHTML = `<div class="container ${self}">${name}</div>`;

// // 	var parent = document.getElementById( `container-${parentId}` );

// // 	! parent ? positions.append( div ) : parent.append( div );

// // } );

// io.connect();



// const worker = new Worker( URL.createObjectURL( new Blob( Array.prototype.map.call(document.querySelectorAll('script[type=\'text\/js-worker\']'), function (oScript) { return oScript.textContent; }),{type: 'text/javascript'} ) ) );

// new Blob( [ 'self.onmessage = ', () => {
// 	console.log(
// }.toString() ], { type: 'text/javascript' } );





// client.on( 'error', err => console.log( err ) );
// client.on( 'success', msg => console.log( msg ) );

client.on( 'connected', ( id, session ) => {

	console.log( 'connected', id, session );
	localStorage.setItem( 'session', session );
	client.send( [[ 'identify', localStorage.getItem( 'id' ) || id ]] );

} );

client.on( 'identify', ( id, err ) => {

	console.log( 'identity', id, err );
	localStorage.setItem( 'id', id ) && err && console.log( err );

} );

client.on( 'reconnected', id => {

	console.log( 'reconnected', id );
	localStorage.setItem( 'id', id );

	client.send( 'hello' );

} );


const NAMESPACE = {
	SVG: 'http://www.w3.org/2000/svg'
};


class Circle {

	constructor() {

		this.radius = 20;

		this.svg = document.createElementNS( NAMESPACE.SVG, 'svg' );
		this.svg.style.position = 'absolute';
		this.svg.setAttribute( 'width', '10%' );
		this.svg.setAttribute( 'height', '10%' );
		this.svg.setAttribute( 'viewBox', '25 25 50 50' );

		rotatingAnimation( this.svg, '2s linear infinite' );

		var circle1 = document.createElementNS( NAMESPACE.SVG, 'circle' );
		circle1.setAttribute( 'cx', '50' );
		circle1.setAttribute( 'cy', '50' );
		circle1.setAttribute( 'r', this.radius );
		circle1.setAttribute( 'fill', 'none' );
		circle1.setAttribute( 'stroke', 'rgba(255, 255, 255, 0.1)' );
		circle1.setAttribute( 'stroke-width', '10' );

		// stroke 10% of circumference = .1 * ( 2 * Pi * r ), dash the remainder
		this.circumference = 2 * 3.14159265359 * this.radius;
		circle1.style.strokeDasharray = `${.3 * this.circumference}, ${.7 * this.circumference}`;
		this.svg.append( circle1 );


		var circle2 = document.createElementNS( NAMESPACE.SVG, 'circle' );
		circle2.setAttribute( 'cx', '50' );
		circle2.setAttribute( 'cy', '50' );
		circle2.setAttribute( 'r', this.radius );
		circle2.setAttribute( 'fill', 'none' );
		circle2.setAttribute( 'stroke', 'rgba(255, 255, 255, 0.1)' );
		circle2.setAttribute( 'stroke-width', '10' );

		// stroke 10% of circumference = .1 * ( 2 * Pi * r ), dash the remainder
		this.circumference = 2 * 3.14159265359 * this.radius;
		circle2.style.strokeDasharray = `${.3 * this.circumference}, ${.7 * this.circumference}`;
		circle2.style.strokeDashoffset = .5 * this.circumference;
		this.svg.append( circle2 );

	}

}


document.head.innerHTML += `
  <style>
    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  </style>
`;


function rotatingAnimation( element, animation ) {

	const id = `rotating_animation_${animation.trim().replaceAll( ' ', '_' )}`;

	if ( ! document.getElementById( id ) ) {

		document.head.innerHTML += `
  <style id="${id}">
    .${id} {
      animation: rotating ${animation};
    }
  </style>
`;

	}

	element.classList.add( id );

}


function originAnimation( element, origin, animation ) {

	element.style.animation = animation;
	element.style.transformOrigin = origin;

}



const circle = new Circle();
document.body.append( circle.svg );

const SPEED = 100;

var tween;


document.body.addEventListener( 'mousedown', e => {

	if ( circle.moveTween ) circle.moveTween.kill();

	var rect = circle.svg.getBoundingClientRect();
	var halfWidth = rect.width * 0.5;
	var halfHeight = rect.height * 0.5;

	var dx = e.x - ( rect.x + halfWidth );
	var dy = e.y - ( rect.y + halfHeight );

	var distance = Math.sqrt( dx * dx + dy * dy );


	originAnimation( circle.svg, `${dx}px ${dy}px`, '2s ease-in-out' );

	//circle.moveTween = gsap.to( circle.svg, { left: `${e.x - halfWidth}px`, top: `${e.y - halfHeight}`, duration: distance / SPEED, ease: "linear.inOut", onComplete: () => {

	//	delete circle.moveTween;

	//} } );

} );


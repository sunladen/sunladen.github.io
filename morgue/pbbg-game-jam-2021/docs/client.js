document.head.innerHTML += `<style>
    body { margin: 0; overflow: hidden; }
</style>`;

function E( tagName, parentElement, content ) {

	var e = tagName.startsWith( 'svg:' ) ? document.createElementNS( 'http://www.w3.org/2000/svg', tagName ) : document.createElement( tagName );
	content && ( content instanceof Element ? e.append( content ) : e.innerHTML = content );
	parentElement && parentElement.append( e );
	return e;

}

function svg( parentElement, content ) {

	const svg = E( 'svg:svg', parentElement, content );
	svg.setAttribute( 'viewBox', '0 0 100 100' );
	return svg;

}

function circle( cx = '50', cy = '50', radius = '50', fill = 'blue', parentElement ) {

	const circle = E( 'svg:circle', parentElement );
	circle.setAttribute( 'cx', cx );
	circle.setAttribute( 'cy', cy );
	circle.setAttribute( 'r', radius );
	circle.setAttribute( 'fill', fill );
	return circle;

}

var identity = localStorage.getItem( 'identity' );
var self;

function connect( url ) {

	connect.socket = new WebSocket( url );

	connect.socket.addEventListener( 'open', () => {

		connect.socket.send( JSON.stringify( { type: 'identity', value: identity } ) );
		console.log( `Connected to ${url}` );

	} );

	connect.socket.addEventListener( 'close', () => {

		console.log( 'Connecting...' );
		setTimeout( () => connect( url ), 2000 );

	} );

	connect.socket.addEventListener( 'message', e => {

		var messages = JSON.parse( e.data );

		console.log( 'Messages from server ', messages );

		for ( var message of messages ) {

			var type = message.type || 'unknown';

			if ( type === 'identity' ) {

				localStorage.setItem( 'identity', identity = message.value );

			} else if ( type === 'item' ) {

				const item = message.value;

				items[ item.id ] = item;

				if ( svgs.hasOwnProperty( item.id ) ) svgs[ item.id ].remove();
				const s = svgs[ item.id ] = svg( document.body, circle() );
				s.style.position = 'absolute';
				s.style.left = `${item.x}px`;
				s.style.top = `${item.y}px`;
				s.style.width = `${item.width}px`;
				s.style.height = `${item.height}px`;

				if ( item.id === identity ) {

					self = item;
					s.firstChild.setAttribute( 'fill', 'green' );
					document.body.style.transform = `translate(${window.innerWidth * 0.5 - item.x}px, ${window.innerHeight * 0.5 - item.y}px)`;

				}

			} else if ( type === 'remove' ) {

				const id = message.value;

				if ( svgs.hasOwnProperty( id ) ) {

					svgs[ id ].remove();
					delete svgs[ id ];

				}

			} else if ( type === 'move' ) {

				const e = message.value;
				const id = e.id;

				if ( items.hasOwnProperty( id ) ) {

					const item = items[ id ];
					item.x = e.toX;
					item.y = e.toY;

				}

				if ( svgs.hasOwnProperty( id ) ) {

					const svg = svgs[ id ];
					svg.style.left = `${e.toX}px`;
					svg.style.top = `${e.toY}px`;

				    if ( id === identity ) {

						document.body.style.transform = `translate(${window.innerWidth * 0.5 - e.toX}px, ${window.innerHeight * 0.5 - e.toY}px)`;

					}

				}

			}

		}

	} );

}

window.addEventListener( 'resize', () => {

	if ( self ) document.body.style.transform = `translate(${window.innerWidth * 0.5 - self.x}px, ${window.innerHeight * 0.5 - self.y}px)`;

} );

document.addEventListener( 'click', e => {

	if ( ! self ) return;

	const toX = self.x + ( e.x - window.innerWidth * 0.5 );
	const toY = self.y + ( e.y - window.innerHeight * 0.5 );

	connect.socket.send( JSON.stringify( { type: 'move', value: { id: identity, x: toX, y: toY } } ) );

} );

connect( location.port ? 'ws://localhost:6500' : 'wss://bead-rural-poison.glitch.me/' );

const items = {};
const svgs = {};

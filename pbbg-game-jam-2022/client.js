const updateInterval = 3333;
const serverURL = new URL( document.location.host === 'localhost:8000' ? 'ws://localhost:6500/' : 'wss://daffodil-polite-seat.glitch.me/' );
let identity = JSON.parse( localStorage.getItem( 'client.identity' ) ) ?? {};
if ( identity.secret ) serverURL.search = `secret=${identity.secret}`;
const socket = new WebSocket( serverURL );
socket.onopen = () => console.log( `Connected to ${serverURL}` );
socket.onclose = () => setTimeout( () => window.location.replace( window.location.href ), updateInterval );
socket.onmessage = ( e ) => {
	const messages = JSON.parse( e.data );
	console.log( 'Messages from server ', messages );
	for ( const message of messages ) {
		const funcName = '_' in message ? `on${message._}` : 'onupdate';
		try {
			eval( funcName )( message );
		} catch ( err ) {
			console.log( `no listener for "${funcName}"` );
		}
	}
}

const heartbeat = new Worker( URL.createObjectURL( new Blob( [ `onmessage = () => setInterval( () => postMessage( 0 ), ${updateInterval} )` ] ) ) );
heartbeat.onmessage = () => { const _outMessages = outMessages; outMessages = []; socket.send( JSON.stringify( _outMessages ) ); };
heartbeat.postMessage( 0 );

let inMessages = [];
let outMessages = [];

function send( message ) {

	outbound.push( message );

}

function onverified( message ) {

	identity = { id: message.id, secret: message.secret };
	localStorage.setItem( 'client.identity', JSON.stringify( identity ) );

}

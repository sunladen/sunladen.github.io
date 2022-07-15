const updateInterval = 2000;
const serverURL = new URL( document.location.host === 'localhost:8000' ? 'ws://localhost:6500/' : 'wss://daffodil-polite-seat.glitch.me/' );
const socket = new WebSocket( serverURL );
socket.onopen = () => console.log( `Connected to ${serverURL}` );
socket.onclose = () => setTimeout( () => window.location.replace( window.location.href ), updateInterval );
socket.onmessage = ( e ) => {
	const messages = JSON.parse( e.data );
	console.log( 'Messages from server ', messages );
}

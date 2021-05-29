import encoding from './encoding.mjs';


const api = {

	/**
	 * Send a message through the websocket.
	 * @param {WebSocket} ws
	 * @param {string} message
	 * @param {...*} args
	 */
	send: ( ws, message, ...args ) => {

		console.log( args );

		args = args.length ? Array.from( args ) : [];
		args.unshift( message );

		console.log( `→ ${args} → ${ws.id ? ws.id : ''}` );

		ws.send( encoding.encode( args ) );

	},

	/**
	 * Recieve a message from the websocket.
	 * @param {WebSocket} ws
	 * @param {string} message
	 */
	receive: ( ws, message ) => {

		var encoded_message = ( typeof window === 'undefined' ) ?
			message.buffer.slice( message.byteOffset, message.byteOffset + message.byteLength ) :
			message.data;
		var decoded_message = encoding.decode( encoded_message );

		console.log( `← ${decoded_message}${ws ? ' ← ' + ws.id : ''}` );

		if ( ! Array.isArray( decoded_message ) ) return;

		message = decoded_message.shift();

		api.hasOwnProperty( message ) && api[ message ]( ws, ...decoded_message );

	},

	/**
	 * Receive a connected response from server. ( server -> client )
	 * @param {WebSocket} ws
	 * @param {string} name
	 * @param {string} session
	 */
	connected: ( ws, name, session ) => {

		console.log( "API: No listener for 'connected'" );

	},

	/**
	 * Receive an identity response. ( server <-> client )
	 * @param {WebSocket} ws
	 * @param {string} name
	 * @param {string=} err
	 */
	ident: ( ws, name, err ) => {

		console.log( "API: No listener for 'ident'" );

	},

	/**
	 * Receive a disconnected message from server. ( server -> client )
	 * @param {WebSocket} ws
	 * @param {string} name
	 */
	disconnected: ( ws, name ) => {

		console.log( "API: No listener for 'disconnected'" );

	},

	/**
	 * Receive a welcome response from server. ( server -> client )
	 * @param {string} name
	 */
	welcome( ws, name ) {

		console.log( "API: No listener for 'welcome'" );

	},

	/**
	 * Receive a login message. ( server <-> client )
	 * @param {string} name
	 */
	login( ws, name, password ) {

		console.log( "API: No listener for 'login'" );

	},

	/**
	 * Receive an error message from server. ( server -> client )
	 * @param {string} message
	 */
	error( ws, message ) {

		this.write( message );

	},

	/**
	 * Receive a success message from server. ( server -> client )
	 * @param {string} message
	 */
	success( ws, message ) {

		this.write( message );

	},


};


export default api;

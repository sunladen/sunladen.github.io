import encoding from './encoding.mjs';


const api = {

	/**
	 * Send a message through the websocket.
	 * @param {WebSocket} ws
	 * @param {string} message
	 * @param {...*} args
	 */
	send: ( ws, message, ...args ) => {

		args = args.length ? Array.from( args ) : [];
		args.unshift( message );

		var encoded_message = encoding.encode( args );

		console.log( `→ ${args} → ${encoded_message}[${encoded_message.length}] → ${ws.id ? ws.id : ''}` );

		ws.send( encoded_message );

	},

	/**
	 * Recieve a message from the websocket.
	 * @param {WebSocket} ws
	 * @param {string} message
	 * @param {object=api.client} api - API context (api.client|api.server)
	 */
	receive: ( ws, message, api = api.client ) => {

		var encoded_message = ( typeof window === 'undefined' ) ?
			message.buffer.slice( message.byteOffset, message.byteOffset + message.byteLength ) :
			message.data;
		var decoded_message = encoding.decode( encoded_message );

		console.log( `← ${decoded_message}${ws.id ? ' ← ' + ws.id : ''}` );

		if ( ! Array.isArray( decoded_message ) ) return;

		message = decoded_message.shift();

		api.hasOwnProperty( message ) && api[ message ]( ws, ...decoded_message );

	},


	client: {

		/**
	     * Receive a connected response.
	     * @param {WebSocket} ws
	     * @param {string} name
	     * @param {string} session
	     */
		connected: ( ws, name, session ) => no_listener,

		/**
	     * Receive an identity response.
	     * @param {WebSocket} ws
	     * @param {string} name - Name server identifies client as
	     * @param {string=} err - Error message on error
	     */
		ident: ( ws, name, err ) => no_listener,

		/**
	     * Receive a disconnected message.
	     * @param {WebSocket} ws
	     * @param {string} name - Name of client disconnected
	     */
		disconnected: ( ws, name ) => no_listener,

		/**
	     * Receive a welcome response.
	     * @param {WebSocket} ws
	     * @param {string} name - Name of client being welcomed
	     */
		welcome: ( ws, name ) => no_listener,

		/**
	     * Receive an error message.
	     * @param {WebSocket} ws
	     * @param {string} message
	     */
		error: ( ws, message ) => no_listener,

		/**
	     * Receive a success message.
	     * @param {WebSocket} ws
	     * @param {string} message
	     */
		success: ( ws, message ) => no_listener,

		/**
	     * Receive a say message.
	     * @param {WebSocket} ws
	     * @param {string} message
	     * @param {string=} author - Author of say
	     */
		say: ( ws, message, author ) => no_listener,

	},

	server: {

		/**
		 * Receive an identity request.
	     * @param {WebSocket} ws
	     * @param {string} name - Name client wishes to be identified as
	     */
		ident: ( ws, name ) => no_listener,


		/**
		 * Receive a say message.
    	 * @param {WebSocket} ws
    	 * @param {string} message
    	 */
		say: ( ws, message ) => no_listener,

		/**
    	 * Receive a register request.
    	 * @param {WebSocket} ws
    	 * @param {string} name
     	 * @param {string} password
    	 */
		register: ( ws, name, password ) => no_listener,

		/**
    	 * Receive a login request.
    	 * @param {WebSocket} ws
    	 * @param {string} name
    	 * @param {string} password
    	 */
		login: ( ws, name, password ) => no_listener,

		/**
    	 * Receive a logout request.
    	 * @param {WebSocket} ws
    	 */
		logout: ( ws ) => no_listener,

	}

};



function no_listener() {

	console.log( `API: No listener for '${no_listener.caller}'` );

}


export default api;

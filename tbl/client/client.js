export default class Client {

	constructor( url ) {

		this.url = url;

		this.connect();

	}

	connect() {

		this.socket = new WebSocket( this.url );

		this.socket.addEventListener( 'open', () => {

			this.socket.send( JSON.stringify( { type: 'identity', value: this.identity } ) );
			console.log( `Connected to ${this.url}` );

		} );

		this.socket.addEventListener( 'close', () => {

			console.log( 'Reconnecting...' );
			setTimeout( () => this.connect(), 2000 );

		} );

		this.socket.addEventListener( 'message', e => {

			const messages = JSON.parse( e.data );

			console.log( 'Messages from server ', messages );

			for ( var message of messages ) {

				var type = message.type || 'unknown';

				if ( type === 'identity' ) localStorage.setItem( 'client.identity', this.identity = message.value );

				this.receive( message );

			}

		} );

	}

	receive( message ) { }

	send( message ) {

		this.socket.send( JSON.stringify( message ) );

	}

}



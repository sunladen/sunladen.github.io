export default class Client {

  constructor( url ) {

    this.url = new URL( url );
    this.params = new URLSearchParams( url.search );
    this.identity = JSON.parse( localStorage.getItem( "client.identity" ) ?? "{}" );
    this.knownClients = {};

    if ( this.identity.secret ) this.params.set( "secret", this.identity.secret );

    this.url.search = this.params.toString();

    this.connect();

  }

  connect() {

    this.socket = new WebSocket( this.url );

    this.socket.addEventListener( 'open', () => {

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

        let receiveFuncName = `receive${message.type.charAt( 0 ).toUpperCase() + message.type.slice( 1 )}`;

        if ( receiveFuncName in this ) return this[ receiveFuncName ]( message );

        console.log( `no listener for "${receiveFuncName}"` );

      }

    } );

  }

  receiveConnectionInfo( message ) {

  	localStorage.setItem( 'client.identity', this.identity = JSON.stringify( message.value.identity ) );

    this.knownClients = message.value.clients;

  }

  send( message ) {

    this.socket.send( JSON.stringify( message ) );

  }

}

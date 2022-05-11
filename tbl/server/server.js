import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import Semaphore from './semaphore.js';


export default class Server {

  constructor( port, uuid = ( bytes = 16 ) => crypto.randomBytes( bytes ).toString( "hex" ) ) {

    this.pingIntervalMS = 10000;
    this.updateIntervalMS = 2000;
    this.connectionSecretRE = /[?&]{1}secret=(\w+)/;
    this.messagesLock = new Semaphore( 1 );

    this.clientsById = {};
    this.clientsBySecret = {};

    this.onConnectionInfo = {};
    this.messages = {};

    this.wss = new WebSocketServer( { port: port } );

    this.wss.on( 'connection', ( ws, req ) => {

  		let suppress = false;

  		if ( this.connectionSecretRE.test( req.url ) ) {

    		ws.secret = this.connectionSecretRE.exec( req.url )[ 1 ];

    		if ( ws.secret in this.clientsBySecret ) {

		      // copy id and last_heard from existing connection that shares same secret
          const prevWS = this.clientsBySecret[ ws.secret ];
      		ws.id = prevWS.id;
      		ws.last_heard = prevWS.last_heard;

      		suppress = true;

    		}

  		}

  		if ( ! 'id' in ws ) {

		    // assign a unique id for the client
    		while ( ! 'id' in ws || ws.id in this.clientsById ) ws.id = uuid();

    		// assign a unique secret for the new client
    		while ( ! 'secret' in ws || ws.secret in this.clientsBySecret ) ws.secret = uuid();

  		}

  		// reference client by id and secret
		  this.clientsById[ ws.id ] = ws;
  		this.clientsBySecret[ ws.secret ] = ws;

  		ws.last_heard = Date.now();

  		console.log( '-> connection %s, { id: "%s", secret: "%s" }', req.url, ws.id, ws.secret );

  		// update clients last_heard when pong received
  		ws.on( 'pong', () => ws.id in this.clientsById && ( this.clientsById[ ws.id ].last_heard = Date.now() ) );

  		// tell client its connection info
  		this.send( 'connectionInfo', { identity: { id: ws.id, secret: ws.secret }, info: this.onConnectionInfo }, ws.id );

  		this.onConnectionInfo[ ws.id ] = {};

    	// tell other clients about new client
		  if ( ! suppress ) send( 'connected', null, 'global', ws.id );

		  ws.on( 'message', data => {

		    try {

		      console.log( '-> %s', data );

		      const messages = JSON.parse( data );

		      for ( const message of messages ) {

		        const receiveFuncName = `receive${message.type}`;

		        if ( receiveFuncName in this ) return this[ receiveFuncName ]( message );

		        console.log( `no listener for "${receiveFuncName}"` );

		      }


		    } catch ( e ) {

		      console.error( e );

		    }

		  } );

    } );

    // Send buffered messages to clients at a set interval
    setInterval( async () => {

		  try {

		    await this.messagesLock.acquire();
		    const _messages = this.messages;
		    this.messages = {};
		    this.messagesLock.release();

		    const _global = _messages.global || [];
		    const _global_string = JSON.stringify( _global );

		    for ( const id in this.clientsById ) {

		      const ws = this.clientsById[ id ];

		      if ( id in _messages ) {

		        const _message_string = JSON.stringify( _messages[ id ].concat( _global ) );
		        ws.send( _message_string );
		        console.log( '<- %s', _message_string );

		      } else if ( _global.length ) {

		        ws.send( _global_string );
		        console.log( '<- %s', _global_string );

		      }

		    }

		  } catch ( e ) {

		    console.error( e );

		  }

    }, this.updateIntervalMS );


    // Disconnect clients that haven't responded for awhile
    setInterval( () => {

		  try {

		    const expired = Date.now() - this.pingIntervalMS * 2;

		    for ( const id in this.clientsById ) {

		      const ws = this.clientsById[ id ];

		      if ( ws.last_heard < expired ) {

		      	delete this.onConnectionInfo[ id ];
		      	delete this.clientsById[ id ];
		      	delete this.clientsBySecret[ ws.secret ];

		      	this.send( 'disconnected', 'global', id );

		      	ws.terminate();

		        continue;

		      }

          ws.ping();

		    }

		  } catch ( e ) {

		    console.error( e );

		  }

    }, this.pingIntervalMS );

  }



  /**
	 * Send a message (buffered).
	 *
	 * @param type
	 * @param value
	 * @param target
	 * @param from
	 */
  async send( type, value, target = 'global', from = 'server' ) {

	  await this.messagesLock.acquire();

	  try {

	    ( target in this.messages ? this.messages[ target ] : this.messages[ target ] = [] ).push( { from: from, type: type, value: value } );

	  } finally {

	    this.messagesLock.release();

	  }

  }


}



import { WebSocketServer } from 'ws';
import crypto from 'crypto';


export default class Server {

  constructor( port, uuid = ( bytes = 16 ) => crypto.randomBytes( bytes ).toString( "hex" ) ) {

    this.pingIntervalMS = 10000;
    this.updateIntervalMS = 2000;
    this.connectionSecretRE = /[?&]{1}secret=(\w+)/;

    this.clientsById = {};
    this.clientsBySecret = {};

    this.inbound = [];
    this.outbound = {};

    this.state = {
      clients: {},
    };

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

  		if ( ! ( 'id' in ws ) ) {

		    // assign a unique id for the client
    		while ( ! ( 'id' in ws ) || ws.id in this.clientsById ) ws.id = uuid();

    		// assign a unique secret for the new client
    		while ( ! ( 'secret' in ws ) || ws.secret in this.clientsBySecret ) ws.secret = uuid();

  		}

  		// reference client by id and secret
		  this.clientsById[ ws.id ] = ws;
  		this.clientsBySecret[ ws.secret ] = ws;

  		ws.last_heard = Date.now();

  		console.log( '-> connection %s, { id: "%s", secret: "%s" }', req.url, ws.id, ws.secret );

  		// update clients last_heard when pong received
  		ws.on( 'pong', () => ws.id in this.clientsById && ( this.clientsById[ ws.id ].last_heard = Date.now() ) );

  		// tell client its connection info
  		this.send( 'ConnectionInfo', { identity: { id: ws.id, secret: ws.secret }, state: this.state }, ws.id );

  		this.state.clients[ ws.id ] = {};

    	// announce new client connection
		  if ( ! suppress ) {

        this.send( 'ClientConnected', null, 'global', ws.id );

      	this.connected( ws, ws.id );

      }

		  ws.on( 'message', data => {

		    try {

		      console.log( '-> %s', data );
		      const messages = JSON.parse( data );
          this.inbound.push( messages );

		    } catch ( e ) {

		      console.error( e );

		    }

		  } );

    } );

    // Send buffered messages to clients at a set interval
    setInterval( () => {

		  try {

        const _inbound = this.inbound;
		    this.inbound = [];

		    for ( const message of _inbound ) {

		      const receiveFuncName = `receive${message.type}`;
		      if ( receiveFuncName in this ) this[ receiveFuncName ]( message );
          else console.log( `no listener for "${receiveFuncName}"` );

		    }

        this.update();

		    const _outbound = this.outbound;
		    this.outbound = {};

		    const _global = _outbound.global || [];
        const sent = {};

        //console.log( this.clientsById );

		    for ( const id in _outbound ) {

          if ( ! ( id in this.clientsById ) ) continue;

		      const ws = this.clientsById[ id ];

		      if ( _global.length ) _outbound[ id ].concat( _global );

		      const _message_string = JSON.stringify( _outbound[ id ].concat( _global ) );
		      ws.send( _message_string );
		      console.log( '<- %s', _message_string );

          sent[ id ] = null;

        }

        if ( _global.length ) {

          const _message_string = JSON.stringify( _global );

          for ( const id in this.clientsById ) {

            if ( id in sent ) continue;

		      	const ws = this.clientsById[ id ];
            ws.send( _message_string );
		      	console.log( '<- %s', _message_string );

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

		      	delete this.state.clients[ id ];
		      	delete this.clientsById[ id ];
		      	delete this.clientsBySecret[ ws.secret ];

		      	this.send( 'disconnected', 'global', id );

		      	ws.terminate();

            this.disconnected( id );

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
  send( type, value, target = 'global', from = 'server' ) {

    ( target in this.outbound ? this.outbound[ target ] : this.outbound[ target ] = [] ).push( { from: from, type: type, value: value } );

  }



  /**
	 * Called on client connection.
	 * @param ws
	 * @param id
	 */
  connected( ws, id ) {
  }


  /**
	 * Called on client disconnection.
	 * @param id
	 */
  disconnected( id ) {
  }



  /**
	 * Update server state.
	 * Called after receiving inbound messages and before sending outbound messages.
	 * Interval frequency is defined by this.updateIntervalMS [default=2000]
	 */
  update() {
  }

}


import { WebSocketServer } from 'ws';
import crypto from 'crypto';


export default class Server {

    constructor( port ) {

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
                while ( ! ( 'id' in ws ) || ws.id in this.clientsById ) ws.id = Server.uuid();

                // assign a unique secret for the new client
                while ( ! ( 'secret' in ws ) || ws.secret in this.clientsBySecret ) ws.secret = Server.uuid();

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
    				if ( messages.constructor !== Array ) messages = [ messages ];
                    for ( const message of messages ) this.inbound.push( { message: message, from: ws.id } );

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

                    const receiveFuncName = `receive${message.message.type}`;
                    if ( receiveFuncName in this ) this[ receiveFuncName ]( message.message, message.from );
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

                        this.send( 'ClientDisconnected', null, 'global', id );

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


    static uuid( bytes = 16 ) {

        return crypto.randomBytes( bytes ).toString( "hex" );

    }

    /**
     * Send a message (buffered).
     *
     * @param type
     * @param value
     * @param to
     * @param from
     */
    send( type, value, to = 'global', from = 'server' ) {

        ( to in this.outbound ? this.outbound[ to ] : this.outbound[ to ] = [] ).push( { from: from, type: type, value: value } );

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


    /**
	 * Called when a client sends Chat message.
	 * @param {json} message {
	 * 		type: "Send",
	 * 		value: {json},
	 * 		to: {clientid}
	 * }
	 * @param {clientid} from
	 */
    receiveSend( message, from ) {

    	this.send( message.type, message.value, message.to, from );

    }

}


export default class Client {

    constructor( url ) {

        this.url = new URL( url );
        this.params = new URLSearchParams( url.search );
        this.updateIntervalMS = 1000;
        this.outbound = [];
        this.state = {};
        this.debug = true;
        try {

            this.identity = JSON.parse( localStorage.getItem( "client.identity" ) ) ?? {};

        } catch {

            this.identity = {};

        }
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
            for ( const message of messages ) {

                const receiveFuncName = `receive${message.type}`;
                if ( receiveFuncName in this ) {

                    this[ receiveFuncName ]( message );
                    continue;

                }
                console.log( `no listener for "${receiveFuncName}"` );

            }

        } );
        // Send buffered messages to server at a set interval
        setInterval( () => {

            if ( ! this.outbound.length ) return;
            const _outbound = this.outbound;
            this.outbound = [];
            const _messages_string = JSON.stringify( _outbound );
            this.socket.send( _messages_string );

        }, this.updateIntervalMS );

    }

    /**
     * Send a message (buffered).
     *
     * @param type
     * @param value
     * @param to
     */
    send( type, value, to = 'global' ) {

        this.outbound.push( { type: type, value: value, to: to } );

    }

    /**
     * Called on receipt of ConnectionInfo.
     * @param {json} message {
     *     from: 'server',
     *     type: 'ConnectionInfo',
     *     value: {
     *         identity: {
     *             id: {string},
     *             secret: {string}
     *         },
     *         state: {
     *             clients: {
     *                 {string} <id>: {...},
     *                 ...
     *             },
	 *             ...
     *         }
     *     }
     * }
     */
    receiveConnectionInfo( message ) {

        this.identity = message.value.identity;
        localStorage.setItem( 'client.identity', JSON.stringify( this.identity ) );
        this.state = message.value.state;
        delete this.state.clients[ this.identity.id ];

    }

    /**
     * Called on receipt of ClientConnected.
     * @param {json} message {
     *     from: {string} <id>,
     *     type: 'ClientConnected',
     *     value: null
     * }
     */
    receiveClientConnected( message ) {

        if ( message.from !== this.identity.id ) this.state.clients[ message.from ] = message.value;
        this.connected( message.from );

    }

    /**
     * Called on receipt of ClientDisconnected.
     * @param {json} message {
     *     from: {string} <id>,
     *     type: 'ClientDisconnected',
     *     value: null
     * }
     */
    receiveClientDisconnected( message ) {

        delete this.state.clients[ message.from ];
        this.disconnected( message.from );

    }

    /**
	 * Called when a new client connects.
	 * @param {string} id
	 */
    connected( id ) {
    }

    /**
	 * Called when a client disconnects.
	 * @param {string} id
	 */
    disconnected( id ) {
    }

}

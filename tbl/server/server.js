import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import Semaphore from './semaphore.js';

const CLIENT_PING_INTERVAL = 10000;
const CLIENT_UPDATE_INTERVAL = 2000;
const RE_CONNECTION_SECRET = /[?&]{1}secret=(\w+)/;
const messages_lock = new Semaphore( 1 );

const identifiedById = {};
const identifiedBySecret = {};

// other clients information to send on connection
const clientsInfo = {};

let messages = {};

const wss = new WebSocketServer( { port: process.env.PORT } );

// on ws connection
wss.on( 'connection', ( ws, req ) => {

  let suppress_connection_broadcast = false;

  if ( RE_CONNECTION_SECRET.test( req.url ) ) {

    // connection URL ?secret= provided
    ws.secret = RE_CONNECTION_SECRET.exec( req.url )[ 1 ];

    if ( identifiedBySecret.hasOwnProperty( ws.secret ) ) {

      // copy id and last_heard from existing connection that shares same secret
      ws.id = identifiedBySecret[ ws.secret ].id;
      ws.last_heard = identifiedBySecret[ ws.secret ].last_heard;

      suppress_connection_broadcast = true;

    }

  }

  if ( ! ws.hasOwnProperty( 'id' ) ) {

    // assign a unique id for the client
    while ( ! ws.hasOwnProperty( 'id' ) || identifiedById.hasOwnProperty( ws.id ) ) ws.id = uuid();

    // assign a unique secret for the new client
    while ( ! ws.hasOwnProperty( 'secret' ) || identifiedBySecret.hasOwnProperty( ws.secret ) ) ws.secret = uuid();

  }

  // map id and secret to client
  identifiedById[ ws.id ] = ws;
  identifiedBySecret[ ws.secret ] = ws;

  ws.last_heard = Date.now();

  console.log( '-> connection %s, { id: "%s", secret: "%s" }', req.url, ws.id, ws.secret );

  // update clients last_heard when pong received
  ws.on( 'pong', () => {

    identifiedById.hasOwnProperty( ws.id ) && ( identifiedById[ ws.id ].last_heard = Date.now() );

  } );

  // tell client its connection info
  send( 'connectionInfo', { identity: { id: ws.id, secret: ws.secret }, clients: clientsInfo }, ws.id );

  clientsInfo[ ws.id ] = {};

  if ( ! suppress_connection_broadcast ) {

    // tell other clients about new client
    send( 'connected', null, 'global', ws.id );

  }

  ws.on( 'message', message => {

    try {

      console.log( '-> %s', message );
      message = JSON.parse( message );

    } catch ( e ) {

      console.error( e );

    }

  } );

} );



/**
 * Returns a UUID of length @bytes
 */
function uuid( bytes = 16 ) {

  return crypto.randomBytes( bytes ).toString( "hex" );

}



/**
 * Buffers a message to send to a client or all clients.
 */
async function send( type, value, target = 'global', from = 'server' ) {

  await messages_lock.acquire();

  try {

    ( messages.hasOwnProperty( target ) ? messages[ target ] : messages[ target ] = [] ).push( { from: from, type: type, value: value } );

  } finally {

    messages_lock.release();

  }

}




/**
 * Send buffered messages to clients.
 */
setInterval( async () => {

  try {

    let _messages;

    await messages_lock.acquire();

    try {

      _messages = messages;
      messages = {};

    } finally {

      messages_lock.release();

    }

    const _global = _messages.global || [];
    const _global_stringified = JSON.stringify( _global );

    for ( const id in identifiedById ) {

      let ws = identifiedById[ id ];

      if ( _messages.hasOwnProperty( id ) ) {

        let _message_stringified = JSON.stringify( _messages[ id ].concat( _global ) );
        ws.send( _message_stringified );
        console.log( '<- %s', _message_stringified );

      } else if ( _global.length ) {

        ws.send( _global_stringified );
        console.log( '<- %s', _global_stringified );

      }

    }

  } catch ( e ) {

    console.error( e );

  }

}, CLIENT_UPDATE_INTERVAL );




/**
 * Disconnect clients that haven't responded to a ping.
 */
setInterval( () => {

  try {

    var expired = Date.now() - ( CLIENT_PING_INTERVAL * 2 );

    for ( const id in identifiedById ) {

      var ws = identifiedById[ id ];

      if ( ws.last_heard >= expired ) {

        ws.ping();
        continue;

      }

      delete clientsInfo[ id ];
      delete identifiedById[ id ];
      delete identifiedBySecret[ ws.secret ];

      send( 'disconnected', 'global', id );
      ws.terminate();

    }

  } catch ( e ) {

    console.error( e );

  }

}, CLIENT_PING_INTERVAL );


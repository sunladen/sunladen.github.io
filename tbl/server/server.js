import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import Semaphore from './semaphore.js';

const CLIENT_PING_INTERVAL = 10000;
const CLIENT_UPDATE_INTERVAL = 2000;
const RE_CONNECTION_SECRET = /[?&]{1}secret=(\w+)/;
const messages_lock = new Semaphore( 1 );

const identifiedById = {};
const identifiedBySecret = {};

let messages = {};

const wss = new WebSocketServer( { port: process.env.PORT } );

// on ws connection
wss.on( 'connection', ( ws, req ) => {

  // is client trying to identify itself via the connection URL id querystring?
  if ( RE_CONNECTION_SECRET.test( req.url ) ) {

    // assign the client its requested id
    ws.secret = RE_CONNECTION_SECRET.exec( req.url )[ 1 ];

    // if client is already identified (re-connect)
    if ( identifiedBySecret.hasOwnProperty( ws.secret ) ) {

      // copy id to new ws
      ws.id = identifiedBySecret[ ws.secret ].id;

      // copy previous known last_heard to new ws
      ws.last_heard = identifiedBySecret[ ws.secret ].last_heard;

    }

  } else {

    // assign a unique id for the new client
    while ( ! ws.hasOwnProperty( 'id' ) || identifiedById.hasOwnProperty( ws.id ) ) ws.id = uuid();

    // assign a unique secret for the new client
    while ( ! ws.hasOwnProperty( 'secret' ) || identifiedBySecret.hasOwnProperty( ws.secret ) ) ws.secret = uuid();

  }

  // add client to identified by id map
  identifiedById[ ws.id ] = ws;

  // add client to identified by secret map
  identifiedBySecret[ ws.secret ] = ws;

  // update clients last_heard when pong received
  ws.on( 'pong', () => {

    identifiedById.hasOwnProperty( ws.id ) && ( identifiedById[ ws.id ].last_heard = ( new Date() ).getTime() );

  } );

  console.log( 'connection %s, client id = %s', req.url, ws.id );

  // send new clients their identity and initial state
  if ( ! ws.last_heard ) {

    send( { type: 'identity', value: { id: ws.id, secret: ws.secret } }, ws.id );
    send( { type: 'contents', value: contents }, ws.id );

  }

  ws.on( 'message', message => {

    try {

      console.log( 'received: %s', message = JSON.parse( message ) );

      if ( 'identity' === message.type ) {

      }


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
async function send( message, target = 'global' ) {

  await messages_lock.acquire();

  try {

    ( messages.hasOwnProperty( target ) ? messages[ target ] : messages[ target ] = [] ).push( message );

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

      _messages = Object.assign( {}, messages );

      messages = {};

    } finally {

      messages_lock.release();

    }

    const _global = _messages.global || [];
    const _global_stringified = JSON.stringify( _global );

    for ( const id in identifiedById ) {

      let ws = identifiedById[ id ];

      if ( _messages.hasOwnProperty( id ) ) {

        ws.send( JSON.stringify( _messages[ id ].concat( _global ) ) );

      } else if ( _global.length ) {

        ws.send( _global_stringified );

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

    var expired = ( new Date() ).getTime() - ( CLIENT_PING_INTERVAL * 2 );

    for ( const id in identifiedById ) {

      var ws = identifiedById[ id ];

      if ( ws.last_heard >= expired ) {

        ws.ping();
        continue;

      }

      delete identifiedById[ id ];
      delete identifiedBySecret[ ws.secret ];
      console.log( `client "${id}" disconnected` );
      send( { type: 'remove', value: id } );
      ws.terminate();

    }

  } catch ( e ) {

    console.error( e );

  }

}, CLIENT_PING_INTERVAL );




const contents = {
  contents: {
    'camp': {
      name: 'camp',
      contents: {
        'campfire': {
          name: 'campfire',
          contents: {
            'kindling': {
              name: 'kindling',
              contents: {
                'wood scrap': {
                  name: 'wood scrap',
                  weight: 1.5
                }
              }
            },
            'fire': {
              name: 'fire',
              contents: {
                'hatchet head': {
                  name: 'hatchet head',
                  contents: {
                    'metal': {
                      name: 'metal',
                      weight: 1.5
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};


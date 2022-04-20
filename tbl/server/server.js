import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import Semaphore from './semaphore.js';

const CLIENT_PING_INTERVAL = 10000;
const CLIENT_UPDATE_INTERVAL = 2000;

const uuid = ( bytes = 16 ) => crypto.randomBytes( bytes ).toString( "hex" );
const identified = {};
const messages_lock = new Semaphore( 1 );

let messages = {};

const wss = new WebSocketServer( { port: process.env.PORT } );

wss.on( 'connection', ws => {

  ws.on( 'message', message => {

    try {

      console.log( 'received: %s', message = JSON.parse( message ) );

      if ( 'identity' === message.type ) {

        identified.hasOwnProperty( ws.id ) && delete identified[ ws.id ];

        let id = message.value;

        ws.id = id ?? `client-${uuid()}`;

        identified[ ws.id ] = ws;

        console.log( 'client %s connected', ws.id );

        send( { type: 'identity', value: ws.id }, ws.id );
        send( { type: 'contents', value: contents }, ws.id );

        ws.last_heard = ( new Date() ).getTime();

        ws.on( 'pong', () => {

          identified.hasOwnProperty( ws.id ) && ( identified[ ws.id ].last_heard = ( new Date() ).getTime() );

        } );

      }


    } catch ( e ) {

      console.error( e );

    }

  } );

} );



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

    for ( const id in identified ) {

      let ws = identified[ id ];

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

    for ( const id in identified ) {

      var ws = identified[ id ];

      if ( ws.last_heard >= expired ) {

        ws.ping();
        continue;

      }

      delete identified[ id ];
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


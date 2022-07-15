import { WebSocketServer } from 'ws';

const wss = new WebSocketServer( { port: process.env.PORT } );

wss.on( 'connection', ( ws, req ) => {

	console.log( ws, req );

} );

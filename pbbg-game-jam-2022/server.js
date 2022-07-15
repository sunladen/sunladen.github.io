import { WebSocketServer } from 'ws';

const port = process.env.PORT;
const verifyClient = ( info ) => [ 'http://localhost:8000', 'https://sunladen.github.io' ].indexOf( info.req.headers.origin ) > - 1;
const wss = new WebSocketServer( { port, verifyClient } );

wss.on( 'connection', ( ws, req ) => {

	console.log( ws, req );

} );

import Server from './server.js';

export default class TextBattleLootServer extends Server {

  constructor() {

    super( process.env.PORT );

  }

  connected( ws, id ) {

    console.log( `client ${id} connected` );

  }


  disconnected( id ) {

    console.log( `client ${id} disconnected` );

  }


  update() {

    console.log( 'update' );

  }

}

new TextBattleLootServer();


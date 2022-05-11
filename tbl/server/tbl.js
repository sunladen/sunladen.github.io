import Server from './server.js';

export default class TextBattleLootServer extends Server {

  constructor() {

    super( process.env.PORT );

  }

}

new TextBattleLootServer();


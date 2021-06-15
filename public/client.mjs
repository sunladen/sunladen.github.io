import Chat from './chat.mjs';


class World {

	constructor() {



	}

}


const world = new World();


var host = location.host.startsWith( 'localhost' ) ? location.host : 'scandalous-antique-mosquito.glitch.me';
const chat = new Chat( `${location.protocol.replace( 'http', 'ws' )}//${host}`, document.body );
chat.focus();



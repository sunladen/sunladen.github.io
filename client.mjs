import Chat from './chat.mjs';

var host = location.host.startsWith( "localhost" ) ? location.host : "scandalous-antique-mosquito.glitch.me";
const chat = new Chat( `${location.protocol.replace( "http", "ws" )}//${host}` );
document.body.append( chat.dom );
chat.focus();

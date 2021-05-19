import encoding from './encoding.mjs';


export default class Chat {

	constructor( url ) {

		var self = this;

		this.id = localStorage.getItem( 'id' );
		this.dom = createElement( 'div', 'ws-chat ws-chat-font' );
		this.historyDom = createElement( 'div', 'ws-chat-history', null, this.dom );
		this.input = createElement( 'input', 'ws-chat-input', null, this.dom );
		this.input.setAttribute( 'type', 'text' );
		this.blur();
		this.url = url;
		this.ident_change_cache = {};
		this.mutes = JSON.parse( localStorage.getItem( 'mutes' ) || '{}' );

		this.input.addEventListener( 'keyup', event => {

			var key = event.key;

			if ( key === 'Enter' ) {

				var message = this.input.value;

				// remove XML/HTML markup from message
				message = message.replace( /(<([^>]+)>)/ig, '' ).trim();

				this.input.value = '';

				if ( message === '' ) return;
				if ( ! message.startsWith( '/' ) ) return this.say( message );

				if ( re.register.test( message ) ) {

					var register = re.register.exec( message );
					return this.register( register[ 1 ], register[ 2 ] );

				}

				if ( message.startsWith( '/login' ) ) return this.login( message );


				if ( re.help.test( message ) ) return this.write( this.help() );

				if ( re.mutes.test( message ) ) {

					for ( var name in this.mutes ) {

						this.write( `@${name}` );

					}

					return;

				}

				if ( re.mute.test( message ) ) return this.mute( re.mute.exec( message )[ 1 ] );
				if ( re.unmute.test( message ) ) return this.unmute( re.unmute.exec( message )[ 1 ] );

				this.write( `Command '${message}' not found` );

			}

		} );

		window.addEventListener( 'beforeunload', () => this.disconnect() );

		this.input.addEventListener( 'focus', () => this.focus() );

		this.responses = {

			connected: ( id ) => {

				if ( ! this.id ) {

					this.id = id;
					localStorage.setItem( 'id', this.id );

				}

				this.send( [ 'ident', this.id ] );

			},

			welcome: ( id ) => {

				if ( ! self.mutes.hasOwnProperty( id ) || ! self.mutes[ id ] ) {

					this.write( `Welcome @${id}` );

				}

			},

			error: ( error ) => {

				this.write( error );

			},

			ident_change: ( oldid, newid ) => {

				if ( this.id === oldid ) {

					this.id = newid;
					localStorage.setItem( 'id', this.id );

					if ( this.register_requested ) {

						delete this[ 'register_required' ];
					    this.write( `Successfully registered as @${newid}` );

					}

				} else {

					this.ident_change_cache[ newid ] = oldid;

				}

			},

			success: ( message ) => {

				this.write( message );

			},

			say: ( id, message ) => {

				this.write( message, id );

			}

		};

		this.reconnect();

		setInterval( () => {

			if ( ! self.ws ) {

				console.log( 'WebSocket closed, attempting reconnection...' );
				self.reconnect();

			}

		}, 1000 );

		chat_instances.push( this );

	}

	reconnect() {

		this.write( `Connecting to '${this.url}'` );

		this.ws = new WebSocket( this.url );
		this.ws.binaryType = 'arraybuffer';
		this.ws.onopen = () => {

			console.log( 'WebSocket open' );

		};

		this.ws.onmessage = event => {

			var message = encoding.decode( event.data );
			var response = message.shift();
			( 'function' === typeof this.responses[ response ] ) && this.responses[ response ]( ...message );

		};

		this.ws.onclose = () => {

			this.ws = null;

		};

		this.ws.onerror = event => {

			console.log( event );

		};

	}

	disconnect() {

		if ( this.ws ) this.ws.close();

	}

	help() {

		return '<div>' + [
			`Chat ${this.connected() ? '' : 'not '}connected to '${this.url}'`,
			'',
			'<span class="ws-chat-highlight">/?|/help()</span> - Connection status and available commands',
			'<span class="ws-chat-highlight">/rename &lt;newname&gt;</span> - Change your name',
			'<span class="ws-chat-highlight">/mutes</span> - List mutes',
		].join( '</div><div>\n' ) + '</div>';

	}

	focus() {

		this.dom.style.background = 'rgba(0,0,0,0.8)';
		this.historyDom.style.overflowY = 'auto';
		this.input.style.background = null;
		this.input.setAttribute( 'placeholder', '...' );
		this.input.focus();

	}

	blur() {

		this.historyDom.style.overflowY = 'hidden';
		this.dom.style.background = null;
		this.input.style.background = 'rgba(0,0,0,0.8)';
		this.input.removeAttribute( 'placeholder' );

	}

	connected() {

		return this.ws !== null;

	}

	write( message, origin ) {

		if ( origin && this.mutes.hasOwnProperty( origin ) && this.mutes[ origin ] ) return;

		var now = new Date();
		var minsec = `0${now.getHours()}`.slice( - 2 ) + ':' + `0${now.getMinutes()}`.slice( - 2 );

		if ( ! this.lastwrite || this.lastwrite != minsec ) createElement( 'div', 'ws-chat-timestamp', minsec, this.historyDom );

		var div = createElement( 'div', 'ws-chat-message', null, this.historyDom );
		div.innerHTML = '';

		if ( origin ) {

			if ( this.ident_change_cache.hasOwnProperty( origin ) ) {

				var oldname = this.ident_change_cache[ origin ];
				delete this.ident_change_cache[ origin ];
				origin = `${oldname} - ${origin}`;

			}

			div.innerHTML = `<span onmouseover="CHAT.mouseOverMention(this)" class="ws-chat-mention">${origin}</span>: `;

		}

		if ( message instanceof Element ) {

			div.append( message );

		} else {

			div.innerHTML += message.replaceAll( re.mention, `<span onmouseover="CHAT.mouseOverMention(this)" class="ws-chat-mention">$1</span>` );

		}

		this.historyDom.scrollTo( 0, this.historyDom.scrollHeight );
		this.lastwrite = minsec;

	}

	send( message ) {

		this.ws && this.ws.send( encoding.encode( message ) );

	}

	say( message ) {

		this.write( message, this.id );
		this.send( [ 'say', message ] );

	}

	mute( name ) {

		this.write( 'muted', name );
		this.mutes[ name ] = true;
		localStorage.setItem( 'mutes', JSON.stringify( this.mutes ) );

	}

	unmute( name ) {

		delete this.mutes[ name ];
		localStorage.setItem( 'mutes', JSON.stringify( this.mutes ) );
		this.write( 'unmuted', name );

	}

	register( name, password ) {

		this.register_requested = true;
		this.send( [ 'register', name, password ] );

	}

	login( name, password ) {

		var re = /^\/login (\w+) (\w+)$/;

		if ( ! password ) {

			if ( ! re.test( name ) ) return this.write( 'usage: /login &lt;name&gt; &lt;password&gt;' );

			var args = re.exec( name );
			name = args[ 1 ];
			password = args[ 2 ];

		}


		this.send( [ 'login', name, password ] );

	}

}



window.CHAT = {

	mouseOverMention: e => {

		var name = e.innerText;

		var hover = createElement( 'div', 'ws-chat-mention-hover ws-chat-font', null, document.body );
		hover.style.left = `calc(${mouse.x}px - 1em)`;
		hover.style.top = `calc(${mouse.y}px - 1em)`;
		hover.addEventListener( 'mouseleave', () => hover.remove() );

		createElement( 'div', 'ws-chat-mention', name, hover );



	}

};


const chat_instances = [];
const mouse = { x: 0, y: 0 };
const re = {
	help: /^\/(\?|help)$/,
	mutes: /^\/mutes$/,
	mute: /^\/mute (\w+)$/,
	unmute: /^\/unmute (\w+)$/,
	register: /^\/register (\w+) (\w+)$/,
	mention: /@(\w+)/g,
};

function createElement( tagName, className, content, parent ) {

	var div = document.createElement( tagName );
	if ( className ) div.className = className;
	if ( content != undefined ) content instanceof Element ? div.append( content ) : div.textContent = content;
	parent && parent.append( div );
	return div;

}


document.body.addEventListener( 'mousemove', e => {

	var x = mouse.x = e.clientX;
	var y = mouse.y = e.clientY;

	// blur if input is not longer the active and mouse is outside chat box
	for ( var i = 0; i < chat_instances.length; i ++ ) {

		var chat = chat_instances[ i ];
		if ( document.activeElement === chat.input ) return;
		var bcr = chat.dom.getBoundingClientRect();
		( x < bcr.left || x > bcr.right || y < bcr.top || y > bcr.bottom ) && chat.blur();

	}

} );

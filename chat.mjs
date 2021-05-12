import encoding from './encoding.mjs';


export default class Chat {

	constructor( url ) {

		var self = this;

		this.id = localStorage.getItem( 'id' );
		this.dom = utils.createElement( 'div', 'ws-chat' );
		this.historyDom = utils.createElement( 'div', 'ws-chat-history', null, this.dom );
		this.input = utils.createElement( 'input', 'ws-chat-input', null, this.dom );
		this.input.setAttribute( 'type', 'text' );
		this.blur();
		this.url = url;
		this.ident_change_cache = {};
		this.mutes = JSON.parse( localStorage.getItem( 'mutes' ) || '{}' );

		this.re_rename = /^\/rename (\w+)$/;
		this.re_help = /^\/(\?|help)$/;
		this.re_mutes = /^\/mutes$/;
		this.re_mute = /^\/mute (\w+)$/;
		this.re_unmute = /^\/unmute (\w+)$/;

		this.input.addEventListener( 'keyup', event => {

			var key = event.key;

			if ( key === 'Enter' ) {

				var message = this.input.value;

				// remove XML/HTML markup from message
				message = message.replace( /(<([^>]+)>)/ig, '' ).trim();

				this.input.value = '';

				if ( message === '' ) return;
				if ( ! message.startsWith( '/' ) ) return this.say( message );
				if ( this.re_rename.test( message ) ) return this.rename( this.re_rename.exec( message )[ 1 ] );
				if ( this.re_help.test( message ) ) return this.write( this.help() );

				if ( this.re_mutes.test( message ) ) {

					for ( var name in this.mutes ) this.write( utils.createNameElement( this, name ) );
					return;

				}

				if ( this.re_mute.test( message ) ) return this.mute( this.re_mute.exec( message )[ 1 ] );
				if ( this.re_unmute.test( message ) ) return this.unmute( this.re_unmute.exec( message )[ 1 ] );

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

					this.write( `Welcome ${utils.createNameElement( this, id )}` );

				}

			},

			error: ( error ) => {

				this.write( error );

			},

			ident_change: ( oldid, newid ) => {

				if ( this.id === oldid ) {

					this.id = newid;
					localStorage.setItem( 'id', this.id );
					this.write( `Successfully renamed to ${utils.createNameElement( this, newid )}` );

				} else {

					this.ident_change_cache[ newid ] = oldid;

				}

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
		this.input.setAttribute( 'placeholder', 'Type a message...' );
		this.input.focus();

		document.body.addEventListener( 'mousemove', e => {

			// blur if input is not longer the active and mouse is outside chat box
			if ( document.activeElement === this.input ) return;
			var bcr = this.dom.getBoundingClientRect();
			( e.clientX < bcr.left || e.clientX > bcr.right || e.clientY < bcr.top || e.clientY > bcr.bottom ) && this.blur();

		} );

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

		if ( ! this.lastwrite || this.lastwrite != minsec ) utils.createElement( 'div', 'ws-chat-timestamp', minsec, this.historyDom );

		var div = utils.createElement( 'div', 'ws-chat-message', null, this.historyDom );

		if ( message instanceof Element ) {

			div.append( message );

		} else {

			div.innerHTML = message;

		}

		if ( origin ) {

			if ( this.ident_change_cache.hasOwnProperty( origin ) ) {

				var oldname = this.ident_change_cache[ origin ];
				delete this.ident_change_cache[ origin ];
				origin = `${oldname} - ${origin}`;

			}

			div.innerHTML = ' ' + div.innerHTML;
			div.insertBefore( utils.createNameElement( this, origin ), div.firstChild );

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

	rename( name ) {

		this.send( [ 'ident', name ] );

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

}




const utils = {

	createNameElement: ( chat, name ) => {

		var span = utils.createElement( 'span', 'ws-chat-name', name );

		span.addEventListener( 'click', event => {

			var div = utils.createElement( 'div', 'ws-chat-useroptions', name, document.body );
			div.style.left = `calc(${event.clientX}px - 1em)`;
			div.style.top = `calc(${event.clientY}px - 1em)`;

			if ( name !== chat.id ) {

				var muteoption = utils.createElement( 'div', 'ws-chat-useroption', null, div );
				var toggle = utils.createElement( 'div', 'ws-chat-useroption-toggle', null, muteoption );

				toggle.style.background = ( chat.mutes.hasOwnProperty( name ) && chat.mutes[ name ] ) ? 'green' : 'grey';
				utils.createElement( 'div', 'ws-chat-useroption-text', 'mute', muteoption );

				muteoption.addEventListener( 'click', () => {

					var muted = chat.mutes.hasOwnProperty( name );
					muted ? chat.unmute( name ) : chat.mute( name );
					toggle.style.background = muted ? 'grey' : 'green';

				} );

			}

			div.addEventListener( 'mouseleave', () => {

				div.remove();

			} );

		} );

		return span;

	},

	createElement: ( tagName, className, content, parent ) => {

		var div = document.createElement( tagName );
		if ( className ) div.className = className;
		if ( content != undefined ) content instanceof Element ? div.append( content ) : div.textContent = content;
		parent && parent.append( div );
		return div;

	}

};

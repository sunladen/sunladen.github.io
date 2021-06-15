import api from './api.mjs';


export default class Chat {

	constructor( url, dom ) {

		var self = this;

		this.id = {
			name: localStorage.getItem( 'name' ),
			session: localStorage.getItem( 'session' )
		};
		this.url = this.id.session ? `${url}?session=${this.id.session}` : url;

		this.re = {
			at_name: new RegExp( '@([\\w-]+)', 'g' ),
		    at_name_end: new RegExp( '@([\\w-]+)$' )
		};

		this.known_names = {};
		this.muted = JSON.parse( localStorage.getItem( 'muted' ) || '{}' );
		this.history = JSON.parse( localStorage.getItem( 'input_history' ) || '[]' );
		this.history_index = this.history.length;
		this.commands = {};

		this.setCommand( 'help', {
			help: 'List available commands',
			args: { name: [], re: [] },
			exec: () => {

				for ( var command in this.commands ) {

					if ( command === 'help' ) continue;
					var cmd = this.commands[ command ];
					var args = cmd.args.name.length ? ` &lt;${cmd.args.name.join( '&gt; &lt;' )}&gt;` : '';
					this.write( `/${command}${args} - ${cmd.help}` );

				}

			}
		} );

		this.setCommand( 'mute', {
			help: 'Mute someone',
			args: { name: [ 'name' ], re: [ '@?[\\w-]+' ] },
			exec: ( args ) => this.mute( args[ 1 ] )
		} );

		this.setCommand( 'unmute', {
			help: 'Unmute someone',
			args: { name: [ 'name' ], re: [ '@?[\\w-]+' ] },
			exec: ( args ) => this.unmute( args[ 1 ] )
		} );

		this.setCommand( 'mutes', {
			help: 'List mutes',
			args: { name: [], re: [] },
			exec: () => this.mutes()
		} );

	    this.setCommand( 'register', {
			help: 'Register a new account',
			args: { name: [ 'name', 'password' ], re: [ '\\w+', '\\w+' ] }
		} );

		this.setCommand( 'login', {
			help: 'Login to a named account',
			args: { name: [ 'name', 'password' ], re: [ '\\w+', '\\w+' ] }
		} );

		this.setCommand( 'logout', {
			help: 'Logout of named account',
			args: { name: [], re: [] }
		} );

		api.client.connected = ( ws, name, session ) => {

			localStorage.setItem( 'session', this.id.session = session );
			this.dom.name.textContent = this.id.name || name;
			this.known_names[ this.id.name || name ] = null;
			api.send( ws, 'ident', this.id.name || name );

		};

		api.client.ident = ( ws, name, err ) => {

			localStorage.setItem( 'name', this.id.name = name );
			this.dom.name.textContent = name;
			this.known_names[ name ] = null;
			err && this.error( err );

		};

	    api.client.welcome = ( ws, name ) => {

			this.known_names[ name ] = null;

			console.log( `Welcome @${name}` );

			! this.muted.hasOwnProperty( name ) && this.write( `Welcome @${name}`, '-system' );

		};

	    api.client.disconnected = ( ws, name ) => this.write( `@${name} disconnected`, '-system' );
	    api.client.error = ( ws, message ) => this.write( message, '-error' );
		api.client.success = ( ws, message ) => this.write( message, '-success' );
		api.client.say = ( ws, message, author ) => this.write( message, author );


		this.dom = {};
		this.dom.chat = E( 'div', 'ws-chat ws-chat-font' );
		this.dom.history = E( 'div', 'ws-chat-history', null, this.dom.chat );
		this.dom.bar = E( 'div', 'ws-chat-bar', null, this.dom.chat );
		this.dom.name = E( 'span', 'ws-chat-name', 'name', this.dom.bar );
		this.dom.namedivider = E( 'span', 'ws-chat-divider', '', this.dom.bar );

		this.dom.input = E( 'input', 'ws-chat-input', null, this.dom.bar );
		this.dom.input.setAttribute( 'type', 'text' );
		this.dom.input.addEventListener( 'focus', () => this.focus() );
		this.dom.input.addEventListener( 'keydown', e => e.key === 'Tab' && e.preventDefault() );

		this.dom.input.addEventListener( 'keyup', e => {

			var key = e.key;

			if ( key === 'ArrowUp' || key === 'ArrowDown' ) {

				// Up / Down input history
				this.history_index += key === 'ArrowUp' ? - 1 : 1;
				this.history_index = Math.max( 0, Math.min( this.history.length, this.history_index ) );
				this.dom.input.value = this.history[ this.history_index ] ?? '';
				return;

			}

			var message = this.dom.input.value;

			// Auto-complete a @name
			if ( key === 'Tab' && this.re.at_name_end.test( message ) )
				return this.autocomplete( this.re.at_name_end.exec( message )[ 1 ], this.known_names );

			// Auto-complete a /command
			if ( key === 'Tab' && message.startsWith( '/' ) )
				return this.autocomplete( message.substring( 1 ), this.commands, matches => {

					if ( matches.length !== 1 ) return;
					var cmd = this.commands[ matches[ 0 ] ];
					var args = cmd.args.name.length ? ` &lt;${cmd.args.name.join( '&gt; &lt;' )}&gt;` : '';
					this.write( `/${matches[ 0 ]}${args} - ${cmd.help}`, '-system' );

				} );

			// All other keys (except for Enter) have no special trigger
			if ( key !== 'Enter' ) return;

			// Enter key up - figure out what the message is (i.e. a normal say, or a command, etc...)

			// Cleanse XML/HTML markup from message
			message = message.replace( /(<([^>]+)>)/ig, '' ).trim();

			this.history.push( message );
			while ( this.history.length > 30 ) this.history.shift();
		    localStorage.setItem( 'input_history', JSON.stringify( this.history ) );

			this.history_index = this.history.length;
			this.dom.input.value = '';

			if ( message === '' ) return;

			if ( ! message.startsWith( '/' ) ) {

				if ( message === 'help' ) this.write( 'You are saying "help" to other players. Did you mean "/help" for a list of commands?', '-system' );
				return api.send( this.ws, 'say', message );

			}

			for ( var command in this.commands ) {

				var cmd = this.commands[ command ];
				if ( ! cmd.re_cmd.test( message ) ) continue;
				if ( cmd.re_args.test( message ) ) return cmd.exec( cmd.re_args.exec( message ) );
				return this.write( `usage: /${command} &lt;${cmd.args.name.join( '&gt; &lt;' )}&gt;`, '-system' );

			}

			this.write( `Command '${message}' not found`, '-system' );

		} );

		instances.push( this );

		this.blur();
		this.reconnect();

		this.reconnectInterval = setInterval( () => {

			if ( ! self.ws ) {

				console.log( 'WebSocket closed, attempting reconnection...' );
				self.reconnect();

			}

		}, 1000 );

		window.addEventListener( 'beforeunload', () => clearInterval( this.reconnectInterval ) );

		if ( dom ) dom.append( this.dom.chat );

	}


	reconnect() {

		this.ws = new WebSocket( this.url );
		this.ws.binaryType = 'arraybuffer';
		this.ws.onopen = () => {};

		this.ws.onmessage = message => api.receive( this.ws, message, api.client );
		this.ws.onclose = () => this.ws = null;
		this.ws.onerror = e => console.log( e ) || ( this.ws = null );

	}


	disconnect() {

		if ( this.ws ) this.ws.close();

	}


	/**
	 * Focus chat input.
	 */
	focus() {

		this.dom.chat.style.background = 'rgba(0,0,0,0.5)';
		this.dom.history.style.color = '#fff';
		this.dom.input.setAttribute( 'placeholder', '...' );
		this.dom.input.focus();

	}


	/**
	 * Blur or unfocus from chat input.
	 */
	blur() {

		this.dom.history.style.color = '#333';
		this.dom.chat.style.background = null;
		this.dom.input.removeAttribute( 'placeholder' );

	}


	/**
	 * Writes a message to chat history.
	 * @param {(string|Element)} message - The message
	 * @param {string} author - The author of the message
	 */
	write( message, author ) {

		if ( author && this.muted.hasOwnProperty( author ) ) return;

		var time = timestamp();

		if ( ! this.lastwrite || this.lastwrite != time ) E( 'div', 'ws-chat-timestamp', time, this.dom.history );

		var div = E( 'div', 'ws-chat-message', '', this.dom.history );

		if ( author && ! author.startsWith( '-' ) ) {

			this.known_names[ author ] = null;
			div.innerHTML = `${markup( 'name', author )}: `;

		}

		if ( message instanceof Element ) {

			div.append( message );

		} else {

			if ( author && author.startsWith( '-' ) ) message = `<span class="ws-chat${author}-message">${message}</span>`;

			var names = message.match( this.re.at_name );
			if ( names ) names.forEach( name => this.known_names[ name.substring( 1 ) ] = null );
			div.innerHTML += message.replaceAll( this.re.at_name, markup( 'name', '$1' ) );

		}

		this.dom.history.scrollTo( 0, this.dom.history.scrollHeight );
		this.lastwrite = time;

	}



	mute( name ) {

		if ( name.startsWith( '@' ) ) name = name.substring( 1 );

		if ( ! this.known_names.hasOwnProperty( name ) ) return this.write( `Name '${name}' is not recognised`, '-system' );
		this.write( `@${name} muted`, '-system' );
		this.muted[ name ] = timestamp();
		localStorage.setItem( 'muted', JSON.stringify( this.muted ) );

	}

	unmute( name ) {

		if ( name.startsWith( '@' ) ) name = name.substring( 1 );

		if ( this.muted.hasOwnProperty( name ) ) {

			delete this.muted[ name ];
			localStorage.setItem( 'muted', JSON.stringify( this.muted ) );
			return this.write( `@${name} unmuted`, '-system' );

		}

		if ( ! this.known_names.hasOwnProperty( name ) ) return this.write( `Name '${name}' is not recognised`, '-system' );
		this.write( `@${name} is not muted`, '-system' );

	}

	mutes() {

		var names = Object.keys( this.muted );

		if ( ! names.length ) return this.write( 'No one is muted', '-system' );
		this.write( 'List of mutes:', '-system' );
		names.forEach( name => this.write( `${this.muted[ name ]} @${name}`, '-system' ) );

	}

	autocomplete( typed, map, callback ) {

		var matches = [];
		var re_spaceterminate = new RegExp( `^${typed.replace( ' ', '$' )}` );

		for ( var key in map ) re_spaceterminate.test( key ) && matches.push( key );

		if ( ! matches.length ) return;

		var shortest = matches.reduce( ( a, b ) => a.length <= b.length ? a : b );
		var i = typed.length - 1;
		var c = shortest[ i ];

		while ( i < shortest.length && matches.every( cmd => cmd[ i ] === c ) ) c = shortest[ ++ i ];

		var expand = `${shortest.substring( 0, i )}`;

		expand === typed ? this.write( matches.join( ' &nbsp; ' ) ) : this.dom.input.value += expand.substring( typed.length );

		callback && callback( matches );

	}

	setCommand( command, cmd ) {

		this.commands[ command ] = cmd;

		cmd.re_cmd = new RegExp( `^\/${command}\\b` );
		cmd.re_args = new RegExp( cmd.args.re.length ? `\/${command}\\b (${cmd.args.re.join( ')\\s(' )})` : `^\/${command}\\b` );

		if ( ! cmd.hasOwnProperty( 'exec' ) ) cmd.exec = ( ...args ) => {

			args = Array.from( ...args );
			args[ 0 ] = command;
			api.send( this.ws, ...args );

		};

	}


}



window.CHAT = {

	mouseOverMention: e => {

		var name = e.innerText;

		var hover = E( 'div', 'ws-chat-mention-hover ws-chat-font', null, document.body );
		hover.style.left = `calc(${mouse.x}px - 1em)`;
		hover.style.top = `calc(${mouse.y}px - 1em)`;

		E( 'div', 'ws-chat-mention', name, hover );

		mention_hovers.push( hover );

	}

};


function timestamp( date = new Date() ) {

	return `0${date.getHours()}`.slice( - 2 ) + ':' + `0${date.getMinutes()}`.slice( - 2 );

}


function E( tagName, className, content, parent ) {

	var div = document.createElement( tagName );
	if ( className ) div.className = className;
	if ( content != undefined ) content instanceof Element ? div.append( content ) : div.textContent = content;
	parent && parent.append( div );
	return div;

}


function mousetrack( e ) {

	var x = mouse.x = e.clientX;
	var y = mouse.y = e.clientY;

	instances.forEach( chat => {

		// blur if input is not longer the active and mouse is outside input area
		if ( document.activeElement === chat.dom.input ) return;
		var bcr = chat.dom.input.getBoundingClientRect();
		( x < bcr.left || x > bcr.right || y < bcr.top || y > bcr.bottom ) && chat.blur();

	} );

	mention_hovers.forEach( hover => {

		var bcr = hover.getBoundingClientRect();
		( x < bcr.left || x > bcr.right || y < bcr.top || y > bcr.bottom ) && hover.remove();


	} );

}


function markup( type, ...args ) {

	switch ( type ) {

		case 'name':
			return `<span onmouseover="CHAT.mouseOverMention(this)" class="ws-chat-mention">${args[ 0 ]}</span>`;
		default:
			console.log( `Warning: Unregonised markup type '${type}'` );

	}

}


const instances = [];
const mention_hovers = [];
const mouse = { x: 0, y: 0 };


document.body.addEventListener( 'mousemove', mousetrack );
document.body.addEventListener( 'click', mousetrack );


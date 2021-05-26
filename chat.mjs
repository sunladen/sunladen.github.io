import encoding from './encoding.mjs';


export default class Chat {

	constructor( url ) {

		var self = this;

		this.id = localStorage.getItem( 'id' );
		this.session_id = localStorage.getItem( 'session_id' );
		this.url = this.session_id ? `${url}?session=${this.session_id}` : url;
		this.dom = E( 'div', 'ws-chat ws-chat-font' );
		this.dom_history = E( 'div', 'ws-chat-history', null, this.dom );

		this.dom_bar = E( 'div', 'ws-chat-bar', null, this.dom );
		this.dom_name = E( 'span', 'ws-chat-name', 'name', this.dom_bar );
		this.input = E( 'input', 'ws-chat-input', null, this.dom_bar );
		this.input.setAttribute( 'type', 'text' );

		this.re_at_name = new RegExp( '@([\\w-]+)', 'g' );
		this.re_ends_at_name = new RegExp( '@([\\w-]+)$' );

		this.known_names = {};
		this.muted = JSON.parse( localStorage.getItem( 'muted' ) || '{}' );
		this.history = [];
		this.history_index = 0;
		this.commands = {};


		this.setCommand( 'help', {
			help: 'List available commands',
			args: { name: [], re: [] },
			exec: () => {

				for ( var command in this.commands ) {

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


		this.input.addEventListener( 'focus', () => this.focus() );

		this.input.addEventListener( 'keydown', event => event.key === 'Tab' && event.preventDefault() );

		this.input.addEventListener( 'keyup', event => {

			var key = event.key;

			if ( key === 'ArrowUp' || key === 'ArrowDown' ) {

				// Up / Down input history
				this.history_index + key === 'ArrowUp' ? - 1 : 1;
				this.history_index = Math.max( 0, Math.min( this.history.length, this.history_index ) );
				this.input.value = this.history[ this.history_index ] ?? '';
				return;

			}

			var message = this.input.value;

			// Auto-complete a @name
			if ( key === 'Tab' && this.re_ends_at_name.test( message ) )
				return this.autocomplete( this.re_ends_at_name.exec( message )[ 1 ], this.known_names );

			// Auto-complete a /command
			if ( key === 'Tab' && message.startsWith( '/' ) && message.length > 1 )
				return this.autocomplete( message.substring( 1 ), this.commands, matches => {

					if ( matches.length !== 1 ) return;
					var cmd = this.commands[ matches[ 0 ] ];
					var args = cmd.args.name.length ? ` &lt;${cmd.args.name.join( '&gt; &lt;' )}&gt;` : '';
					this.write( `/${matches[ 0 ]}${args} - ${cmd.help}` );

				} );

			// All other keys (except for Enter) have no special trigger
			if ( key !== 'Enter' ) return;

			// Enter key up - figure out what the message is (i.e. a normal say, or a command, etc...)

			// Cleanse XML/HTML markup from message
			message = message.replace( /(<([^>]+)>)/ig, '' ).trim();

			this.history.push( message );
			this.history_index = this.history.length;
			this.input.value = '';

			if ( message === '' ) return;

			if ( ! message.startsWith( '/' ) )
				return this.say( message );

			for ( var command in this.commands ) {

				var cmd = this.commands[ command ];
				if ( ! cmd.re_cmd.test( message ) ) continue;
				if ( cmd.re_args.test( message ) ) return cmd.exec( cmd.re_args.exec( message ) );
				this.write( `usage: /${command} &lt;${cmd.args.name.join( '&gt; &lt;' )}&gt;` );

			}

			this.write( `Command '${message}' not found` );

		} );


		this.reconnect();

		this.reconnectInterval = setInterval( () => {

			if ( ! self.ws ) {

				console.log( 'WebSocket closed, attempting reconnection...' );
				self.reconnect();

			}

		}, 1000 );

		window.addEventListener( 'beforeunload', () => clearInterval( this.reconnectInterval ) );

		instances.push( this );

		this.blur();

	}


	reconnect() {

		this.ws = new WebSocket( this.url );
		this.ws.binaryType = 'arraybuffer';
		this.ws.onopen = () => {};

		this.ws.onmessage = event => {

			var message = encoding.decode( event.data );
			var response = message.shift();
			typeof this[ response ] === 'function' && this[ response ]( ...message );

		};

		this.ws.onclose = () => this.ws = null;
		this.ws.onerror = event => console.log( event ) || ( this.ws = null );

	}


	connected( id, session_id ) {

		this.session_id = session_id;
		localStorage.setItem( 'session_id', this.session_id );
		this.dom_name.textContent = this.id || id;
		this.known_names[ this.id || id ] = null;
		this.send( [ 'ident', this.id || id ] );

	}


	disconnect() {

		if ( this.ws ) this.ws.close();

	}


	disconnected( id ) {

		this.write( `@${id} disconnected` );

	}


	ident( id, message ) {

		this.id = id;
		localStorage.setItem( 'id', id );
		this.dom_name.textContent = id;
		this.known_names[ id ] = null;
		message && this.write( message );

	}


	welcome( id ) {

		this.known_names[ id ] = null;

		! this.muted.hasOwnProperty( id ) && this.write( `Welcome @${id}` );

	}


	setCommands( commands ) {

		for ( var command in commands ) this.setCommand( command, commands[ command ] );

	}


	loggedin( name ) {

		this.id = name;
		localStorage.setItem( 'id', this.id );
		this.write( `Welcome @${name}` );

	}


	focus() {

		this.dom.style.background = 'rgba(0,0,0,0.5)';
		this.dom_history.style.color = '#fff';
		this.input.setAttribute( 'placeholder', '...' );
		this.input.focus();

	}


	blur() {

		this.dom_history.style.color = '#333';
		this.dom.style.background = null;
		this.input.removeAttribute( 'placeholder' );

	}


	write( message, origin ) {

		if ( origin && this.muted.hasOwnProperty( origin ) ) return;

		var time = timestamp();

		if ( ! this.lastwrite || this.lastwrite != time ) E( 'div', 'ws-chat-timestamp', time, this.dom_history );

		var div = E( 'div', 'ws-chat-message', '', this.dom_history );

		if ( origin ) {

			this.known_names[ origin ] = null;
			div.innerHTML = markup( 'name', origin );

		}

		if ( message instanceof Element ) {

			div.append( message );

		} else {

			var names = message.match( this.re_at_name );
			if ( names ) names.forEach( name => this.known_names[ name.substring( 1 ) ] = null );
			div.innerHTML += message.replaceAll( this.re_at_name, markup( 'name', '$1' ) );

		}

		this.dom_history.scrollTo( 0, this.dom_history.scrollHeight );
		this.lastwrite = time;

	}


	error( error ) {

		this.write( error );

	}


	success( message ) {

		this.write( message );

	}


	send( message ) {

		this.ws && this.ws.send( encoding.encode( message ) );

	}


	say( message, origin ) {

		origin ? this.write( message, origin ) : this.send( [ 'say', message ] );

	}


	mute( name ) {

		if ( name.startsWith( '@' ) ) name = name.substring( 1 );

		if ( ! this.known_names.hasOwnProperty( name ) ) return this.write( `Name '${name}' is not recognised` );
		this.write( `@${name} muted` );
		this.muted[ name ] = timestamp();
		localStorage.setItem( 'muted', JSON.stringify( this.muted ) );

	}

	unmute( name ) {

		if ( name.startsWith( '@' ) ) name = name.substring( 1 );

		if ( this.muted.hasOwnProperty( name ) ) {

			delete this.muted[ name ];
			localStorage.setItem( 'muted', JSON.stringify( this.muted ) );
			return this.write( `@${name} unmuted` );

		}

		if ( ! this.known_names.hasOwnProperty( name ) ) return this.write( `Name '${name}' is not recognised` );
		this.write( `@${name} is not muted` );

	}

	mutes() {

		var names = Object.keys( this.muted );

		if ( ! names.length ) return this.write( 'No one is muted' );
		this.write( 'List of mutes:' );
		names.forEach( name => this.write( `${this.muted[ name ]} @${name}` ) );

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

		expand === typed ? this.write( matches.join( ' &nbsp; ' ) ) : this.input.value += expand.substring( typed.length );

		callback && callback( matches );

	}

	setCommand( command, cmd ) {

		this.commands[ command ] = cmd;

		cmd.re_cmd = new RegExp( `^\/${command}\\b` );
		cmd.re_args = new RegExp( cmd.args.re.length ? `\/${command}\\b (${cmd.args.re.join( ')\\s(' )})` : `^\/${command}\\b` );

		if ( ! cmd.hasOwnProperty( 'exec' ) ) cmd.exec = ( ...args ) => {

			args = Array.from( ...args );
			args[ 0 ] = command;
			this.send( args );

		};

	}


}



window.CHAT = {

	mouseOverMention: e => {

		var name = e.innerText;

		var hover = E( 'div', 'ws-chat-mention-hover ws-chat-font', null, document.body );
		hover.style.left = `calc(${mouse.x}px - 1em)`;
		hover.style.top = `calc(${mouse.y}px - 1em)`;
		hover.addEventListener( 'mouseleave', () => hover.remove() );

		E( 'div', 'ws-chat-mention', name, hover );



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


function mousetrack( event ) {

	var x = mouse.x = event.clientX;
	var y = mouse.y = event.clientY;

	instances.forEach( chat => {

		// blur if input is not longer the active and mouse is outside input area
		if ( document.activeElement === chat.input ) return;
		var bcr = chat.input.getBoundingClientRect();
		( x < bcr.left || x > bcr.right || y < bcr.top || y > bcr.bottom ) && chat.blur();

	} );

}


function markup( type, ...args ) {

	switch ( type ) {

		case 'name':
			return `<span onmouseover="CHAT.mouseOverMention(this)" class="ws-chat-mention">${args[ 0 ]}</span>: `;
		default:
			console.log( `Warning: Unregonised markup type '${type}'` );

	}

}


const instances = [];
const mouse = { x: 0, y: 0 };


document.body.addEventListener( 'mousemove', mousetrack );
document.body.addEventListener( 'click', mousetrack );


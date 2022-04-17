import Client from './client.js';


export default class TextBattleLoot extends Client {

	constructor( container ) {

		super( location.port ? 'ws://localhost:6500' : 'wss://bead-rural-poison.glitch.me/' );

		this.container = container;
		this.container.innerHTML += `
		<div class="tbl-flex">
			<div class="tbl-grow">
				<div class="tbl-outer"></div>
				<div class="tbl-focus"></div>
				<div class="tbl-view"></div>
			</div>
		</div>
		<div class="tbl-offscreen"></div>
		`;

		let marginTop = getComputedStyle( this.container ).getPropertyValue( 'margin-top' );
		this.container.style.height = `calc(100% - ${2 * parseInt( marginTop )}px)`;

		if ( this.container === document.body ) document.documentElement.style.height = '100%';

		this.outerDomElement = this.container.querySelector( '.tbl-outer' );
		this.focusDomElement = this.container.querySelector( '.tbl-focus' );
		this.viewDomElement = this.container.querySelector( '.tbl-view' );
		this.offscreen = this.container.querySelector( '.tbl-offscreen' );

		this.contents = {};

		instances.push( this );

	}

	receive( message ) {

		if ( message.type === 'identity' ) {

		} else if ( message.type === 'contents' ) {

			this.contents = message.value;
			recursiveParentRefs( this.contents );
			//let contentDiv = updateCreateContentDivs( id, contents, this.offscreen );

			//this.outerDomElement.append( contentDiv );

		} else {

			console.log( `received an unhandled message.type="${message.type}"` );

		}

	}

}


if ( ! document.getElementById( 'tbl-style' ) ) {

	document.head.innerHTML += `<style id="tbl-style">
.tbl-flex { display: flex; box-sizing: border-box; height: 100%; }
.tbl-grow { display: flex; flex-grow: 1; border: 5px solid red; }
.tbl-outer { flex-grow: 1; border-radius: 5px; margin: 6px 3px 6px 6px; background: #555555; }
.tbl-focus { flex-grow: 1; border-radius: 5px; margin: 6px 3px 6px 3px; background: #333333; }
.tbl-view { flex-grow: 1; border-radius: 5px; margin: 6px 6px 6px 6px; background: #555555; }
.tbl-outer .tbl-focusplate { display: none }
.tbl-offscreen { display: none }
	</style>
	`;

}


const instances = [];


function update() {

	setTimeout( update, 1000 );

	for ( let instance of instances ) {


	}

}


setTimeout( update, 0 );



function E( tagName, id, className, contents ) {

	let element = document.createElement( tagName );
	if ( id ) element.id = id;
	if ( className ) element.className = className;
	if ( contents != undefined ) {

		if ( contents.constructor !== Array ) contents = [ contents ];

		for ( var i = 0; i < contents.length; i ++ ) {

			let content = contents[ i ];
			if ( content == undefined ) continue;
			content = ( content instanceof Element ) ? content : document.createTextNode( content );
			element.appendChild( content );

		}

	}

	return element;

}


function query( xpath, context ) {

	return document.evaluate( xpath, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

}


function recursiveParentRefs( item, parent ) {

	if ( parent ) item.parent = parent;

	for ( let key in item.contents ) recursiveParentRefs( item.contents[ key ], item );

}

function updateCreateContentDivs( id, content, offscreen ) {

	let elementId = `${id}-dom`;
	let contentDiv = document.getElementById( elementId );

	if ( ! contentDiv ) {

		console.log( 'existing contentDiv not found' );

		contentDiv = E( 'div', elementId, null, [
			E( 'div', `${id}-outerplate`, 'tbl-outerplate', `outerplate: ${content.name}` ),
			E( 'div', `${id}-focusplate`, 'tbl-focusplate', `focusplate: ${content.name}` )
		] );

		offscreen.append( contentDiv );

	}

	//query( `.//div[@id="${id}-outerplate"]`, contentDiv ).textContent = `outerplate: ${content.name}`;
	//query( `//div[@id="${id}-focusplate"]`, contentDiv ).textContent = `focusplate: ${content.name}`;

	//return contentDiv;

}

/* eslint-disable multiline-comment-style */
// ==UserScript==
// @name         Monarchy PBBG Bot
// @description  Monarchy PBBG Bot
// @namespace    https://monarchygame.net/
// @version      0.1
// @match        https://monarchygame.net/*
// @icon         https://monarchygame.net/favicon.ico
// @grant        none
// //require      file://\\wsl$\Ubuntu\home\sunladen\sunladen.github.io\morgue\docs\userscripts\monarchy.user.js
// ==/UserScript==
( function () {

	'use strict';

	window.defaultbot = {
		sleep: 0,
		enabled: true,
		interval: 50,
	};

	const bot = window.bot = Object.assign( {}, window.defaultbot );
	Object.assign( bot, JSON.parse( localStorage.getItem( 'bot' ) ) );
	window.addEventListener( 'beforeunload', () => localStorage.setItem( 'bot', JSON.stringify( window.bot ) ) );

	document.addEventListener( 'mousemove', () => bot.sleep = Date.now() + 20000 );

	const xpath = {
		string: ( xpath, context ) => document.evaluate( xpath, context || document, null, XPathResult.STRING_TYPE, null ).stringValue.trim(),
		integer: ( xpath, context ) => parseInt( document.evaluate( xpath, context || document, null, XPathResult.STRING_TYPE, null ).stringValue.replace( ',', '' ).trim() ),
		node: ( xpath, context ) => document.evaluate( xpath, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue,
		snapshot: ( xpath, context ) => document.evaluate( xpath, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
	};

	function click( context, milliseconds ) {

		context.click();
		console.log( 'bot clicked', context );
		sleep( milliseconds );

	}

	function sleep( milliseconds ) {

		if ( ! milliseconds ) milliseconds = 2000 + Math.random() * 3000;
		bot.sleep = Date.now() + milliseconds;

	}

	function isHidden( element ) {

		return window.getComputedStyle( element ).display === 'none';

	}

	function autoMine() {

		if ( ! window.location.pathname.startsWith( '/game/mining' ) ) return window.location.assign( '/game/mining' );

		const mineBtn = xpath.node( '//button[text()="Mine"]' );
		click( mineBtn );

	}

	function main() {

		const sleep = bot.sleep - Date.now();

		if ( ! bot.enabled || sleep > 0 ) return;

		autoMine();

	}

	// page load starts with a random sleep length
	bot.sleep = Date.now() + ( bot.interval + Math.floor( ( Math.random() - .5 ) * .5 * bot.interval ) ) * 1000;

	console.log( `sleeping ${(bot.sleep - Date.now())/1000} seconds` );

	// 1 second heartbeat that doesn't get put to sleep when in background/inactive
	const heartbeat = new Worker( URL.createObjectURL( new Blob( [ 'onmessage=e=>setInterval(i=>postMessage(0),1000)' ] ) ) );
	heartbeat.onmessage = m => main();
	heartbeat.postMessage( 0 );

} )();

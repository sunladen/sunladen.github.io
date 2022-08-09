/* eslint-disable multiline-comment-style */
// ==UserScript==
// @name         Truce PBBG
// @description  Truce PBBG automation helper
// @namespace    https://truce.gg/
// @version      0.1
// @match        https://truce.gg/*
// @icon         https://truce.gg/favicon.ico
// @grant        none
// //require      file://\\wsl$\Ubuntu\home\sunladen\sunladen.github.io\morgue\docs\userscripts\truce.user.js
// ==/UserScript==
( function () {

	'use strict';

	window.defaulttrucebot = {
		sleep: 0,
		enabled: true,
		interval: {
			min: 10000,
			max: 20000
		},
		auto: {
			spell: 'Energizer II',
			arena: {
				chance: 0.5,
				distance: 3
			},
			dungeon: {
				energy: - 10,
				whitelist: []
			}
		},
		userstats: {
			rank: 1,
			energy: {
				current: 0,
				max: 0
			},
			activeSpell: ''
		}
	};


	const trucebot = window.trucebot = Object.assign( {}, window.defaulttrucebot );
	Object.assign( trucebot, JSON.parse( localStorage.getItem( 'trucebot' ) ) );
	window.addEventListener( 'beforeunload', () => localStorage.setItem( 'trucebot', JSON.stringify( window.trucebot ) ) );

	document.addEventListener( 'mousemove', () => trucebot.sleep = Date.now() + 20000 );

	const xpath = {
		string: ( xpath, context ) => {

			return document.evaluate( xpath, context || document, null, XPathResult.STRING_TYPE, null ).stringValue.trim();

		},
		integer: ( xpath, context ) => {

			return parseInt( document.evaluate( xpath, context || document, null, XPathResult.STRING_TYPE, null ).stringValue.replace( ',', '' ).trim() );

		},
		node: ( xpath, context ) => {

			return document.evaluate( xpath, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

		},
		snapshot: ( xpath, context ) => {

			return document.evaluate( xpath, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		}
	};

	function click( context, milliseconds ) {

		context.click();
		sleep( milliseconds );

	}

	function sleep( milliseconds ) {

		if ( ! milliseconds ) milliseconds = 2000 + Math.random() * 3000;
		trucebot.sleep = Date.now() + milliseconds;

	}

	function isHidden( element ) {

		var style = window.getComputedStyle( element );
		return style.display === 'none';

	}

	function autoSpell() {

		console.log( 'trucebot: autoSpell' );
		const quickSpells = xpath.node( '//div[@id="quickSpells"]' );
		if ( ! isHidden( quickSpells ) ) {

			const yesBtn = xpath.node( '//button[text()="Yes"]' );
			if ( yesBtn ) return click( yesBtn );
			const snapshot = xpath.snapshot( './/ul/li/a', quickSpells );
			for ( let i = 0; i < snapshot.snapshotLength; i ++ ) {

				const item = snapshot.snapshotItem( i );
				if ( xpath.string( './/div[contains(@class, "media-title")]', item ) === trucebot.auto.spell ) return click( item );

			}

			return;

		}

		const spellsToggle = xpath.node( '//a[@id="quickToggle"]' );
		if ( spellsToggle ) click( spellsToggle );

	}

	function autoArena() {

		console.log( 'trucebot: autoArena' );
		if ( window.location.pathname.startsWith( '/profile/' ) ) {

			const yesBtn = xpath.node( '//button[text()="Yes"]' );
			if ( yesBtn ) return click( yesBtn );
			const attackBtn = xpath.node( './/button[@id="attack"]' );
			if ( attackBtn ) return click( attackBtn );
			return;

		}

		if ( window.location.pathname !== '/arena' ) {

		    return click( xpath.node( '//a[@href="arena"]' ) );

		}

		const rankingTbl = xpath.node( '//table[@id="ranking_tbl"]' );
		if ( ! rankingTbl ) return;
		const snapshot = xpath.snapshot( './/tr[td and not(contains(@class, "currentUser"))]', rankingTbl );
		const candidates = [];
		for ( let i = 0; i < snapshot.snapshotLength; i ++ ) {

			const item = snapshot.snapshotItem( i );
			const rank = xpath.integer( './/td[1]', item );
			if ( Math.abs( rank - trucebot.userstats.rank ) <= trucebot.auto.arena.distance ) {

				candidates.push( xpath.node( './/a[starts-with(@href, "profile/")]', item ) );

			}

		}

		click( candidates[ Math.floor( Math.random() * candidates.length ) ] );

	}

	function exploreDungeon() {

		console.log( 'trucebot: exploreDungeon' );
		if ( window.location.pathname !== '/dungeons' ) {

		    return click( xpath.node( '//a[@href="dungeons"]' ) );

		}

		const yesBtn = xpath.node( '//button[text()="Yes"]' );
		if ( yesBtn ) return click( yesBtn );
		const okBtn = xpath.node( '//button[text()="OK"]' );
		if ( okBtn ) return click( okBtn );
		const dungeonsGuide = xpath.node( '//div[@data-name="dungeons-guide"]' );
		if ( ! dungeonsGuide ) return;
		const snapshot = xpath.snapshot( './/a[contains(@class, "media") and .//span[@data-tippy-content="Required Level"]/i[contains(@class, "text-success")]]', dungeonsGuide );
		const candidates = [];
		const resources = [];

		for ( let i = 0; i < snapshot.snapshotLength; i ++ ) {

			const item = snapshot.snapshotItem( i );
			const resource = xpath.string( './/img[@data-tippy-content]/@data-tippy-content', item );
			if ( ! trucebot.auto.dungeon.whitelist.length || trucebot.auto.dungeon.whitelist.indexOf( resource ) > - 1 ) {

				const enterBtn = xpath.node( './/following-sibling::div//button', item );
				candidates.push( enterBtn );
				resources.push( resource );

			}

		}

		const pick = Math.floor( Math.random() * candidates.length );
		speechSynthesis.speak( new SpeechSynthesisUtterance( `${resources[ pick ]} dungeon` ) );
		click( candidates[ pick ] );

	}

	function main() {

		if ( ! trucebot.enabled || document.title === 'Truce' || [ '/guide' ].indexOf( window.location.pathname ) > - 1 ) return;

		const userStats = xpath.node( '//div[@id="user-stats"]' );
		const userStatsEnergy = xpath.string( './/li[@data-tippy-content="Energy"]', userStats ).split( '/' );

		trucebot.userstats = {
			rank: xpath.integer( './/li[@data-tippy-content="Rank"]', userStats ),
		    energy: {
				current: parseInt( userStatsEnergy[ 0 ] ),
				max: parseInt( userStatsEnergy[ 1 ] )
			},
			activeSpell: xpath.string( './/li[contains(@class, "ml-auto")]/i[contains(@class, "fa-book-sparkles")]/@data-tippy-content' )
		};

		let countdown = xpath.string( '//span[contains(@class, "countdown-amount")]' ).split( ':' );
		let seconds = parseInt( countdown[ 0 ] ) * 60 + parseInt( countdown[ 1 ] );

		const sleep = trucebot.sleep - Date.now();

	    document.title = `Truce | ${trucebot.userstats.energy.current}/${trucebot.userstats.energy.max} | ${seconds} | ${Math.round( sleep / 1000 )}`;

		if ( sleep > 0 ) return;

		if ( trucebot.userstats.activeSpell === '' && trucebot.auto.spell !== '' )
			autoSpell();
		//if ( trucebot.userstats.energy.current === trucebot.userstats.energy.max )
		//	autoArena();
		if ( trucebot.userstats.energy.current >= trucebot.userstats.energy.max + trucebot.auto.dungeon.energy )
			exploreDungeon();

	}

	// page load starts with a random sleep length
	trucebot.sleep = Date.now() + 20000 + Math.floor( Math.random() * 15000 );

	// 1 second heartbeat that doesn't get put to sleep when in background/inactive
	const heartbeat = new Worker( URL.createObjectURL( new Blob( [ 'onmessage=e=>setInterval(i=>postMessage(0),1000)' ] ) ) );
	heartbeat.onmessage = m => main();
	heartbeat.postMessage( 0 );

	let seconds = parseInt( xpath.string( '//span[contains(@class, "updateCounter")]/@data-seconds' ) );
	speechSynthesis.speak( new SpeechSynthesisUtterance( `${Math.round( seconds / 60 )} minutes till update` ) );

	setTimeout( () => {

		speechSynthesis.speak( new SpeechSynthesisUtterance( `${trucebot.userstats.energy.current} energy` ) );

		if ( trucebot.userstats.activeSpell === '' ) speechSynthesis.speak( new SpeechSynthesisUtterance( 'no active spell' ) );

	}, 3000 );

	// random page navigation after countdown timer expires
	const reloadLocations = [ '/', '/crafting', '/inventory', '/upgrades', '/bank', '/stats', '/arena', '/guild', '/bosses', '/store', '/notis' ];
	const reload = new Worker( URL.createObjectURL( new Blob( [ `onmessage=e=>setTimeout(i=>postMessage(0),(15 * 60) * 1000)` ] ) ) );
	reload.onmessage = m => window.location.assign( reloadLocations[ Math.floor( Math.random() * reloadLocations.length ) ] );
	reload.postMessage( 0 );

} )();

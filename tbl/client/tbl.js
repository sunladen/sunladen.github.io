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

    }


    connected( id ) {

        console.log( `client ${id} connected` );

    }


    disconncted( id ) {

        console.log( `client ${id} disconnected` );

    }

}







// Set styles
document.head.innerHTML += `<style>
.tbl-flex  { display: flex; box-sizing: border-box; height: 100%; }
.tbl-grow  { display: flex; flex-grow: 1; border: 5px solid red; }
.tbl-outer { flex-grow: 1; border-radius: 5px; margin: 6px 3px 6px 6px; background: #555555; }
.tbl-focus { flex-grow: 1; border-radius: 5px; margin: 6px 3px 6px 3px; background: #333333; }
.tbl-view  { flex-grow: 1; border-radius: 5px; margin: 6px 6px 6px 6px; background: #555555; }
.tbl-outer .tbl-focusplate { display: none }
.tbl-offscreen { display: none }
</style>
`;


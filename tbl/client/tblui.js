
export default class TextBattleLootUI {

    constructor( container = document.body ) {

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

        this.container.style.height = `calc(100% - ${2 * parseInt( getComputedStyle( this.container ).getPropertyValue( 'margin-top' ) )}px)`;

        // make html element take up full height of view if body is the container
        if ( this.container === document.body ) document.documentElement.style.height = '100%';

        this.outerDomElement = this.container.querySelector( '.tbl-outer' );
        this.focusDomElement = this.container.querySelector( '.tbl-focus' );
        this.viewDomElement = this.container.querySelector( '.tbl-view' );
        this.offscreen = this.container.querySelector( '.tbl-offscreen' );

    }

}


// style
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


export default class TextBattleLootUI {

	constructor( tbl, container = document.body ) {
		this.tbl = tbl;
		this.container = container;
		this.debug = true;
		this.container.innerHTML += TBL_DOM;
		this.container.style.height = `calc(100% - ${2 * parseInt( getComputedStyle( this.container ).getPropertyValue( 'margin-top' ) )}px)`;
		if ( this.container === document.body ) document.documentElement.style.height = '100%';
		this.outerDomElement = this.container.querySelector( '.tbl-outer' );
		this.focusDomElement = this.container.querySelector( '.tbl-focus' );
		this.viewDomElement = this.container.querySelector( '.tbl-view' );
		const self = this;
		this.container.addEventListener( 'keyup', event => self.keyUp( event ) );
	}

	setFocus( entity ) {
		if ( this.debug ) console.log( `setFocus( ${entity} )` );
		this.#setEntities( this.viewDomElement, entity.contents, entity.contents.length ? entity.contents[ 0 ].id : null );
		const parent = this.tbl.entitiesById[ entity.parent ];
		this.#setEntities( this.focusDomElement, parent.contents, entity.id );
		this.focusedEntity = entity;
		const grandparent = this.tbl.entitiesById[ parent.parent ];
		this.#setEntities( this.outerDomElement, grandparent ? grandparent.contents : [], parent.id );
	}

	#setEntities( uiElement, entities, selectedId ) {
		if ( this.debug ) console.log( `setEntities( ${uiElement}, ${entities}, ${selectedId} )` );
		uiElement.innerHTML = '';
		for ( const entity of entities ) this.#addEntity( uiElement, entity, selectedId === entity.id );
	}

	#addEntity( uiElement, entity, selected ) {
		if ( this.debug ) console.log( `#addEntity( ${uiElement},`, entity, selected, ')' );
		const entityDom = document.createElement( 'div' );
		entityDom.className = 'tbl-entity';
		if ( selected ) entityDom.className += ' tbl-selected';
		entityDom.id = `tbl-entity-${entity.id}`;
		entityDom.innerHTML = `
<div class="tbl-entity-name">${entity.name}</div>
<div class="tbl-entity-weight">${entity.weight}</div>
`;
		uiElement.append( entityDom );
	}

	removeEntity( entity ) {
		if ( this.debug ) console.log( 'removeEntity(', entity, ')' );
		const element = document.getElementById( `tbl-entity-${entity.id}` );
		if ( element ) element.remove();
	}

	updateEntity( entity ) {
		if ( this.debug ) console.log( 'updateEntity(', entity, ')' );
		const elementId = `tbl-entity-${entity.id}`;
		const element = document.getElementById( elementId );
		if ( element ) {
			element.querySelector( '.tbl-entity-name' ).textContent = entity.name;
			element.querySelector( '.tbl-entity-weight' ).textContent = entity.weight;
			return;
		}
		if ( this.focusedEntity.id === entity.parent ) return this.#addEntity( this.viewDomElement, entity, false );
		const focusedParent = this.tbl.entitiesById[ this.focusedEntity.parent ];
		if ( focusedParent.id === entity.parent ) return this.#addEntity( this.focusDomElement, entity, false );
		if ( focusedParent.parent === entity.parent ) return this.#addEntity( this.outerDomElement, this.tbl.entitiesById[ focusedParent.parent ], false );
	}

	keyUp( event ) {
		if ( this.debug ) console.log( 'keyUp(', event, ')' );
		if ( event.key === 'h' ) return this.tbl.focusEntity( this.focusedEntity.parent );
		if ( event.key === 'l' ) return this.tbl.focusEntity( this.focusedEntity.contents.length ? this.focusedEntity.contents[ 0 ].id : this.focusedEntity.id );
		const changeSiblingFocus = event.key === 'j' ? 1 : event.key === 'k' ? -1 : 0;
		if ( changeSiblingFocus !== 0 ) {
			const focusedParent = this.tbl.entitiesById[ this.focusedEntity.parent ];
			const index = focusedParent.contents.indexOf( this.focusedEntity ) + changeSiblingFocus;
			if ( index > -1 && index < focusedParent.contents.length ) return this.tbl.focusEntity( focusedParent.contents[ index ].id );
		}
	}

}
document.head.innerHTML += `<style>
.tbl-container * {
box-sizing: border-box;
border-radius: 5px;
font-family: "Fira Sans","Helvetica Neue",Helvetica,"Roboto",Arial,sans-serif;
cursor: default;
}
.tbl-flex   { display: flex; height: 100%; }
.tbl-grow   { display: flex; flex: 1; border: 5px solid red; }
.tbl-outer  { flex: 1; margin: 6px 3px 6px 6px; background: #555555; }
.tbl-focus  { flex: 1; 5px; margin: 6px 3px 6px 3px; background: #333333; }
.tbl-view   { flex: 1; 5px; margin: 6px 6px 6px 6px; background: #555555; }
.tbl-entity {
background: #fff;
border: 1px solid #ddd;
cursor: pointer;
}
.tbl-entity * { cursor: pointer; }
.tbl-selected { background: #f7630c; }
.tbl-entity-name { display: inline-block; }
.tbl-entity-name:after { content: " >"; color: #ddd; }
.tbl-entity-weight { display: inline-block; float: right; }
.tbl-entity-weight:before { content: "< "; color: #ddd; }
</style>
`;
const TBL_DOM = `
<div class="tbl-container tbl-flex">
<div class="tbl-grow">
<div class="tbl-outer"></div>
<div class="tbl-focus"></div>
<div class="tbl-view"></div>
</div>
</div>
`;

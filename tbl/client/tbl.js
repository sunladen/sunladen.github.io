import Client from './client.js';
import TextBattleLootUI from './tblui.js';

export default class TextBattleLoot extends Client {

    constructor( container ) {

        super( location.port ? 'ws://localhost:6500' : 'wss://bead-rural-poison.glitch.me/' );
        this.entitiesById = {};
        this.currentFocus = null;
        this.ui = new TextBattleLootUI( this, container );

    }

    connected( id ) {

        if ( this.debug ) console.log( `connected( ${id} )` );

    }

    disconnected( id ) {

        if ( this.debug ) console.log( `disconnected( ${id} )` );

        this.removeEntity( id );

    }

    removeEntity( id ) {

        if ( this.debug ) console.log( `removeEntity( ${id} )` );

        if ( ! ( id in this.entitiesById ) ) return console.log( `remove [${id}] failed; unknown entity identity` );

        const entity = this.entitiesById[ id ];

        delete this.entitiesById[ id ];

        const parent = this.entitiesById[ entity.parent ];
        const siblings = parent.contents;
        const index = siblings.indexOf( entity );

        if ( index > - 1 ) siblings.splice( index, 1 );

        if ( id === this.currentFocus ) siblings.length ? this.focusEntity( siblings[ 0 ].id ) : this.focusEntity( entity.parent );

        this.ui.removeEntity( entity );

        for ( const content in entity.contents ) this.removeEntity( content.id );

    }

    /**
     * Called on receipt of ConnectionInfo.
     * @param {json} message {..., value: {..., state: {..., world: {id: {string} <id>,..., contents: [...] } } } }
     */
    receiveConnectionInfo( message ) {

        super.receiveConnectionInfo( message );
        this.initWorldEntities( this.state.world );

        const player = this.entitiesById[ this.identity.id ];

        if ( player.parent ) this.focusEntity( this.identity.id );

    }

    initWorldEntities( entity ) {

        this.entitiesById[ entity.id ] = entity;

        for ( const content of entity.contents ) this.initWorldEntities( content );

    }

    /**
	 * Called when an Update message is received.
	 * @param {json} message {from: "server", type: "Update", value: { id: {string} <id>, delta properties...} }
	 */
    receiveUpdate( message ) {

        const id = message.value.id;
        const playerParent = this.entitiesById[ this.identity.id ].parent;

        if ( id in this.entitiesById )
            Object.assign( this.entitiesById[ id ], message.value );
        else
            this.entitiesById[ id ] = message.value;

        const entity = this.entitiesById[ id ];

        if ( ! ( 'contents' in entity ) ) entity.contents = [];

        if ( entity.parent && entity.parent in this.entitiesById ) {

            const contents = this.entitiesById[ entity.parent ].contents;

            if ( contents.indexOf( entity ) === - 1 ) contents.push( entity );

            if ( id === this.identity.id && ! playerParent ) this.focusEntity( id );

        }

        this.ui.updateEntity( entity );

    }

    focusEntity( id ) {

        if ( id === this.currentFocus ) return;

        if ( ! id in this.entitiesById ) return console.log( `focus [${id}] failed; unknown entity identity` );

        const entity = this.entitiesById[ id ];

        if ( ! entity.parent ) return console.log( `focus [${id}]"${entity.name}" failed; [${id}]"${entity.name}" is a top-level entity` );

        this.ui.setFocus( entity );
        this.currentFocus = id;

    }

}


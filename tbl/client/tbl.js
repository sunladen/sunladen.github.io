import Client from './client.js';
import TextBattleLootUI from './tblui.js';


export default class TextBattleLoot extends Client {

    constructor( container ) {

        super( location.port ? 'ws://localhost:6500' : 'wss://bead-rural-poison.glitch.me/' );

        this.entitiesById = {};
        this.ui = new TextBattleLootUI( container );

    }


    connected( id ) {

        console.log( `client ${id} connected` );

    }


    disconncted( id ) {

        console.log( `client ${id} disconnected` );

    }


    /**
     * Called on receipt of ConnectionInfo.
     * @param {json} message {..., value: {..., state: {..., world: {id: {string} <id>,..., contents: [...] } } } }
     */
    receiveConnectionInfo( message ) {

        super.receiveConnectionInfo( message );

        this.initWorldEntities( this.state.world );

        this.focusEntity( this.identity.id );

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

    }

    focusEntity( id ) {

        if ( ! id in this.entitiesById ) return console.log( `focus '${id}' failed; unknown entity` );

        const entity = this.entitiesById[ id ];

        if ( ! entity.parent in this.entitiesById ) return console.log( `focus '${id}' failed; unknown parent '${entity.parent}'` );
        const parent = this.entitiesById[ entity.parent ];

        if ( ! parent.parent ) return console.log( `cannot focus '${id}'; is a top-level entity` );

        for ( const content of parent.contents ) {

        	console.log( content );

        }

    }

}


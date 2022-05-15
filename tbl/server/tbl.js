import Server from './server.js';


let server;
let world;


const entities = [];
const playersById = {};



export default class TextBattleLootServer extends Server {

    constructor() {

        super( process.env.PORT );

        world = createWorld( this );

    }


    connected( ws, id ) {

        console.log( `client ${id} connected` );

        const entity = new PlayerCharacter( id );
        playersById[ id ] = entity;
        world.add( entity );

    }


    disconnected( id ) {

        console.log( `client ${id} disconnected` );
        const entity = playersById[ id ];
        delete playersById[ id ];
        entity.parent.remove( entity );

    }


    update() {

        for ( const entity of entities ) {

            if ( entity.dirty ) {

                entity.update();

            	console.log( entity );

            }

        }

    }

}



class Entity {

    constructor( name = '[Unnamed entity]', id ) {

        this.id = id || Server.uuid();
        this.type = this.constructor.name;
        this.name = name;
        this.parent = null;
        this.baseWeight = 0;
        this.weight = 0;
        this.contents = [];
        this.world = { id: this.id, type: this.type, contents: [] };
        this.dirty = true;

        entities.push( this );

    }

    update() {

        if ( ! this.dirty ) return;

        this.world.parent = this.parent ? this.parent.id : null;
        this.world.name = this.name;
        this.world.baseWeight = this.baseWeight;
        this.world.weight = this.weight;

        delete this.world[ 'contents' ];

    	server.send( 'Update', this.world );

        this.dirty = false;

    }

    add( entity ) {

        let index = this.contents.indexOf( entity );

        if ( index === - 1 ) {

            entity.parent = this;
        	this.contents.push( entity );
            this.changeWeight( entity.weight );

        }

        index = this.world.contents.indexOf( entity.world );
        if ( index === - 1 ) this.world.contents.push( entity );

    }

    remove( entity ) {

        const index = this.contents.indexOf( entity );

        if ( index > - 1 ) {

            entity.parent = this.parent;
            this.contents.splice( index, 1 );
            this.changeWeight( entity.weight );

        }

        index = this.world.contents.indexOf( entity.world );
        if ( index > - 1 ) this.world.contents.splice( index, 1 );

    }

    changeBaseWeight( delta ) {

        this.baseWeight += delta;
        this.weight += delta;
        this.dirty = true;

    }

    changeWeight( delta ) {

        this.weight += delta;
        this.dirty = true;

    }

}


class Location extends Entity {

    constructor( name = '[Unnamed location]' ) {

        super( name );
        this.changeBaseWeight( Number.MAX_SAFE_INTEGER );

    }

}


class PlayerCharacter extends Entity {

    constructor( id, name = '[Unnamed player]' ) {

        super( name, id );
        this.changeBaseWeight( 80 );


    }

}


function createWorld( _server ) {

    server = _server;

    const world = new Location();

    server.state.world = world.world;

    return world;

}



new TextBattleLootServer();


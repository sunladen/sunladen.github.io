import Server from './server.js';

let server;
let world;
let startercamp;

const entities = [];
const playersById = {};

export default class TextBattleLootServer extends Server {

    constructor() {

        super( process.env.PORT );

        world = createWorld( this );

    }

    connected( ws, id ) {

        console.log( `client ${id} connected` );

        const player = new PlayerCharacter( id );
        playersById[ id ] = player;
        startercamp.add( player );

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

        const delta = { id: this.id };

        const parent = this.parent == null ? null : this.parent.id;

        if ( this.world.parent !== parent )
            delta.parent = this.world.parent = parent;
        if ( this.world.name !== this.name )
        	delta.name = this.world.name = this.name;
        if ( this.world.baseWeight !== this.baseWeight )
        	delta.baseWeight = this.world.baseWeight = this.baseWeight;
        if ( this.world.weight !== this.weight )
        	delta.weight = this.world.weight = this.weight;

    	server.send( 'Update', delta );

        this.dirty = false;

    }

    add( entity ) {

        let index = this.contents.indexOf( entity );

        if ( index === - 1 ) {

            entity.parent = this;
            entity.dirty = true;
        	this.contents.push( entity );
            this.changeWeight( entity.weight );

        }

        index = this.world.contents.indexOf( entity.world );
        if ( index === - 1 ) this.world.contents.push( entity.world );

    }

    remove( entity ) {

        let index = this.contents.indexOf( entity );

        if ( index > - 1 ) {

            entity.parent = this.parent;
            this.contents.splice( index, 1 );
            this.changeWeight( - entity.weight );

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
        this.changeBaseWeight( 5000000 );

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

    const world = new Entity();
    startercamp = new Location( 'Starter camp' );
    world.add( startercamp );

    server.state.world = world.world;

    return world;

}


new TextBattleLootServer();


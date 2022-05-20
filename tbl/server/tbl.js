import Server from './server.js';

export default class TextBattleLootServer extends Server {

    constructor() {
        super(process.env.PORT, true );
        this.entityTypes = {};
        this.world = new Entity();
        this.state.world = this.world.world;
        this.entities = [];
    }

    connected( ws, id ) {
        console.log( `client ${id} connected` );
    }

    disconnected( id ) {
        console.log( `client ${id} disconnected` );
    }

    update() {
        for ( const entity of this.entities ) {
            if ( entity.dirty ) entity.update();
        }
    }

    registerEntityType( type, definition ) {
        this.entityTypes[ type ] = definition;
    }

    createEntity( parent, type, ...args ) {
        if ( ! ( type in this.entityTypes ) ) return console.log( `failed to create Entity; unknown type "${type}"` );
        const entity = this.entityTypes[ type ].create( ...args );
        this.entities.push( entity );
        parent.add( entity );
        return entity;
    }

}

class Entity {

    constructor( type, name = '[Unnamed entity]', id ) {
        this.id = id || Server.uuid();
        this.type = type;
        this.name = name;
        this.parent = null;
        this.baseWeight = 0;
        this.weight = 0;
        this.contents = [];
        this.world = { id: this.id, type: this.type, contents: [] };
        this.dirty = true;
    }

    update() {
        if ( ! this.dirty ) return;
        this.broadcastUpdates();
        this.dirty = false;
    }

    broadcastUpdates() {
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
    	tbl.send( 'Update', delta );
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

const tbl = new TextBattleLootServer();
// script/config world
tbl.registerEntityType( 'Location', {
    create: ( name = '[Unnamed location]' ) => {
        const entity = new Entity( 'Location', name );
        entity.changeBaseWeight( 5000000 );
        return entity;
    }
} );
tbl.registerEntityType( 'PlayerCharacter', {
    create: ( id, name ) => {
        if ( ! name ) name = `player-${id}`;
        const player = new Entity( 'PlayerCharacter', name, id );
        player.changeBaseWeight( 80 );
        return player;
    }
} );
tbl.registerEntityType( 'Kindling', {
    create: ( ) => {
        const kindling = new Entity( 'Kindling', 'Kindling' );
        kindling.changeBaseWeight( 1.5 );
        return kindling;
    }
} );
const startercamp = tbl.createEntity( tbl.world, 'Location', 'Starter camp' );
const playersById = {};
tbl.connected = ( ws, id ) => {
    playersById[ id ] = tbl.createEntity( startercamp, 'PlayerCharacter', id );
};
tbl.disconnected = ( id ) => {
    const player = layersById[ id ];
    delete playersById[ id ];
    player.parent.remove( entity );
};
tbl.createEntity( startercamp, 'Kindling' );

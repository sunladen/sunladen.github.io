import Server from './server.js';

export default class TextBattleLootServer extends Server {

	constructor() {
		super(process.env.PORT, true );
		this.entityTypes = {};
		this.world = new Entity();
		this.state.world = this.world.world;
		this.playersById = {};
	}

	connected( ws, id ) {
		console.log( `client ${id} connected` );
		this.playersById[ id ] = new PlayerCharacter( startercamp, id );
	}

	disconnected( id ) {
		console.log( `client ${id} disconnected` );
		const player = this.playersById[ id ];
		delete this.playersById[ id ];
		player.parent.remove( player );
	}

	update() {
		for ( const entity of Entity.instances ) {
			if ( entity.dirty ) entity.update();
		}
	}

	deleteEntity ( entity ) {
		for ( const content of entity.contents ) entity.parent.add( content );
		entity.parent.remove( entity );
		const index = Entity.instances.indexOf( entity );
		if ( index > -1 ) Entity.instances.splice( index, 1 );
	}

}

class Entity {

	static instances = [];

	constructor( { parent = null, name = '[Unnamed entity]', id = Server.uuid(), baseWeight = 0.001, weight = 0 } = {} ) {
		this.parent = parent;
		this.name = name;
		this.id = id;
		this.type = this.constructor.name;
		this.baseWeight = baseWeight;
		this.weight = baseWeight + weight;
		this.contents = [];
		this.interactions = {};
		this.hasInteractions = false;
		this.combines = {};
		this.hasCombines = false;
		this.world = { id: this.id, type: this.type, contents: [] };
		this.dirty = true;
		Entity.instances.push( this );
		parent && parent.add( this );
	}

	addInteraction( entitytype, fn ) {
		this.interactions[ entitytype ] = fn;
		this.hasInteractions = true;
	}

	addCombine( entitytype, fn ) {
		this.combines[ entitytype ] = fn;
		this.hasCombines = true;
	}

	update() {
		if ( ! this.dirty ) return;
		if ( this.baseWeight < 0 ) this.baseWeight = 0;
		if ( this.weight < 0 ) this.weight = 0;
		const delta = { id: this.id };
		if ( this.baseWeight === 0 ) {
			tbl.deleteEntity( this );
			delta.removeFlag = true;
		}
		const parent = this.parent == null ? null : this.parent.id;
		if ( this.world.parent !== parent )
			delta.parent = this.world.parent = parent;
		if ( this.world.name !== this.name )
			delta.name = this.world.name = this.name;
		const worldBaseWeight = Math.round(this.baseWeight * 100) / 100;
		if ( this.world.baseWeight !== worldBaseWeight )
			delta.baseWeight = this.world.baseWeight = worldBaseWeight;
		const worldWeight = Math.round(this.weight * 100) / 100;
		if ( this.world.weight !== worldWeight )
			delta.weight = this.world.weight = worldWeight;
		// broadcast delta if allowed and there is change
		if ( Object.keys(delta).length > 1 ) tbl.send( 'Update', delta );
		this.dirty = false;
		if ( this.hasInteractions ) {
			for ( const content of this.contents ) {
				if ( content.type in this.interactions ) this.interactions[ content.type ]( content );
			}
		}
	}

	add( entity ) {
		if ( entity.parent && entity.parent !== this ) entity.parent.remove( entity );
		let index = this.contents.indexOf( entity );
		if ( index === - 1 ) {
			if ( entity.hasCombines ) {
				for ( const content of this.contents ) {
					if ( content.type in entity.combines ) {
						entity.combines[ content.type ]( content );
						return content;
					}
				}
			}
			entity.parent = this;
			entity.dirty = true;
			this.contents.push( entity );
			this.changeWeight( entity.weight );
		}
		index = this.world.contents.indexOf( entity.world );
		if ( index === - 1 ) this.world.contents.push( entity.world );
		return entity;
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
		this.baseWeight = Math.round(this.baseWeight * 100) / 100;
		this.weight += delta;
		this.weight = Math.round(this.weight * 100) / 100;
		this.dirty = true;
		if ( this.parent ) this.parent.changeWeight( delta );
	}

	changeWeight( delta ) {
		this.weight += delta;
		this.dirty = true;
		if ( this.parent ) this.parent.changeWeight( delta );
	}

}
const tbl = new TextBattleLootServer();

class Location extends Entity {

	constructor( parent, name = '[Unnamed location]' ) {
		super( { parent: parent, name: name, baseWeight: 5000000 } );
	}

}

class PlayerCharacter extends Entity {

	constructor( parent, id, name ) {
		super( { parent: parent, name: name || `player-${id}`, id: id, baseWeight: 80 } );
	}

}

class Kindling extends Entity {

	constructor( parent ) {
		super( { parent: parent, name: 'Kindling', baseWeight: 1.5 } );
	}

}

class Flint extends Entity {

	constructor( parent ) {
		super( { parent: parent, name: 'Flint', baseWeight: 0.2 } );
	}

	interact( entity ) {
		if ( entity.constructor.name === 'Kindling' ) {
			const fire = entity.parent.add( new Fire() );
			fire.add( entity );
		}
	}

}

class Fire extends Entity {

	constructor( parent ) {
		super( { parent: parent, name: 'Fire' } );
		this.addInteraction( 'Kindling', kindling => {
			kindling.changeBaseWeight( -0.1 );
			new Ash( this );
		} );
	}

	changeWeight( delta ) {
		super.changeWeight( delta );
		// test for fuel remaining
		for ( const content of this.contents ) {
			if ( content.constructor.name === 'Kindling' && content.baseWeight > 0 ) return;
		}
		// no fuel remains; change baseWeight to 0 which triggers removal of Fire
		this.changeBaseWeight( -this.baseWeight );
	}

}

class Ash extends Entity {

	constructor( parent ) {
		super( { parent: parent, name: 'Ash', baseWeight: 0.05 } );
		this.addCombine( 'Ash', ash => {
			ash.changeBaseWeight( this.baseWeight );
			tbl.deleteEntity( this );
		} );
	}

}

const startercamp = new Location( tbl.world, 'Starter camp' );
const kindling = new Kindling( startercamp );
const flint = new Flint( startercamp );

flint.interact( kindling );

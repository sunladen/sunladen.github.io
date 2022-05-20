import { noise } from './noise.js';

const world = {
    size: 100,
    cell: [],
    updateWater: []
};

const view = {
    x: 0,
    y: 0
};

const canvas = document.createElement( 'canvas' );

canvas.width = Math.floor( window.innerWidth * 0.5 );
canvas.height = Math.floor( window.innerHeight * 0.5 );
canvas.style.position = 'absolute';
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';

document.body.append( canvas );

const offscreen = document.createElement( 'canvas' );

offscreen.width = canvas.width;
offscreen.height = canvas.height;

const offctx = offscreen.getContext( '2d' );
const imageData = offctx.createImageData( world.size, world.size );
const data = imageData.data;

const ctx = canvas.getContext( '2d' );

function initialise() {

    world.cell = new Array( world.size );

    for ( var y = 0; y < world.size; y ++ ) {

        world.cell[ y ] = new Array( world.size );

        for ( var x = 0; x < world.size; x ++ ) {

            const i = ( y * world.size + x ) * 4;

            const xp = x / world.size;
            const yp = y / world.size;
            const n = noise( xp * 1, yp * 1 ) * .6 + noise( ( xp + 15 ) * 4, ( yp + 15 ) * 4 ) * .3 + noise( ( xp + 1000 ) * 8, ( yp + 1000 ) * 8 ) * .1;
            const height = Math.max( 0, Math.min( 255, Math.floor( ( n + 1 ) * 255 * 0.5 ) ) );

            var water = Math.random();
            water = water > 0.5 ? Math.floor( Math.random() * 255 ) : 0;

            world.cell[ y ][ x ] = {
                x: x,
                y: y,
                height: height,
                water: water
            };

            if ( water > 0 ) world.updateWater.push( world.cell[ y ][ x ] );

            imageData.data[ i ] = imageData.data[ i + 1 ] = imageData.data[ i + 2 ] = height;
            imageData.data[ i + 3 ] = 255;

        }

    }

    for ( var y = 0; y < world.size; y ++ ) {

        for ( var x = 0; x < world.size; x ++ ) {

            world.cell[ y ][ x ].north = y > 0 ? world.cell[ y - 1 ][ x ] : null;
            world.cell[ y ][ x ].south = y < world.size - 1 ? world.cell[ y + 1 ][ x ] : null;
            world.cell[ y ][ x ].east = x < world.size - 1 ? world.cell[ y ][ x + 1 ] : null;
            world.cell[ y ][ x ].west = x > 0 ? world.cell[ y ][ x - 1 ] : null;

        }

    }

}

initialise();

var lasttime = 0;
var frames = 0;

function animate() {

    const time = performance.now();
    const elapsed = time - lasttime;

    lasttime = time;

    //const nextUpdateWater = [];

    for ( var y = 0; y < world.size; y ++ ) {

        for ( var x = 0; x < world.size; x ++ ) {

            const cell = world.cell[ y ][ x ];

            if ( Math.random() > 0.999 ) cell.water ++;

            //for ( var i = 0; i < world.updateWater.length; i ++ ) {

            //	var cell = world.updateWater[ i ];

            if ( cell.north && cell.north.height + cell.north.water < cell.height + cell.water ) {

                cell.water --;
                cell.north.water ++;
                //nextUpdateWater.push( cell.north );

            }

            if ( cell.south && cell.south.height + cell.south.water < cell.height + cell.water ) {

                cell.water --;
                cell.south.water ++;
                //nextUpdateWater.push( cell.south );

            }

            if ( cell.east && cell.east.height + cell.east.water < cell.height + cell.water ) {

                cell.water --;
                cell.east.water ++;
                //nextUpdateWater.push( cell.east );

            }

            if ( cell.west && cell.west.height + cell.west.water < cell.height + cell.water ) {

                cell.water --;
                cell.west.water ++;
                //nextUpdateWater.push( cell.west );

            }

            //if ( ( cell.north && cell.north.water < cell.water ) ||
            //	( cell.south && cell.south.water < cell.water ) ||
            //	( cell.east && cell.east.water < cell.water ) ||
            //	( cell.west && cell.west.water < cell.water ) )
            //nextUpdateWater.push( cell );

        }

    }

    //world.updateWater = nextUpdateWater;

    for ( var y = 0; y < world.size; y ++ ) {

        for ( var x = 0; x < world.size; x ++ ) {

            const i = ( y * world.size + x ) * 4;

            const cell = world.cell[ y ][ x ];

            data[ i ] = imageData.data[ i + 1 ] = imageData.data[ i + 2 ] = cell.height;

            if ( cell.water <= 100 ) {

                data[ i ] = 155 - cell.water * 1.5;
                data[ i + 1 ] = 155 - cell.water;
                data[ i + 2 ] = 100 - cell.water;

                if ( ! cell.lastevaporation || time - cell.lastevaporation > 10000 - cell.water * 40 ) {

                    cell.water --;
                    cell.lastevaporation = time;

                }

            } else {

                data[ i ] = data[ i + 1 ] = 255 - cell.water * 2;
                data[ i + 2 ] = cell.water;

                if ( ! cell.lastevaporation || time - cell.lastevaporation > cell.water * 10 ) {

                    cell.water --;
                    cell.lastevaporation = time;

                }

            }

        }

    }

    offctx.putImageData( imageData, 0, 0 );
    ctx.drawImage( offscreen, 0, 0, canvas.width * ( canvas.width / world.size ), canvas.height * ( canvas.height / world.size ) );// canvas.width / world.size, canvas.height / world.size );

    frames ++;
    //requestAnimationFrame( animate );
    //clearInterval( id );

}

var id = setInterval( animate, 0 );

setInterval( () => {

    console.log( `${frames}fps` );
    frames = 0;

}, 1000 );


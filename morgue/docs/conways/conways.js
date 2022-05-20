const width = 1000;
const height = width;

const pixelDataLength = 4;
const row = pixelDataLength * width;

const NW = - pixelDataLength - row;
const N = - row;
const NE = pixelDataLength - row;
const W = - pixelDataLength;
const E = pixelDataLength;
const SW = - pixelDataLength + row;
const S = row;
const SE = pixelDataLength + row;

const canvas = document.createElement( 'canvas' );
canvas.width = width;
canvas.height = height;
canvas.style.position = 'absolute';
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.background = 'black';
document.body.append( canvas );

const ctx = canvas.getContext( '2d', { alpha: false } );
const imageData = [
    ctx.getImageData( 0, 0, canvas.width, canvas.height ),
    ctx.getImageData( 0, 0, canvas.width, canvas.height )
];

var imageIndex = 0;

function initialise() {

    const data = imageData[ imageIndex ].data;
    const l = data.length - row;

    for ( var i = row + pixelDataLength; i < l; i += pixelDataLength ) {

	    const p = Math.round( Math.random() ) * 255;
        data[ i ] = data[ i + 1 ] = data[ i + 2 ] = p;

    }

}

initialise();

var frames = 0;

function animate() {

    const a = imageData[ imageIndex ].data;
    const b = imageData[ imageIndex = 1 - imageIndex ].data;
    const l = a.length - row;

    for ( var i = row + pixelDataLength; i < l; i += pixelDataLength ) {

    	const n = ( a[ i + NW ] + a[ i + N ] + a[ i + NE ] + a[ i + W ] + a[ i + E ] + a[ i + SW ] + a[ i + S ] + a[ i + SE ] ) / 255;
        b[ i ] = b[ i + 1 ] = b[ i + 2 ] = a[ i ] ? ( n === 2 || n === 3 ? 255 : 0 ) : n === 3 ? 255 : 0;

    }

    ctx.putImageData( imageData[ imageIndex ], 0, 0 );
    frames ++;
    requestAnimationFrame( animate );

}

animate();

setInterval( () => {

    console.log( `${frames}fps` );
    frames = 0;

}, 1000 );


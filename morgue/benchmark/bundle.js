(function () {
    'use strict';

    /**
	 * Returns a {Canvas} representing the canvas identified with id
	 * @param {string} id
	 * @param {number?} width
	 * @param {number?} height
	 * @return a {Canvas}
	 */
    const Canvas = ( id, width, height ) => {

	    let canvas = {
	        element: document.getElementById( id )
	    };

	    if ( ! canvas.element ) {

	        return null;

	    }

	    if ( width ) canvas.element.width = width;
	    if ( height ) canvas.element.height = height;

	    canvas.width  = canvas.element.width;
	    canvas.height = canvas.element.height;
	    canvas.ctx = canvas.element.getContext( "2d" );
	    canvas.imageData = canvas.ctx.getImageData( 0, 0, canvas.width, canvas.height );

	    canvas.buf = new ArrayBuffer( canvas.imageData.data.length );
	    canvas.buf8 = new Uint8ClampedArray( canvas.buf );
	    canvas.data = new Uint32Array( canvas.buf );

	    return canvas;

    };

    /**
	 * Updates the display with the canvases image data
	 * @param {Canvas} canvas
	 */
    Canvas.updateImageData = canvas => {

	    canvas.imageData.data.set( canvas.buf8 );
	    canvas.ctx.putImageData( canvas.imageData, 0, 0 );

    };

    /**
	 * Sets the colours of each pixel to the uint32 returned by fn, and updates the display.
	 * @param {function} fn
	 */
    Canvas.forEach = ( canvas, fn ) => {

	    let height = canvas.height;
	    let width = canvas.width;

	    for ( let y = 0; y < height; ++ y ) {

	        for ( let x = 0; x < width; ++ x ) {

	            canvas.data[ y * width + x ] = fn( x, y, width, height );

	        }

	    }

	    Canvas.updateImageData( canvas );

    };

    /**
	 * Returns a Uint32 colour value from floats r, g, b, a in the range [0, 1]
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 * @return {number}
	 */
    Canvas.rgba = ( r, g, b, a ) => {

	    return ( ~~ ( a * 255.0 ) << 24 ) | ( ~~ ( b * 255.0 ) << 16 ) | ( ~~ ( g * 255.0 ) << 8 ) | ~~ ( r * 255.0 );

    };

    /**
	 * Returns a Uint32 colour value from floats r, g, b in the range [0, 1]
	 * The colours alpha channel is set be opaque (i.e 1)
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @return {number}
	 */
    Canvas.rgb = ( r, g, b ) => {

	    return Canvas.OPAQUE | ( ~~ ( b * 255.0 ) << 16 ) | ( ~~ ( g * 255.0 ) << 8 ) | ~~ ( r * 255.0 );

    };

    // Alpha constants
    Canvas.OPAQUE = 255 << 24;
    Canvas.TRANSPARENT = 0 << 24;

    const canvas = Canvas( '0', 100, 100 );

    const array = [
	    new Array( canvas.width * canvas.height ),
	    new Array( canvas.width * canvas.height )
    ];

    let MAXX = canvas.width - 1;
    let MAXY = canvas.height - 1;

    let index = 0;
    let front = array[ index ];
    let back = array[ 1 - index ];

    const decay = 0.98;
    for ( let y = 0; y < canvas.height; y ++ ) {

	    for ( let x = 0; x < canvas.width; x ++ ) {

	        front[ y * canvas.width + x ] = Canvas.rgba( 1, 1, 1, 1 );

	    }

    }

    const DIAG_CONTRIB = 1.0 / 1.41421356237;

    const addA = ( rgba, Uint32, diag ) => {

	    rgba.a += ( ( Uint32 >>> 24 ) / 255 ) * ( diag ? DIAG_CONTRIB : 1 );
	    rgba.b += ( ( Uint32 >>> 16 & 0xFF ) / 255 ) * ( diag ? DIAG_CONTRIB : 1 );
	    rgba.g += ( ( Uint32 >>> 8 & 0xFF ) / 255 ) * ( diag ? DIAG_CONTRIB : 1 );
	    rgba.r += ( ( Uint32 & 0xFF ) / 255 ) * ( diag ? DIAG_CONTRIB : 1 );

    };

    const addB = ( rgba, Uint32 ) => {

	    rgba.a += ( Uint32 >>> 24 ) / 255;
	    rgba.b += ( Uint32 >>> 16 & 0xFF ) / 255;
	    rgba.g += ( Uint32 >>> 8 & 0xFF ) / 255;
	    rgba.r += ( Uint32 & 0xFF ) / 255;

    };

    const averageA = ( x, y ) => {

	    let rgba = {
	        r: 0,
	        g: 0,
	        b: 0,
	        a: 0
	    };

	    let n = 0;

	    for ( let dy = - 1; dy < 2; dy++ ) {

	        let Y = y + dy;

	        if ( Y < 0 || Y > MAXY ) continue

	        for ( let dx = - 1; dx < 2; dx++ ) {

	            let X = x + dx;

	            if ( X < 0 || X > MAXX ) continue

	            addA( rgba, front[ Y * canvas.width + X ], dy != 0 || dx != 0 );

	            n++;

	        }

	    }

	    rgba.r = ( rgba.r / n ) * decay;
	    rgba.g = ( rgba.g / n ) * decay;
	    rgba.b = ( rgba.b / n ) * decay;
	    rgba.a = ( rgba.a / n ) * decay;

	    if ( rgba.r < 0 ) rgba.r = 0; else if ( rgba.r > 1 ) rgba.r = 1;
	    if ( rgba.g < 0 ) rgba.g = 0; else if ( rgba.g > 1 ) rgba.g = 1;
	    if ( rgba.b < 0 ) rgba.b = 0; else if ( rgba.b > 1 ) rgba.b = 1;
	    if ( rgba.a < 0 ) rgba.a = 0; else if ( rgba.a > 1 ) rgba.a = 1;

	    return Canvas.rgba( rgba.r, rgba.g, rgba.b, rgba.a )

    };

    const averageB = ( x, y ) => {

	    let rgba = {
	        r: 0,
	        g: 0,
	        b: 0,
	        a: 0
	    };

	    let n = 0;

	    let XX = x + 1;
	    let YY = y + 1;

	    for ( let Y = y - 1; Y <= YY; Y++ ) {

	        for ( let X = x - 1; X <= XX; X++ ) {

	            if ( X < 0 || X > MAXX || Y < 0 || Y > MAXY ) continue

	            addB( rgba, front[ Y * canvas.width + X ] );

	            n++;

	        }

	    }

	    rgba.r = ( rgba.r / n ) * decay;
	    rgba.g = ( rgba.g / n ) * decay;
	    rgba.b = ( rgba.b / n ) * decay;
	    rgba.a = ( rgba.a / n ) * decay;

	    if ( rgba.r < 0 ) rgba.r = 0; else if ( rgba.r > 1 ) rgba.r = 1;
	    if ( rgba.g < 0 ) rgba.g = 0; else if ( rgba.g > 1 ) rgba.g = 1;
	    if ( rgba.b < 0 ) rgba.b = 0; else if ( rgba.b > 1 ) rgba.b = 1;
	    if ( rgba.a < 0 ) rgba.a = 0; else if ( rgba.a > 1 ) rgba.a = 1;

	    return Canvas.rgba( rgba.r, rgba.g, rgba.b, rgba.a )

    };

    const methodA = () => {

	    for ( let y = 0; y <= MAXY; y ++ ) {

	        for ( let x = 0; x <= MAXX; x ++ ) {

	            back[ y * canvas.width + x ] = averageA( x, y );

	        }

	    }

	    index = 1 - index;
	    front = array[ index ];
	    back = array[ 1 - index ];

	    Canvas.forEach( canvas, ( x, y, width, height ) => {

	        return front[ y * canvas.width + x ]

	    } );

    };

    const methodB = () => {

	    for ( let y = 0; y <= MAXY; y ++ ) {

	        for ( let x = 0; x <= MAXX; x ++ ) {

	            back[ y * canvas.width + x ] = averageB( x, y );

	        }

	    }

	    index = 1 - index;
	    front = array[ index ];
	    back = array[ 1 - index ];

	    Canvas.forEach( canvas, ( x, y, width, height ) => {

	        return front[ y * canvas.width + x ]

	    } );

    };

    const log = message => {

	    log.element.textContent += '\n' + message;

    };

    log.element = document.getElementsByTagName( 'code' );
    log.element = log.element[ log.element.length - 1 ];

    log( 'Starting tests...\n' )

    ;( new Benchmark.Suite )

        .add( 'methodA', function() {

	    methodA();

        } )

        .add( 'methodB', function() {

	    methodB();

        } )

        .on( 'cycle', function( event ) {

	    log( event.target );

        } )

        .on( 'complete', function() {

	    log( '\nFastest is ' + this.filter( 'fastest' ).map( 'name' ) );

        } )

        .run( { 'async': true } );

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9jYW52YXMvY2FudmFzLmpzIiwibWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogUmV0dXJucyBhIHtDYW52YXN9IHJlcHJlc2VudGluZyB0aGUgY2FudmFzIGlkZW50aWZpZWQgd2l0aCBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICogQHBhcmFtIHtudW1iZXI/fSB3aWR0aFxyXG4gKiBAcGFyYW0ge251bWJlcj99IGhlaWdodFxyXG4gKiBAcmV0dXJuIGEge0NhbnZhc31cclxuICovXHJcbmNvbnN0IENhbnZhcyA9ICggaWQsIHdpZHRoLCBoZWlnaHQgKSA9PiB7XHJcblxyXG4gICAgbGV0IGNhbnZhcyA9IHtcclxuICAgICAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggaWQgKVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoICEgY2FudmFzLmVsZW1lbnQgKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIHdpZHRoICkgY2FudmFzLmVsZW1lbnQud2lkdGggPSB3aWR0aDtcclxuICAgIGlmICggaGVpZ2h0ICkgY2FudmFzLmVsZW1lbnQuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCAgPSBjYW52YXMuZWxlbWVudC53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMuZWxlbWVudC5oZWlnaHQ7XHJcbiAgICBjYW52YXMuY3R4ID0gY2FudmFzLmVsZW1lbnQuZ2V0Q29udGV4dCggXCIyZFwiICk7XHJcbiAgICBjYW52YXMuaW1hZ2VEYXRhID0gY2FudmFzLmN0eC5nZXRJbWFnZURhdGEoIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCApO1xyXG5cclxuICAgIGNhbnZhcy5idWYgPSBuZXcgQXJyYXlCdWZmZXIoIGNhbnZhcy5pbWFnZURhdGEuZGF0YS5sZW5ndGggKTtcclxuICAgIGNhbnZhcy5idWY4ID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KCBjYW52YXMuYnVmICk7XHJcbiAgICBjYW52YXMuZGF0YSA9IG5ldyBVaW50MzJBcnJheSggY2FudmFzLmJ1ZiApO1xyXG5cclxuICAgIHJldHVybiBjYW52YXM7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0aGUgZGlzcGxheSB3aXRoIHRoZSBjYW52YXNlcyBpbWFnZSBkYXRhXHJcbiAqIEBwYXJhbSB7Q2FudmFzfSBjYW52YXNcclxuICovXHJcbkNhbnZhcy51cGRhdGVJbWFnZURhdGEgPSBjYW52YXMgPT4ge1xyXG5cclxuICAgIGNhbnZhcy5pbWFnZURhdGEuZGF0YS5zZXQoIGNhbnZhcy5idWY4ICk7XHJcbiAgICBjYW52YXMuY3R4LnB1dEltYWdlRGF0YSggY2FudmFzLmltYWdlRGF0YSwgMCwgMCApO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGNvbG91cnMgb2YgZWFjaCBwaXhlbCB0byB0aGUgdWludDMyIHJldHVybmVkIGJ5IGZuLCBhbmQgdXBkYXRlcyB0aGUgZGlzcGxheS5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICovXHJcbkNhbnZhcy5mb3JFYWNoID0gKCBjYW52YXMsIGZuICkgPT4ge1xyXG5cclxuICAgIGxldCBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgbGV0IHdpZHRoID0gY2FudmFzLndpZHRoO1xyXG5cclxuICAgIGZvciAoIGxldCB5ID0gMDsgeSA8IGhlaWdodDsgKysgeSApIHtcclxuXHJcbiAgICAgICAgZm9yICggbGV0IHggPSAwOyB4IDwgd2lkdGg7ICsrIHggKSB7XHJcblxyXG4gICAgICAgICAgICBjYW52YXMuZGF0YVsgeSAqIHdpZHRoICsgeCBdID0gZm4oIHgsIHksIHdpZHRoLCBoZWlnaHQgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBDYW52YXMudXBkYXRlSW1hZ2VEYXRhKCBjYW52YXMgKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgVWludDMyIGNvbG91ciB2YWx1ZSBmcm9tIGZsb2F0cyByLCBnLCBiLCBhIGluIHRoZSByYW5nZSBbMCwgMV1cclxuICogQHBhcmFtIHtudW1iZXJ9IHJcclxuICogQHBhcmFtIHtudW1iZXJ9IGdcclxuICogQHBhcmFtIHtudW1iZXJ9IGJcclxuICogQHBhcmFtIHtudW1iZXJ9IGFcclxuICogQHJldHVybiB7bnVtYmVyfVxyXG4gKi9cclxuQ2FudmFzLnJnYmEgPSAoIHIsIGcsIGIsIGEgKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuICggfn4gKCBhICogMjU1LjAgKSA8PCAyNCApIHwgKCB+fiAoIGIgKiAyNTUuMCApIDw8IDE2ICkgfCAoIH5+ICggZyAqIDI1NS4wICkgPDwgOCApIHwgfn4gKCByICogMjU1LjAgKTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgVWludDMyIGNvbG91ciB2YWx1ZSBmcm9tIGZsb2F0cyByLCBnLCBiIGluIHRoZSByYW5nZSBbMCwgMV1cclxuICogVGhlIGNvbG91cnMgYWxwaGEgY2hhbm5lbCBpcyBzZXQgYmUgb3BhcXVlIChpLmUgMSlcclxuICogQHBhcmFtIHtudW1iZXJ9IHJcclxuICogQHBhcmFtIHtudW1iZXJ9IGdcclxuICogQHBhcmFtIHtudW1iZXJ9IGJcclxuICogQHJldHVybiB7bnVtYmVyfVxyXG4gKi9cclxuQ2FudmFzLnJnYiA9ICggciwgZywgYiApID0+IHtcclxuXHJcbiAgICByZXR1cm4gQ2FudmFzLk9QQVFVRSB8ICggfn4gKCBiICogMjU1LjAgKSA8PCAxNiApIHwgKCB+fiAoIGcgKiAyNTUuMCApIDw8IDggKSB8IH5+ICggciAqIDI1NS4wICk7XHJcblxyXG59XHJcblxyXG4vLyBBbHBoYSBjb25zdGFudHNcclxuQ2FudmFzLk9QQVFVRSA9IDI1NSA8PCAyNDtcclxuQ2FudmFzLlRSQU5TUEFSRU5UID0gMCA8PCAyNDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbnZhc1xyXG5cclxuIiwiaW1wb3J0IENhbnZhcyBmcm9tICcuLi9jYW52YXMvY2FudmFzJ1xyXG5cclxuXHJcbmNvbnN0IGNhbnZhcyA9IENhbnZhcyggJzAnLCAxMDAsIDEwMCApXHJcblxyXG5cclxuY29uc3QgYXJyYXkgPSBbXHJcbiAgICBuZXcgQXJyYXkoIGNhbnZhcy53aWR0aCAqIGNhbnZhcy5oZWlnaHQgKSxcclxuICAgIG5ldyBBcnJheSggY2FudmFzLndpZHRoICogY2FudmFzLmhlaWdodCApXHJcbl1cclxuXHJcbmxldCBNQVhYID0gY2FudmFzLndpZHRoIC0gMVxyXG5sZXQgTUFYWSA9IGNhbnZhcy5oZWlnaHQgLSAxXHJcblxyXG5sZXQgaW5kZXggPSAwXHJcbmxldCBmcm9udCA9IGFycmF5WyBpbmRleCBdXHJcbmxldCBiYWNrID0gYXJyYXlbIDEgLSBpbmRleCBdXHJcblxyXG5jb25zdCBkZWNheSA9IDAuOThcclxuY29uc3QgRCA9IGRlY2F5ICogMjU1XHJcblxyXG5cclxuZm9yICggbGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSArKyApIHtcclxuXHJcbiAgICBmb3IgKCBsZXQgeCA9IDA7IHggPCBjYW52YXMud2lkdGg7IHggKysgKSB7XHJcblxyXG4gICAgICAgIGZyb250WyB5ICogY2FudmFzLndpZHRoICsgeCBdID0gQ2FudmFzLnJnYmEoIDEsIDEsIDEsIDEgKVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5jb25zdCBESUFHX0NPTlRSSUIgPSAxLjAgLyAxLjQxNDIxMzU2MjM3XHJcblxyXG5cclxuY29uc3QgYWRkQSA9ICggcmdiYSwgVWludDMyLCBkaWFnICkgPT4ge1xyXG5cclxuICAgIHJnYmEuYSArPSAoICggVWludDMyID4+PiAyNCApIC8gMjU1ICkgKiAoIGRpYWcgPyBESUFHX0NPTlRSSUIgOiAxIClcclxuICAgIHJnYmEuYiArPSAoICggVWludDMyID4+PiAxNiAmIDB4RkYgKSAvIDI1NSApICogKCBkaWFnID8gRElBR19DT05UUklCIDogMSApXHJcbiAgICByZ2JhLmcgKz0gKCAoIFVpbnQzMiA+Pj4gOCAmIDB4RkYgKSAvIDI1NSApICogKCBkaWFnID8gRElBR19DT05UUklCIDogMSApXHJcbiAgICByZ2JhLnIgKz0gKCAoIFVpbnQzMiAmIDB4RkYgKSAvIDI1NSApICogKCBkaWFnID8gRElBR19DT05UUklCIDogMSApXHJcblxyXG59XHJcblxyXG5cclxuY29uc3QgYWRkQiA9ICggcmdiYSwgVWludDMyICkgPT4ge1xyXG5cclxuICAgIHJnYmEuYSArPSAoIFVpbnQzMiA+Pj4gMjQgKSAvIDI1NVxyXG4gICAgcmdiYS5iICs9ICggVWludDMyID4+PiAxNiAmIDB4RkYgKSAvIDI1NVxyXG4gICAgcmdiYS5nICs9ICggVWludDMyID4+PiA4ICYgMHhGRiApIC8gMjU1XHJcbiAgICByZ2JhLnIgKz0gKCBVaW50MzIgJiAweEZGICkgLyAyNTVcclxuXHJcbn1cclxuXHJcbmNvbnN0IGF2ZXJhZ2VBID0gKCB4LCB5ICkgPT4ge1xyXG5cclxuICAgIGxldCByZ2JhID0ge1xyXG4gICAgICAgIHI6IDAsXHJcbiAgICAgICAgZzogMCxcclxuICAgICAgICBiOiAwLFxyXG4gICAgICAgIGE6IDBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbiA9IDBcclxuXHJcbiAgICBmb3IgKCBsZXQgZHkgPSAtIDE7IGR5IDwgMjsgZHkrKyApIHtcclxuXHJcbiAgICAgICAgbGV0IFkgPSB5ICsgZHlcclxuXHJcbiAgICAgICAgaWYgKCBZIDwgMCB8fCBZID4gTUFYWSApIGNvbnRpbnVlXHJcblxyXG4gICAgICAgIGZvciAoIGxldCBkeCA9IC0gMTsgZHggPCAyOyBkeCsrICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IFggPSB4ICsgZHhcclxuXHJcbiAgICAgICAgICAgIGlmICggWCA8IDAgfHwgWCA+IE1BWFggKSBjb250aW51ZVxyXG5cclxuICAgICAgICAgICAgYWRkQSggcmdiYSwgZnJvbnRbIFkgKiBjYW52YXMud2lkdGggKyBYIF0sIGR5ICE9IDAgfHwgZHggIT0gMCApXHJcblxyXG4gICAgICAgICAgICBuKytcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZ2JhLnIgPSAoIHJnYmEuciAvIG4gKSAqIGRlY2F5XHJcbiAgICByZ2JhLmcgPSAoIHJnYmEuZyAvIG4gKSAqIGRlY2F5XHJcbiAgICByZ2JhLmIgPSAoIHJnYmEuYiAvIG4gKSAqIGRlY2F5XHJcbiAgICByZ2JhLmEgPSAoIHJnYmEuYSAvIG4gKSAqIGRlY2F5XHJcblxyXG4gICAgaWYgKCByZ2JhLnIgPCAwICkgcmdiYS5yID0gMDsgZWxzZSBpZiAoIHJnYmEuciA+IDEgKSByZ2JhLnIgPSAxXHJcbiAgICBpZiAoIHJnYmEuZyA8IDAgKSByZ2JhLmcgPSAwOyBlbHNlIGlmICggcmdiYS5nID4gMSApIHJnYmEuZyA9IDFcclxuICAgIGlmICggcmdiYS5iIDwgMCApIHJnYmEuYiA9IDA7IGVsc2UgaWYgKCByZ2JhLmIgPiAxICkgcmdiYS5iID0gMVxyXG4gICAgaWYgKCByZ2JhLmEgPCAwICkgcmdiYS5hID0gMDsgZWxzZSBpZiAoIHJnYmEuYSA+IDEgKSByZ2JhLmEgPSAxXHJcblxyXG4gICAgcmV0dXJuIENhbnZhcy5yZ2JhKCByZ2JhLnIsIHJnYmEuZywgcmdiYS5iLCByZ2JhLmEgKVxyXG5cclxufVxyXG5cclxuY29uc3QgYXZlcmFnZUIgPSAoIHgsIHkgKSA9PiB7XHJcblxyXG4gICAgbGV0IHJnYmEgPSB7XHJcbiAgICAgICAgcjogMCxcclxuICAgICAgICBnOiAwLFxyXG4gICAgICAgIGI6IDAsXHJcbiAgICAgICAgYTogMFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBuID0gMFxyXG5cclxuICAgIGxldCBYWCA9IHggKyAxXHJcbiAgICBsZXQgWVkgPSB5ICsgMVxyXG5cclxuICAgIGZvciAoIGxldCBZID0geSAtIDE7IFkgPD0gWVk7IFkrKyApIHtcclxuXHJcbiAgICAgICAgZm9yICggbGV0IFggPSB4IC0gMTsgWCA8PSBYWDsgWCsrICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCBYIDwgMCB8fCBYID4gTUFYWCB8fCBZIDwgMCB8fCBZID4gTUFYWSApIGNvbnRpbnVlXHJcblxyXG4gICAgICAgICAgICBhZGRCKCByZ2JhLCBmcm9udFsgWSAqIGNhbnZhcy53aWR0aCArIFggXSApXHJcblxyXG4gICAgICAgICAgICBuKytcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZ2JhLnIgPSAoIHJnYmEuciAvIG4gKSAqIGRlY2F5XHJcbiAgICByZ2JhLmcgPSAoIHJnYmEuZyAvIG4gKSAqIGRlY2F5XHJcbiAgICByZ2JhLmIgPSAoIHJnYmEuYiAvIG4gKSAqIGRlY2F5XHJcbiAgICByZ2JhLmEgPSAoIHJnYmEuYSAvIG4gKSAqIGRlY2F5XHJcblxyXG4gICAgaWYgKCByZ2JhLnIgPCAwICkgcmdiYS5yID0gMDsgZWxzZSBpZiAoIHJnYmEuciA+IDEgKSByZ2JhLnIgPSAxXHJcbiAgICBpZiAoIHJnYmEuZyA8IDAgKSByZ2JhLmcgPSAwOyBlbHNlIGlmICggcmdiYS5nID4gMSApIHJnYmEuZyA9IDFcclxuICAgIGlmICggcmdiYS5iIDwgMCApIHJnYmEuYiA9IDA7IGVsc2UgaWYgKCByZ2JhLmIgPiAxICkgcmdiYS5iID0gMVxyXG4gICAgaWYgKCByZ2JhLmEgPCAwICkgcmdiYS5hID0gMDsgZWxzZSBpZiAoIHJnYmEuYSA+IDEgKSByZ2JhLmEgPSAxXHJcblxyXG4gICAgcmV0dXJuIENhbnZhcy5yZ2JhKCByZ2JhLnIsIHJnYmEuZywgcmdiYS5iLCByZ2JhLmEgKVxyXG5cclxufVxyXG5cclxuXHJcbmNvbnN0IG1ldGhvZEEgPSAoKSA9PiB7XHJcblxyXG4gICAgZm9yICggbGV0IHkgPSAwOyB5IDw9IE1BWFk7IHkgKysgKSB7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCB4ID0gMDsgeCA8PSBNQVhYOyB4ICsrICkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYmFja1sgeSAqIGNhbnZhcy53aWR0aCArIHggXSA9IGF2ZXJhZ2VBKCB4LCB5IClcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbmRleCA9IDEgLSBpbmRleFxyXG4gICAgZnJvbnQgPSBhcnJheVsgaW5kZXggXVxyXG4gICAgYmFjayA9IGFycmF5WyAxIC0gaW5kZXggXVxyXG5cclxuICAgIENhbnZhcy5mb3JFYWNoKCBjYW52YXMsICggeCwgeSwgd2lkdGgsIGhlaWdodCApID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZyb250WyB5ICogY2FudmFzLndpZHRoICsgeCBdXHJcblxyXG4gICAgfSApXHJcblxyXG59XHJcblxyXG5jb25zdCBtZXRob2RCID0gKCkgPT4ge1xyXG5cclxuICAgIGZvciAoIGxldCB5ID0gMDsgeSA8PSBNQVhZOyB5ICsrICkge1xyXG5cclxuICAgICAgICBmb3IgKCBsZXQgeCA9IDA7IHggPD0gTUFYWDsgeCArKyApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJhY2tbIHkgKiBjYW52YXMud2lkdGggKyB4IF0gPSBhdmVyYWdlQiggeCwgeSApXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXggPSAxIC0gaW5kZXhcclxuICAgIGZyb250ID0gYXJyYXlbIGluZGV4IF1cclxuICAgIGJhY2sgPSBhcnJheVsgMSAtIGluZGV4IF1cclxuXHJcbiAgICBDYW52YXMuZm9yRWFjaCggY2FudmFzLCAoIHgsIHksIHdpZHRoLCBoZWlnaHQgKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBmcm9udFsgeSAqIGNhbnZhcy53aWR0aCArIHggXVxyXG5cclxuICAgIH0gKVxyXG5cclxufVxyXG5cclxuXHJcbmNvbnN0IGxvZyA9IG1lc3NhZ2UgPT4ge1xyXG5cclxuICAgIGxvZy5lbGVtZW50LnRleHRDb250ZW50ICs9ICdcXG4nICsgbWVzc2FnZVxyXG5cclxufVxyXG5cclxubG9nLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2NvZGUnIClcclxubG9nLmVsZW1lbnQgPSBsb2cuZWxlbWVudFsgbG9nLmVsZW1lbnQubGVuZ3RoIC0gMSBdXHJcblxyXG5cclxubG9nKCAnU3RhcnRpbmcgdGVzdHMuLi5cXG4nIClcclxuXHJcblxyXG47KCBuZXcgQmVuY2htYXJrLlN1aXRlIClcclxuXHJcbi5hZGQoICdtZXRob2RBJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbWV0aG9kQSgpXHJcblxyXG59IClcclxuXHJcbi5hZGQoICdtZXRob2RCJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbWV0aG9kQigpXHJcblxyXG59IClcclxuXHJcbi5vbiggJ2N5Y2xlJywgZnVuY3Rpb24oIGV2ZW50ICkge1xyXG5cclxuICAgIGxvZyggZXZlbnQudGFyZ2V0IClcclxuXHJcbn0gKVxyXG5cclxuLm9uKCAnY29tcGxldGUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsb2coICdcXG5GYXN0ZXN0IGlzICcgKyB0aGlzLmZpbHRlciggJ2Zhc3Rlc3QnICkubWFwKCAnbmFtZScgKSApXHJcblxyXG59IClcclxuXHJcbi5ydW4oIHsgJ2FzeW5jJzogdHJ1ZSB9IClcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsT0FBTSxNQUFNLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTTs7QUFFeEMsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHO0FBQ2pCLENBQUEsUUFBUSxPQUFPLEVBQUUsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUU7QUFDOUMsQ0FBQSxLQUFLLENBQUM7O0FBRU4sQ0FBQSxJQUFJLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHOztBQUU1QixDQUFBLFFBQVEsT0FBTyxJQUFJLENBQUM7O0FBRXBCLENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksS0FBSyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzlDLENBQUEsSUFBSSxLQUFLLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRWpELENBQUEsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3pDLENBQUEsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzFDLENBQUEsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ25ELENBQUEsSUFBSSxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRXBGLENBQUEsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksV0FBVyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2pFLENBQUEsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQWlCLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RELENBQUEsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFaEQsQ0FBQSxJQUFJLE9BQU8sTUFBTSxDQUFDOztBQUVsQixDQUFBLENBQUMsQ0FBQTs7QUFFRCxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQSxNQUFNLENBQUMsZUFBZSxHQUFHLE1BQU0sSUFBSTs7QUFFbkMsQ0FBQSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDN0MsQ0FBQSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDOztBQUV0RCxDQUFBLENBQUMsQ0FBQTs7QUFFRCxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQSxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTTs7QUFFbkMsQ0FBQSxJQUFJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDL0IsQ0FBQSxJQUFJLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7O0FBRTdCLENBQUEsSUFBSSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHOztBQUV4QyxDQUFBLFFBQVEsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRzs7QUFFM0MsQ0FBQSxZQUFZLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7O0FBRXJFLENBQUEsU0FBUzs7QUFFVCxDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLENBQUM7O0FBRXJDLENBQUEsQ0FBQyxDQUFBOztBQUVELENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQSxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNOztBQUVoQyxDQUFBLElBQUksT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDOztBQUVsSCxDQUFBLENBQUMsQ0FBQTs7QUFFRCxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUEsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNOztBQUU1QixDQUFBLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDOztBQUVyRyxDQUFBLENBQUMsQ0FBQTs7QUFFRCxDQUFBO0FBQ0EsQ0FBQSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDMUIsQ0FBQSxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQUFFN0IsQUFBcUI7O0FDbEdyQixPQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQTs7O0FBR3RDLE9BQU0sS0FBSyxHQUFHO0FBQ2QsQ0FBQSxJQUFJLElBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRTtBQUM3QyxDQUFBLElBQUksSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQzdDLENBQUEsQ0FBQyxDQUFBOztBQUVELEtBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0FBQzNCLEtBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBOztBQUU1QixLQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7QUFDYixLQUFJLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUE7QUFDMUIsS0FBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQTs7QUFFN0IsT0FBTSxLQUFLLEdBQUcsSUFBSSxDQUFBO0FBQ2xCLEFBR0EsQ0FBQSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRzs7QUFFM0MsQ0FBQSxJQUFJLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHOztBQUU5QyxDQUFBLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7O0FBRWpFLENBQUEsS0FBSzs7QUFFTCxDQUFBLENBQUM7OztBQUdELE9BQU0sWUFBWSxHQUFHLEdBQUcsR0FBRyxhQUFhLENBQUE7OztBQUd4QyxPQUFNLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxNQUFNOztBQUV2QyxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxLQUFLLEVBQUUsS0FBSyxHQUFHLE9BQU8sSUFBSSxHQUFHLFlBQVksR0FBRyxDQUFDLEVBQUUsQ0FBQTtBQUN2RSxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxLQUFLLEVBQUUsR0FBRyxJQUFJLEtBQUssR0FBRyxPQUFPLElBQUksR0FBRyxZQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUE7QUFDOUUsQ0FBQSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsT0FBTyxJQUFJLEdBQUcsWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFBO0FBQzdFLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEdBQUcsSUFBSSxLQUFLLEdBQUcsT0FBTyxJQUFJLEdBQUcsWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFBOztBQUV2RSxDQUFBLENBQUMsQ0FBQTs7O0FBR0QsT0FBTSxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNOztBQUVqQyxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFBO0FBQ3JDLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxLQUFLLEVBQUUsR0FBRyxJQUFJLEtBQUssR0FBRyxDQUFBO0FBQzVDLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssR0FBRyxDQUFBO0FBQzNDLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLElBQUksS0FBSyxHQUFHLENBQUE7O0FBRXJDLENBQUEsQ0FBQyxDQUFBOztBQUVELE9BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTTs7QUFFN0IsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHO0FBQ2YsQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxLQUFLLENBQUE7O0FBRUwsQ0FBQSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTs7QUFFYixDQUFBLElBQUksTUFBTSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHOztBQUV2QyxDQUFBLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTs7QUFFdEIsQ0FBQSxRQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVE7O0FBRXpDLENBQUEsUUFBUSxNQUFNLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUc7O0FBRTNDLENBQUEsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBOztBQUUxQixDQUFBLFlBQVksS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsUUFBUTs7QUFFN0MsQ0FBQSxZQUFZLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFBOztBQUUzRSxDQUFBLFlBQVksQ0FBQyxFQUFFLENBQUE7O0FBRWYsQ0FBQSxTQUFTOztBQUVULENBQUEsS0FBSzs7QUFFTCxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQTtBQUNuQyxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQTtBQUNuQyxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQTtBQUNuQyxDQUFBLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQTs7QUFFbkMsQ0FBQSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ25FLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNuRSxDQUFBLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbkUsQ0FBQSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBOztBQUVuRSxDQUFBLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUU7O0FBRXhELENBQUEsQ0FBQyxDQUFBOztBQUVELE9BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTTs7QUFFN0IsQ0FBQSxJQUFJLElBQUksSUFBSSxHQUFHO0FBQ2YsQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osQ0FBQSxLQUFLLENBQUE7O0FBRUwsQ0FBQSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTs7QUFFYixDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNsQixDQUFBLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs7QUFFbEIsQ0FBQSxJQUFJLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHOztBQUV4QyxDQUFBLFFBQVEsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUc7O0FBRTVDLENBQUEsWUFBWSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsUUFBUTs7QUFFbEUsQ0FBQSxZQUFZLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUE7O0FBRXZELENBQUEsWUFBWSxDQUFDLEVBQUUsQ0FBQTs7QUFFZixDQUFBLFNBQVM7O0FBRVQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFBO0FBQ25DLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFBO0FBQ25DLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFBO0FBQ25DLENBQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFBOztBQUVuQyxDQUFBLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbkUsQ0FBQSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ25FLENBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNuRSxDQUFBLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7O0FBRW5FLENBQUEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTs7QUFFeEQsQ0FBQSxDQUFDLENBQUE7OztBQUdELE9BQU0sT0FBTyxHQUFHLE1BQU07O0FBRXRCLENBQUEsSUFBSSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHOztBQUV2QyxDQUFBLFFBQVEsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRztBQUMzQyxDQUFBO0FBQ0EsQ0FBQSxZQUFZLElBQUksRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFBOztBQUUzRCxDQUFBLFNBQVM7O0FBRVQsQ0FBQSxLQUFLOztBQUVMLENBQUEsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtBQUNyQixDQUFBLElBQUksS0FBSyxHQUFHLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQTtBQUMxQixDQUFBLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUE7O0FBRTdCLENBQUEsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTTs7QUFFdkQsQ0FBQSxRQUFRLE9BQU8sS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTs7QUFFNUMsQ0FBQSxLQUFLLEVBQUUsQ0FBQTs7QUFFUCxDQUFBLENBQUMsQ0FBQTs7QUFFRCxPQUFNLE9BQU8sR0FBRyxNQUFNOztBQUV0QixDQUFBLElBQUksTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEdB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

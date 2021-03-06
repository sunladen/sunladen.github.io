(function () {
    'use strict';

    /*! canvas */

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

	        console.warn( 'Canvas "' + id + '" not found' );
	        return null

	    }

	    if ( width ) canvas.element.width = width;
	    if ( height ) canvas.element.height = height;

	    canvas.width  = canvas.element.width;
	    canvas.height = canvas.element.height;
	    canvas.ctx = canvas.element.getContext( '2d' );
	    canvas.imageData = canvas.ctx.getImageData( 0, 0, canvas.width, canvas.height );

	    canvas.buf = new ArrayBuffer( canvas.imageData.data.length );
	    canvas.buf8 = new Uint8ClampedArray( canvas.buf );
	    canvas.data = new Uint32Array( canvas.buf );

	    return canvas

    };

    /**
	 * Updates the display with the canvases image data
	 * @param {Canvas} canvas
	 */
    const updateImageData = canvas => {

	    canvas.imageData.data.set( canvas.buf8 );
	    canvas.ctx.putImageData( canvas.imageData, 0, 0 );

    };

    /**
	 * Sets the colours of each pixel to the uint32 returned by fn, than updates the display.
	 * @param {function} fn
	 */
    const paint = ( canvas, fn ) => {

	    let height = canvas.height;
	    let width = canvas.width;

	    for ( let y = 0; y < height; ++ y ) {

	        for ( let x = 0; x < width; ++ x ) {

	            canvas.data[ y * width + x ] = fn( x, y, width, height );

	        }

	    }

	    updateImageData( canvas );

    };

    /**
	 * Returns a Uint32 colour value from floats r, g, b in the range [0, 1]
	 * The colours alpha channel is set be opaque (i.e 1)
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @return {number}
	 */
    const rgb = ( r, g, b ) => {

	    return OPAQUE | ( ~~ ( b * 255.0 ) << 16 ) | ( ~~ ( g * 255.0 ) << 8 ) | ~~ ( r * 255.0 )

    };

    // Alpha constants
    const OPAQUE = 255 << 24;

    paint( Canvas( 'paint' ), ( x, y, width, height ) => {

	    return Math.random() > 0.95 ? rgb( 1, 1, 1 ) : rgb( 0.5, 0.5, 0.7 );

    } );

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJjYW52YXMuanMiLCJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBjYW52YXMgKi9cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEge0NhbnZhc30gcmVwcmVzZW50aW5nIHRoZSBjYW52YXMgaWRlbnRpZmllZCB3aXRoIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gKiBAcGFyYW0ge251bWJlcj99IHdpZHRoXHJcbiAqIEBwYXJhbSB7bnVtYmVyP30gaGVpZ2h0XHJcbiAqIEByZXR1cm4gYSB7Q2FudmFzfVxyXG4gKi9cclxuY29uc3QgQ2FudmFzID0gKCBpZCwgd2lkdGgsIGhlaWdodCApID0+IHtcclxuXHJcbiAgICBsZXQgY2FudmFzID0ge1xyXG4gICAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICggISBjYW52YXMuZWxlbWVudCApIHtcclxuXHJcbiAgICAgICAgY29uc29sZS53YXJuKCAnQ2FudmFzIFwiJyArIGlkICsgJ1wiIG5vdCBmb3VuZCcgKVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICggd2lkdGggKSBjYW52YXMuZWxlbWVudC53aWR0aCA9IHdpZHRoXHJcbiAgICBpZiAoIGhlaWdodCApIGNhbnZhcy5lbGVtZW50LmhlaWdodCA9IGhlaWdodFxyXG5cclxuICAgIGNhbnZhcy53aWR0aCAgPSBjYW52YXMuZWxlbWVudC53aWR0aFxyXG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5lbGVtZW50LmhlaWdodFxyXG4gICAgY2FudmFzLmN0eCA9IGNhbnZhcy5lbGVtZW50LmdldENvbnRleHQoICcyZCcgKVxyXG4gICAgY2FudmFzLmltYWdlRGF0YSA9IGNhbnZhcy5jdHguZ2V0SW1hZ2VEYXRhKCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQgKVxyXG5cclxuICAgIGNhbnZhcy5idWYgPSBuZXcgQXJyYXlCdWZmZXIoIGNhbnZhcy5pbWFnZURhdGEuZGF0YS5sZW5ndGggKVxyXG4gICAgY2FudmFzLmJ1ZjggPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoIGNhbnZhcy5idWYgKVxyXG4gICAgY2FudmFzLmRhdGEgPSBuZXcgVWludDMyQXJyYXkoIGNhbnZhcy5idWYgKVxyXG5cclxuICAgIHJldHVybiBjYW52YXNcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBkaXNwbGF5IHdpdGggdGhlIGNhbnZhc2VzIGltYWdlIGRhdGFcclxuICogQHBhcmFtIHtDYW52YXN9IGNhbnZhc1xyXG4gKi9cclxuY29uc3QgdXBkYXRlSW1hZ2VEYXRhID0gY2FudmFzID0+IHtcclxuXHJcbiAgICBjYW52YXMuaW1hZ2VEYXRhLmRhdGEuc2V0KCBjYW52YXMuYnVmOCApXHJcbiAgICBjYW52YXMuY3R4LnB1dEltYWdlRGF0YSggY2FudmFzLmltYWdlRGF0YSwgMCwgMCApXHJcblxyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgY29sb3VycyBvZiBlYWNoIHBpeGVsIHRvIHRoZSB1aW50MzIgcmV0dXJuZWQgYnkgZm4sIHRoYW4gdXBkYXRlcyB0aGUgZGlzcGxheS5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICovXHJcbmNvbnN0IHBhaW50ID0gKCBjYW52YXMsIGZuICkgPT4ge1xyXG5cclxuICAgIGxldCBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0XHJcbiAgICBsZXQgd2lkdGggPSBjYW52YXMud2lkdGhcclxuXHJcbiAgICBmb3IgKCBsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7ICsrIHkgKSB7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCB4ID0gMDsgeCA8IHdpZHRoOyArKyB4ICkge1xyXG5cclxuICAgICAgICAgICAgY2FudmFzLmRhdGFbIHkgKiB3aWR0aCArIHggXSA9IGZuKCB4LCB5LCB3aWR0aCwgaGVpZ2h0IClcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJbWFnZURhdGEoIGNhbnZhcyApXHJcblxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIFVpbnQzMiBjb2xvdXIgdmFsdWUgZnJvbSBmbG9hdHMgciwgZywgYiwgYSBpbiB0aGUgcmFuZ2UgWzAsIDFdXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBnXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhXHJcbiAqIEByZXR1cm4ge251bWJlcn1cclxuICovXHJcbmNvbnN0IHJnYmEgPSAoIHIsIGcsIGIsIGEgKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuICggfn4gKCBhICogMjU1LjAgKSA8PCAyNCApIHwgKCB+fiAoIGIgKiAyNTUuMCApIDw8IDE2ICkgfCAoIH5+ICggZyAqIDI1NS4wICkgPDwgOCApIHwgfn4gKCByICogMjU1LjAgKVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBVaW50MzIgY29sb3VyIHZhbHVlIGZyb20gZmxvYXRzIHIsIGcsIGIgaW4gdGhlIHJhbmdlIFswLCAxXVxyXG4gKiBUaGUgY29sb3VycyBhbHBoYSBjaGFubmVsIGlzIHNldCBiZSBvcGFxdWUgKGkuZSAxKVxyXG4gKiBAcGFyYW0ge251bWJlcn0gclxyXG4gKiBAcGFyYW0ge251bWJlcn0gZ1xyXG4gKiBAcGFyYW0ge251bWJlcn0gYlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAqL1xyXG5jb25zdCByZ2IgPSAoIHIsIGcsIGIgKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIE9QQVFVRSB8ICggfn4gKCBiICogMjU1LjAgKSA8PCAxNiApIHwgKCB+fiAoIGcgKiAyNTUuMCApIDw8IDggKSB8IH5+ICggciAqIDI1NS4wIClcclxuXHJcbn1cclxuXHJcbi8vIEFscGhhIGNvbnN0YW50c1xyXG5jb25zdCBPUEFRVUUgPSAyNTUgPDwgMjRcclxuY29uc3QgVFJBTlNQQVJFTlQgPSAwIDw8IDI0XHJcblxyXG5leHBvcnQgeyBDYW52YXMsIHVwZGF0ZUltYWdlRGF0YSwgcGFpbnQsIHJnYmEsIHJnYiwgT1BBUVVFLCBUUkFOU1BBUkVOVCB9XHJcbiIsImltcG9ydCAqIGFzIGNhbnZhcyBmcm9tIFwiLi9jYW52YXNcIlxyXG5cclxuXHJcbmNhbnZhcy5wYWludCggY2FudmFzLkNhbnZhcyggJ3BhaW50JyApLCAoIHgsIHksIHdpZHRoLCBoZWlnaHQgKSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjk1ID8gY2FudmFzLnJnYiggMSwgMSwgMSApIDogY2FudmFzLnJnYiggMC41LCAwLjUsIDAuNyApO1xyXG5cclxufSApXHJcbiJdLCJuYW1lcyI6WyJjYW52YXMucGFpbnQiLCJjYW52YXMuQ2FudmFzIiwiY2FudmFzLnJnYiJdLCJtYXBwaW5ncyI6Ijs7O0NBQUE7O0FBRUEsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLENBQUE7QUFDQSxDQUFBO0FBQ0EsQ0FBQTtBQUNBLE9BQU0sTUFBTSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU07O0FBRXhDLENBQUEsSUFBSSxJQUFJLE1BQU0sR0FBRztBQUNqQixDQUFBLFFBQVEsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFO0FBQzlDLENBQUEsS0FBSyxDQUFBO0FBQ0wsQ0FBQTtBQUNBLENBQUEsSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRzs7QUFFNUIsQ0FBQSxRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxhQUFhLEVBQUUsQ0FBQTtBQUN2RCxDQUFBLFFBQVEsT0FBTyxJQUFJOztBQUVuQixDQUFBLEtBQUs7O0FBRUwsQ0FBQSxJQUFJLEtBQUssS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtBQUM3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

( function () {

    'use strict';

    function animate( time ) {

        requestAnimationFrame( animate );

        _scene.update();

    }



    function scene( newscene ) {

        _scene.destroy();

        _scene = newscene;

        _scene.init();

    }






    let _scene = { update: () => {}, destroy: () => {} };


    animate( 0 );

    function Cell( x, y ) {

        let cell = {
            x: x,
            y: y,
            div: document.createElement( "div" )
        };

        cell.div.style.backgroundColor = "#eee";
        cell.div.style.border = "1px solid #ddd";
        document.body.appendChild( cell.div );

        return cell;

    }

    function copy( cell ) {

        let _cell = {
            x: cell.x,
            y: cell.y,
            div: cell.div
        };

        return _cell;

    }

    function generation( cell, generationInfo ) {

        let _cell = copy( cell );

        let shade = parseInt( ( generationInfo.iteration / 1000.0 ) * 255 );

        _cell.div.style.backgroundColor = "rgb( " + shade + ", " + shade + ", " + shade + " )";

        return _cell;

    }

    const world = {

        size: 50,
        cells: [],

        init: () => {

            world.cells = new Array( world.size * world.size );

            const CELL_SIZE = ( ( 1.0 / world.size ) * 100 ) + "%";

            for ( let y = 0; y < world.size; y ++ ) {

                for ( let x = 0; x < world.size; x ++ ) {

                    let cell = Cell( x, y );
                    world.cells[ y * world.size + x ] = cell;
                    cell.div.style.width = CELL_SIZE;
                    cell.div.style.height = CELL_SIZE;
                    cell.div.style.cssFloat = "left";

                }

            }

        },

        update: () => {

            let i = world.size * world.size;
            let cells = world.cells;
            let nextGeneration = [];

            generationInfo.iteration += 1;

            while ( i -- ) {

                nextGeneration[ i ] = generation( cells[ i ], generationInfo );

            }

            world.cells = nextGeneration;

        },

        destroy: () => {

        }

    };

    const generationInfo = {
        iteration: 0,
        elapsed: 0
    };

    scene( world );

}() );
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFzdC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC5qcyIsIi4uL3NyYy9jZWxsLmpzIiwiLi4vc3JjL3dvcmxkLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIGFuaW1hdGUoIHRpbWUgKSB7XHJcblxyXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSggYW5pbWF0ZSApXHJcblxyXG5cdF9zY2VuZS51cGRhdGUoKVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzY2VuZSggbmV3c2NlbmUgKSB7XHJcblxyXG5cdF9zY2VuZS5kZXN0cm95KClcclxuXHRcclxuXHRfc2NlbmUgPSBuZXdzY2VuZVxyXG5cclxuXHRfc2NlbmUuaW5pdCgpXHJcblxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGRhdGEoIG5hbWUsIHZhbHVlICkge1xyXG5cclxuXHRpZiAoIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcclxuXHJcblx0XHRkYXRhLnZhbHVlc1sgbmFtZSBdID0gdmFsdWVcclxuXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YS52YWx1ZXMuaGFzT3duUHJvcGVydHkoIG5hbWUgKSA/IGRhdGEudmFsdWVzWyBuYW1lIF0gOiBudWxsXHJcblxyXG59O1xyXG5cclxuXHJcbmRhdGEudmFsdWVzID0ge31cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGxpc3Rlbiggb2JqZWN0LCBldmVudCwgZm4sIGRlbGF5ICkge1xyXG5cclxuXHRsZXQgcm91dGVyXHJcblxyXG5cdGlmICggZGVsYXkgKSB7XHJcblxyXG5cdFx0KCBmdW5jdGlvbiAoIHRpbWVvdXQgKSB7XHJcblxyXG5cdFx0XHRyb3V0ZXIgPSBvYmplY3QgPT4ge1xyXG5cclxuXHRcdFx0XHR0aW1lb3V0IHx8ICggZm4oIG9iamVjdCApLCB0aW1lb3V0ID0gc2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRcdHRpbWVvdXQgPSBudWxsXHJcblxyXG5cdFx0XHRcdH0sIGRlbGF5ICkgKVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gKSgpXHJcblxyXG5cdH0gZWxzZSB7XHJcblxyXG5cdFx0cm91dGVyID0gb2JqZWN0ID0+IHtcclxuXHJcblx0XHRcdGZuKCBvYmplY3QgKVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRpZiAoIG9iamVjdCA9PT0gd2luZG93IHx8IG9iamVjdCA9PT0gZG9jdW1lbnQgfHwgb2JqZWN0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XHJcblxyXG5cdFx0b2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50LCByb3V0ZXIgKVxyXG5cclxuXHR9IGVsc2Uge1xyXG5cclxuXHRcdGlmICggISBsaXN0ZW4udXVpZHMuaGFzT3duUHJvcGVydHkoIGV2ZW50ICkgKSB7XHJcblxyXG5cdFx0XHRsaXN0ZW4udXVpZHNbIGV2ZW50IF0gPSB7fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoICEgb2JqZWN0Lmhhc093blByb3BlcnR5KCBcInV1aWRcIiApICkge1xyXG5cclxuXHRcdFx0b2JqZWN0LnV1aWQgPSBfTWF0aC5nZW5lcmF0ZVVVSUQoKVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoICEgbGlzdGVuLnV1aWRzWyBldmVudCBdLmhhc093blByb3BlcnR5KCBvYmplY3QudXVpZCApICkge1xyXG5cclxuXHRcdFx0bGlzdGVuLnV1aWRzWyBldmVudCBdWyBvYmplY3QudXVpZCBdID0gW11cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0bGlzdGVuLnV1aWRzWyBldmVudCBdWyBvYmplY3QudXVpZCBdLnB1c2goIHJvdXRlciApXHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG5saXN0ZW4udXVpZHMgPSB7fVxyXG5cclxuXHJcbmZ1bmN0aW9uIGFubm91bmNlKCBvYmplY3QsIGV2ZW50ICkge1xyXG5cclxuXHRpZiAoIG9iamVjdCA9PT0gd2luZG93IHx8IG9iamVjdCA9PT0gZG9jdW1lbnQgfHwgb2JqZWN0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XHJcblxyXG5cdFx0b2JqZWN0LmRpc3BhdGNoRXZlbnQoIG5ldyBFdmVudCggZXZlbnQgKSApXHJcblxyXG5cdH0gZWxzZSB7XHJcblxyXG5cdFx0aWYgKCBsaXN0ZW4udXVpZHMuaGFzT3duUHJvcGVydHkoIGV2ZW50ICkgJiYgbGlzdGVuLnV1aWRzWyBldmVudCBdLmhhc093blByb3BlcnR5KCBvYmplY3QudXVpZCApICkge1xyXG5cclxuXHRcdFx0Zm9yICggbGV0IGluZGV4ID0gMDsgaW5kZXggPCBsaXN0ZW4udXVpZHNbIGV2ZW50IF1bIG9iamVjdC51dWlkIF0ubGVuZ3RoOyBpbmRleCArKyApIHtcclxuXHJcblx0XHRcdFx0bGlzdGVuLnV1aWRzWyBldmVudCBdWyBvYmplY3QudXVpZCBdWyBpbmRleCBdKCBvYmplY3QgKVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbmxldCBfc2NlbmUgPSB7IHVwZGF0ZTogKCkgPT4ge30sIGRlc3Ryb3k6ICgpID0+IHt9IH1cclxuXHJcblxyXG5hbmltYXRlKCAwIClcclxuXHJcblxyXG5leHBvcnQgeyBzY2VuZSwgZGF0YSwgbGlzdGVuLCBhbm5vdW5jZSB9XHJcbiIsIlxyXG5mdW5jdGlvbiBDZWxsKCB4LCB5ICkge1xyXG5cclxuXHRsZXQgY2VsbCA9IHtcclxuXHRcdHg6IHgsXHJcblx0XHR5OiB5LFxyXG5cdFx0ZGl2OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiIClcclxuXHR9XHJcblxyXG5cdGNlbGwuZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2VlZVwiXHJcblx0Y2VsbC5kaXYuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI2RkZFwiXHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggY2VsbC5kaXYgKVxyXG5cclxuXHRyZXR1cm4gY2VsbFxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY29weSggY2VsbCApIHtcclxuICAgIFxyXG4gICAgbGV0IF9jZWxsID0ge1xyXG4gICAgICAgIHg6IGNlbGwueCxcclxuICAgICAgICB5OiBjZWxsLnksXHJcbiAgICAgICAgZGl2OiBjZWxsLmRpdlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gX2NlbGxcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRpb24oIGNlbGwsIGdlbmVyYXRpb25JbmZvICkge1xyXG5cclxuICAgIGxldCBfY2VsbCA9IGNvcHkoIGNlbGwgKVxyXG5cclxuICAgIGxldCBzaGFkZSA9IHBhcnNlSW50KCAoIGdlbmVyYXRpb25JbmZvLml0ZXJhdGlvbiAvIDEwMDAuMCApICogMjU1IClcclxuXHJcbiAgICBfY2VsbC5kaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoIFwiICsgc2hhZGUgKyBcIiwgXCIgKyBzaGFkZSArIFwiLCBcIiArIHNoYWRlICsgXCIgKVwiXHJcblxyXG4gICAgcmV0dXJuIF9jZWxsXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgQ2VsbCwgZ2VuZXJhdGlvbiB9XHJcbiIsImltcG9ydCB7IENlbGwsIGdlbmVyYXRpb24gfSBmcm9tIFwiLi9jZWxsXCJcclxuXHJcbmNvbnN0IHdvcmxkID0ge1xyXG5cclxuXHRzaXplOiA1MCxcclxuXHRjZWxsczogW10sXHJcblxyXG5cdGluaXQ6ICgpID0+IHtcclxuXHJcblx0XHR3b3JsZC5jZWxscyA9IG5ldyBBcnJheSggd29ybGQuc2l6ZSAqIHdvcmxkLnNpemUgKVxyXG5cclxuXHRcdGNvbnN0IENFTExfU0laRSA9ICggKCAxLjAgLyB3b3JsZC5zaXplICkgKiAxMDAgKSArIFwiJVwiXHJcblxyXG5cdFx0Zm9yICggbGV0IHkgPSAwOyB5IDwgd29ybGQuc2l6ZTsgeSsrICkge1xyXG5cdFx0XHRmb3IgKCBsZXQgeCA9IDA7IHggPCB3b3JsZC5zaXplOyB4KysgKSB7XHJcblx0XHRcdFx0bGV0IGNlbGwgPSBDZWxsKCB4LCB5IClcclxuXHRcdFx0XHR3b3JsZC5jZWxsc1sgeSAqIHdvcmxkLnNpemUgKyB4IF0gPSBjZWxsXHJcblx0XHRcdFx0Y2VsbC5kaXYuc3R5bGUud2lkdGggPSBDRUxMX1NJWkVcclxuXHRcdFx0XHRjZWxsLmRpdi5zdHlsZS5oZWlnaHQgPSBDRUxMX1NJWkVcclxuXHRcdFx0XHRjZWxsLmRpdi5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0dXBkYXRlOiAoKSA9PiB7XHJcblxyXG5cdFx0bGV0IGkgPSB3b3JsZC5zaXplICogd29ybGQuc2l6ZVxyXG5cdFx0bGV0IGNlbGxzID0gd29ybGQuY2VsbHNcclxuXHRcdGxldCBuZXh0R2VuZXJhdGlvbiA9IFtdXHJcblx0XHRcclxuXHRcdGdlbmVyYXRpb25JbmZvLml0ZXJhdGlvbiArPSAxXHJcblxyXG5cdFx0d2hpbGUgKCBpLS0gKSB7XHJcblx0XHRcdG5leHRHZW5lcmF0aW9uWyBpIF0gPSBnZW5lcmF0aW9uKCBjZWxsc1sgaSBdLCBnZW5lcmF0aW9uSW5mbyApXHJcblx0XHR9XHJcblxyXG5cdFx0d29ybGQuY2VsbHMgPSBuZXh0R2VuZXJhdGlvblxyXG5cclxuXHR9LFxyXG5cclxuXHRkZXN0cm95OiAoKSA9PiB7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IGdlbmVyYXRpb25JbmZvID0ge1xyXG5cdGl0ZXJhdGlvbjogMCxcclxuXHRlbGFwc2VkOiAwXHJcbn1cclxuXHJcbmV4cG9ydCB7IHdvcmxkIH1cclxuIiwiaW1wb3J0IHsgc2NlbmUgfSBmcm9tIFwiLi9hcHBcIlxyXG5pbXBvcnQgeyB3b3JsZCB9IGZyb20gXCIuL3dvcmxkXCJcclxuXHJcbnNjZW5lKCB3b3JsZCApXHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Q0FDQSxTQUFTLE9BQU8sRUFBRSxJQUFJLEdBQUc7O0FBRXpCLENBQUEsQ0FBQyxx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

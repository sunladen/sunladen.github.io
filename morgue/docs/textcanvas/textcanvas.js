export function TextCanvas() {

    const map = {

        width: 500,
        height: 500,

    };

    const view = {

        rows: 100,

    };

    function Display() {

        const display = [];

        display.canvas = document.createElement( 'canvas' );
        display.screen = display.canvas.getContext( '2d' );
        display.rect = display.canvas.getBoundingClientRect();

        display.buffer = document.createElement( 'canvas' );
        display.ctx = display.buffer.getContext( '2d' );

        fitToWindow( display );

        document.body.append( display.canvas );

        display.fontsize = display.canvas.height / view.rows;
        display.spacing = display.fontsize;
        console.log( display.spacing );

        display.cols = Math.ceil( display.canvas.width / display.spacing );
        display.rows = Math.ceil( display.canvas.height / display.spacing );
        display.centreCol = Math.floor( display.cols * 0.5 );
        display.centreRow = Math.floor( display.rows * 0.5 );
        display.mouseCol = display.centreCol;
        display.mouseRow = display.centreRow;

        display.ctx.font = ( display.canvas.height / view.rows ) + 'px monospace';
        display.ctx.textAlign = 'center';
        display.ctx.textBaseline = 'middle';

        document.addEventListener( 'mousemove', event => {

            var x = event.clientX;
            var y = event.clientY;

            x -= display.rect.left;
            y -= display.rect.top;
            x *= display.canvas.width / display.canvas.clientWidth;
            y *= display.canvas.height / display.canvas.clientHeight;

            if ( x < 0 || y < 0 || x >= display.canvas.width || y >= display.canvas.height ) return;

            display.mouseCol = Math.floor( x / display.spacing );
            display.mouseRow = Math.floor( y / display.spacing );

        } );

        return display;

    }

    function fitToWindow( display ) {

        display.canvas.ownerDocument.body.style.margin = '0';
        display.canvas.style.position = 'absolute';
        display.canvas.width = display.buffer.width = window.innerWidth;
        display.canvas.height = display.buffer.height = window.innerHeight;

    }

    class Colour {

        constructor( red = 1, green = 1, blue = 1, alpha = 1 ) {

            this.set( red, green, blue, alpha );

        }

        set( red = 1, green = 1, blue = 1, alpha = 1 ) {

            this.red = Math.max( 0, Math.min( 1, red ) );
            this.green = Math.max( 0, Math.min( 1, green ) );
            this.blue = Math.max( 0, Math.min( 1, blue ) );
            this.alpha = Math.max( 0, Math.min( 1, alpha ) );
            this.style = `rgba( ${Math.round( red * 255 )}, ${Math.round( green * 255 )}, ${Math.round( blue * 255 )}, ${Math.round( alpha * 255 )} )`;

        }

    }

    class Cell {

        constructor( col, row ) {

            this.col = col;
            this.row = row;
            this.things = [];
            this.fov = false;
            this.fow = true;
            this.light = new Colour( 0.5, 0.5, 0.5 );

        }

        addThing( thing ) {

            const index = this.things.indexOf( thing );

            if ( index === - 1 ) {

                this.things.push( thing );

            }

        }

        removeThing( thing ) {

            const index = this.things.indexOf( thing );

            if ( index > - 1 ) {

                this.things.splice( index, 1 );

            }

        }

        render( ctx ) {

            for ( var thing of this.things ) {

                thing.render( ctx, this.light );

            }

        }

    }

    const cells = {

        get: ( col, row ) => {

            return cells[ row * map.width + col ];

        }

    };

    const animate = {

        things: {},
        types: [],

        start: ( thing, type, duration, from, to ) => {

            if ( ! animate.things.hasOwnProperty( type ) ) animate.things[ type ] = [];

            var index = animate.types.indexOf( type );

            if ( index === - 1 ) animate.types.push( type );

            const things = animate.things[ type ];

            var index = things.indexOf( thing );

            if ( index > - 1 ) things.splice( index, 1 );

            if ( ! thing.animate ) thing.animate = {};

            const data = thing.animate[ type ] ? thing.animate[ type ] : thing.animate[ type ] = {};

            data.start = performance.now();
            data.duration = duration;
            data.from = from;
            data.to = to;

            things.push( thing );

        },

        stop: ( thing, type ) => {

            if ( ! animate.things.hasOwnProperty( type ) ) return;

            const things = animate.things[ type ];

            var index = things.indexOf( thing );

            if ( index > - 1 ) things.splice( index, 1 );

            if ( things.length === 0 ) {

                delete animate.things[ type ];

                index = animate.types.indexOf( type );

                if ( index > - 1 ) animate.types.splice( index, 1 );

            }

        },

        update: () => {

            for ( var type of animate.types ) {

                const things = animate.things[ type ];
                const time = performance.now();

                for ( var thing of things ) {

                    if ( ! thing.animate.hasOwnProperty( type ) ) {

                        animate.stop( thing, type );
                        continue;

                    }

                    const data = thing.animate[ type ];

                    var timeFraction = ( time - data.start ) / data.duration;
                    if ( timeFraction > 1 ) timeFraction = 1;
                    const progress = timeFunction( timeFraction );

                    thing[ type ]( progress, data.from, data.to );

                }

            }

            render();

            requestAnimationFrame( animate.update );

        },

    };

    requestAnimationFrame( animate.update );

    function timeFunction( timeFraction ) {

        return timeFraction;

    }

    class Character {

        constructor( char, foreground = new Colour(), background = new Colour( 0, 0, 0, 0 ), x = 0, y = 0 ) {

            this.char = char;
            this.foreground = foreground;
            this.background = background;
            this.x = x;
            this.y = y;

        }

    }

    class Thing {

        constructor( name, chars = [], col, row, x = 0, y = 0 ) {

            this.name = name;
            this.chars = [];
            this.col = Math.floor( col );
            this.row = Math.floor( row );
            this.x = col * display.spacing + x;
            this.y = row * display.spacing + y;

            this.animationData = {};

            for ( var char of chars ) this.addChar( char );

            cells.get( col, row ).addThing( this );

        }

        /**
		 * @param char
		 */
        addChar( char ) {

            this.chars.push( char );

        }

        move( dx, dy, duration = 0 ) {

            animate.start( this, 'animateMove', duration, { x: this.x, y: this.y }, { x: this.x + dx, y: this.y + dy } );

        }

        animateMove( progress, from, to ) {

            this.x = from.x + ( to.x - from.x ) * progress;
            this.y = from.y + ( to.y - from.y ) * progress;

            var col = Math.floor( this.x / display.spacing );
            var row = Math.floor( this.y / display.spacing );

            if ( col !== this.col || row !== this.row ) {

                cells.get( this.col, this.row ).removeThing( this );
                this.col = col;
                this.row = row;
                console.log( this.col, this.row );
                cells.get( this.col, this.row ).addThing( this );

            }

        }

        render( ctx, light ) {

            for ( var char of this.chars ) {

                ctx.fillStyle = char.foreground.style;
                ctx.globalAlpha = char.foreground.alpha;
                ctx.fillText( char.char, this.x + char.x, this.y + char.y );

            }

        }

    }

    const things = {

        createCursor: ( col, row ) => new Thing( 'cursor', [ new Character( '⬛', new Colour( .5, .5, 1, .5 ) ) ], col, row ),
        createVoid: ( col, row ) => new Thing( 'void', [ new Character( ' ', new Colour( 0, 0, 0 ) ) ], col, row ),
        createPC: ( col, row ) => new Thing( 'you', [ new Character( '@', new Colour( .96, .01, 1 ) ) ], col, row ),
        createCorpse: ( col, row ) => new Thing( 'corpse', [ new Character( '☠', new Colour( .78, .19, .16 ) ) ], col, row ),
        createGrass1: ( col, row ) => new Thing( 'tall grass', [ new Character( ';', new Colour( .18, .39, 0 ) ) ], col, row ),
        createGrass2: ( col, row ) => new Thing( 'short grass', [ new Character( "'", new Colour( .22, .39, 0 ) ) ], col, row ),
        createGrass3: ( col, row ) => new Thing( 'thick grass', [ new Character( '"', new Colour( .24, .39, 0 ) ) ], col, row ),
        createPaving: ( col, row ) => new Thing( 'paving', [ new Character( '⬛', new Colour( .16, 0.16, 0.16 ) ) ], col, row ),
        createWall: ( col, row ) => new Thing( 'wall', [ new Character( '#', new Colour( .64, .64, .64 ) ) ], col, row ),
        createWater: ( col, row ) => new Thing( 'water', [ new Character( '〜', new Colour( .47, .60, .92 ) ) ], col, row ),
        createTree1: ( col, row ) => new Thing( 'tree', [ new Character( '♠', new Colour( 0, .1, 0 ) ) ], col, row ),
        createTree2: ( col, row ) => new Thing( 'tree', [ new Character( '♣', new Colour( 0, .16, 0 ) ) ], col, row ),
        createRat: ( col, row ) => new Thing( 'rat', [ new Character( 'r', new Colour( .59, .59, .59 ) ) ], col, row ),
        createTiger: ( col, row ) => new Thing( 'tiger', [ new Character( 't', new Colour( .79, .79, 0 ) ) ], col, row ),
        createHealingPotion: ( col, row ) => new Thing( 'healing potion', [ new Character( '!', new Colour( 1, .24, .24 ) ) ], col, row ),

    };

    const display = Display();

    for ( var row = map.height; row --; ) {

        for ( var col = map.width; col --; ) {

            cells[ row * map.width + col ] = new Cell( col, row );

        }

    }

    for ( var row = map.height; row --; ) {

        for ( var col = map.width; col --; ) {

            const cell = cells[ row * map.width + col ];

            cell.north = row === 0 ? null : cells[ ( row - 1 ) * map.width + col ];
            cell.south = row === map.height ? null : cells[ ( row + 1 ) * map.width + col ];
            cell.west = col === 0 ? null : cells[ row * map.width + col - 1 ];
            cell.east = col === map.width ? null : cells[ row * map.width + col + 1 ];

            things.createWater( col, row );

        }

    }

    function render() {

        display.ctx.fillStyle = 'rgba( 255, 255, 255, 255 )';
        display.ctx.fillRect( 0, 0, window.innerWidth, window.innerHeight );

        var cols = Math.floor( display.canvas.width / display.spacing );

        for ( var row = view.rows; row --; ) {

            for ( var col = cols; col --; ) {

                cells[ row * map.width + col ].render( display.ctx );

            }

        }

        display.screen.drawImage( display.buffer, 0, 0 );

    }

    const cursor = things.createCursor( 15, 15 );

    const actions = {
        none: 0,
        skipturn: 1,
        moveto: { col: 0, row: 0 },
    };

    var update_count = 0;

    async function update() {

        update_count ++;
        await input();
        setTimeout( update, 0 );

    }

    setTimeout( update, 0 );

    function input() {

        return new Promise( resolve => {

            document.addEventListener( 'keydown', keydown );
            document.addEventListener( 'mousedown', mousedown );

            function mousedown( event ) {

                var action = actions.moveto;
                action.col = display.leftcol + display.mouseCol;
                action.row = display.toprow + display.mouseRow;
                resolved( action );

            }

            function keydown( event ) {

                if ( event.altKey || event.metaKey ) return;

                const key = event.key;

                var action = actions.none;

                if ( key === '.' ) {

                    action = actions.skipturn;

                } else if ( [ 'ArrowUp', 'k' ].indexOf( key ) > - 1 && cursor.row > 0 ) {

                    cursor.move( 0, - display.spacing );

                } else if ( [ 'ArrowDown', 'j' ].indexOf( key ) > - 1 && cursor.row < map.height ) {

                    cursor.move( 0, display.spacing );

                } else if ( [ 'ArrowRight', 'l' ].indexOf( key ) > - 1 && cursor.col < map.width ) {

                    cursor.move( display.spacing, 0 );

                } else if ( [ 'ArrowLeft', 'h' ].indexOf( key ) > - 1 && cursor.col > 0 ) {

                    cursor.move( - display.spacing, 0 );

                }

                resolved( action );

            }

            function resolved( action ) {

                var endturn = false;

                if ( action === actions.skipturn ) {

                    endturn = true;

                }

                if ( endturn ) {

                }

                document.removeEventListener( 'keydown', keydown );
                document.removeEventListener( 'mousedown', mousedown );

                resolve();

            }

        } );

    }

}


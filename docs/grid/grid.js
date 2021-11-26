const font = { name: "monospace", aspect: 0.6663 };

var columns = 5;
var rows;

font.widthVW = ( 100 / columns );
font.sizeVW = font.widthVW * ( 1 + font.aspect );


document.head.innerHTML += `<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
	body { overflow: hidden; font-family: ${font.name}; }
    .cell { display: flex; float: left; align-items: center; position: relative; font-size: ${font.sizeVW}vw; background: white; line-height: ${font.widthVW}vw; text-align: center; justify-content: center; }
    .glyph { position: absolute; display: inline-block; z-index: 1; margin: auto; text-align: center; text-baseline: middle; width: ${font.sizeVW}vw; }
</style>`;


const grid = [];

grid.cell = ( col, row ) => {

	var a = grid[ col ];
	if ( ! a ) a = grid[ col ] = [];
	var b = a[ row ];
	if ( ! b ) b = a[ row ] = [];
	b.col = col;
	b.row = row;
	return b;

};



function element( tagName, params, parent = document.body, content ) {

	const e = tagName.startsWith( 'svg:' ) ? document.createElementNS( 'http://www.w3.org/2000/svg', tagName ) : document.createElement( tagName );
	for ( var param in params ) {

		if ( param === 'style' ) for ( var style in params.style ) e.style[ style ] = params.style[ style ];
		else e.setAttribute( param, params[ param ] );

	}

	content && ( content instanceof Element ? e.append( content ) : e.innerHTML = content );
	parent && parent.append( e );
	return e;

}

function svg( parent, content ) {

	return element( 'svg:svg', { viewBox: '0 0 100 100' }, parent, content );
	//svg.setAttribute( 'viewBox', '0 0 100 100' );
	//return svg;

}

function circle( cx = '50', cy = '50', radius = '50', fill = 'black', parent ) {

	return element( 'svg:circle', { cx, cy, r: radius, fill }, parent );
	//circle.setAttribute( 'cx', cx );
	//circle.setAttribute( 'cy', cy );
	//circle.setAttribute( 'r', radius );
	//circle.setAttribute( 'fill', fill );
	//return circle;

}

function glyph( content = ' ', params ) {

	return element( 'div', Object.assign( { class: 'glyph' }, params ), document.body, content );

}

const cursor = glyph( '웃', { style: { color: 'green' } } );

grid.cell( 0, 0 ).push( cursor );

function updateRows() {

	rows = 1;

	for ( var i = 0; i < rows * columns; i ++ ) {

		if ( i >= cells.length ) cells.push( element( 'div', { class: 'cell' }, document.body ) ); //'•' ) );
		if ( i === 0 ) rows = Math.ceil( window.innerHeight / cells[ 0 ].getBoundingClientRect().height );

	}

}

updateRows();

window.addEventListener( 'resize', updateRows );


document.addEventListener( 'keydown', e => {

	const key = e.key;

	if ( key === 'j' ) pos( cursor, cursor.col, cursor.row + 1 );
	else if ( key === 'k' ) pos( cursor, cursor.col, cursor.row - 1 );
	else if ( key === 'h' ) pos( cursor, cursor.col - 1, cursor.row );
	else if ( key === 'l' ) pos( cursor, cursor.col + 1, cursor.row );

} );


const font = { name: "monospace", aspect: 0.6663 };
const cells = [];

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

function pos( glyph, col, row ) {

	if ( col < 0 || col >= columns || row < 0 || row >= rows ) return;

	const cell = cells[ ( row * columns ) + col ];

	//glyph.style.left = `${cell.offsetLeft}px`;
	//glyph.style.top = `${cell.offsetTop}px`;

	cell.append( glyph );

	glyph.col = col;
	glyph.row = row;

}

function updateRows() {

	rows = 1;
	for ( var i = 0; i < rows * columns; i ++ ) {

		if ( i >= cells.length ) {

			cells.push( element( 'div', { class: 'cell' }, document.body ) );
			const g = glyph( Math.random() < .5 ? '▢' : 'W', { style: { color: 'green' } } );
			pos( g, 0, 0 );

		}

		if ( i === 0 ) rows = Math.ceil( window.innerHeight / cells[ 0 ].getBoundingClientRect().height );

	}

}

updateRows();
window.addEventListener( 'resize', updateRows );

const cursor = glyph( '웃', { style: { color: 'green' } } );
pos( cursor, 0, 0 );

document.addEventListener( 'keydown', e => {

	const key = e.key;

	if ( key === 'j' ) pos( cursor, cursor.col, cursor.row + 1 );
	else if ( key === 'k' ) pos( cursor, cursor.col, cursor.row - 1 );
	else if ( key === 'h' ) pos( cursor, cursor.col - 1, cursor.row );
	else if ( key === 'l' ) pos( cursor, cursor.col + 1, cursor.row );

} );


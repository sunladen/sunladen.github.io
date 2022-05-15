export function timestamp( date = new Date() ) {

    return `0${date.getHours()}`.slice( - 2 ) + ':' + `0${date.getMinutes()}`.slice( - 2 );

}


export function E( tagName, className, content, parent ) {

    var div = document.createElement( tagName );
    if ( className ) div.className = className;
    if ( content != undefined ) content instanceof Element ? div.append( content ) : div.textContent = content;
    parent && parent.append( div );
    return div;

}

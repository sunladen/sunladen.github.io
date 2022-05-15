function E( tagName, id, className, contents ) {

    let element = document.createElement( tagName );
    if ( id ) element.id = id;
    if ( className ) element.className = className;
    if ( contents === undefined ) return element;

    if ( contents.constructor !== Array ) contents = [ contents ];

    for ( var i = 0; i < contents.length; i ++ ) {

        let content = contents[ i ];
        if ( content == undefined ) continue;
        content = ( content instanceof Element ) ? content : document.createTextNode( content );
        element.appendChild( content );

    }

    return element;

}


function query( xpath, context ) {

    return document.evaluate( xpath, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

}


function recursiveParentRefs( item, parent ) {

    if ( parent ) item.parent = parent;

    for ( let key in item.contents ) recursiveParentRefs( item.contents[ key ], item );

}

function updateCreateContentDivs( id, content, offscreen ) {

    let elementId = `${id}-dom`;
    let contentDiv = document.getElementById( elementId );

    if ( ! contentDiv ) {

        console.log( 'existing contentDiv not found' );

        contentDiv = E( 'div', elementId, null, [
            E( 'div', `${id}-outerplate`, 'tbl-outerplate', `outerplate: ${content.name}` ),
            E( 'div', `${id}-focusplate`, 'tbl-focusplate', `focusplate: ${content.name}` )
        ] );

        offscreen.append( contentDiv );

    }

    //query( `.//div[@id="${id}-outerplate"]`, contentDiv ).textContent = `outerplate: ${content.name}`;
    //query( `//div[@id="${id}-focusplate"]`, contentDiv ).textContent = `focusplate: ${content.name}`;

    //return contentDiv;

}




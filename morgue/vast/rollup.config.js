function glsl() {

    return {

        transform( code, id ) {

            if ( /\.glsl$/.test( id ) === false ) return;

            var transformedCode = 'export default ' + JSON.stringify(
                code
                    .replace( /[     ]*\/\/.*\n/g, '' ) // remove //
                    .replace( /[     ]*\/\*[\s\S]*?\*\//g, '' ) // remove /* */
                    .replace( /\n{2,}/g, '\n' ) // # \n+ to \n
            ) + ';';
            return {
                code: transformedCode,
                map: { mappings: '' }
            };

        }

    };

}

export default {
    entry: 'src/main.js',
    indent: '    ',
    sourceMap: 'inline',
    plugins: [
        glsl()
    ],
    dest: 'public/vast.js',
    format: 'iife'
};

import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

export default class Server {

    constructor( options ) {

        options = Object.assign( {
            publicPath: '../public',
            port: process.env.PORT || 7714
        }, options );

        this.httpServer = http.createServer( ( req, res ) => {

            if ( 'GET' !== req.method ) return;

            var filepath = options.publicPath + ( ( '/' === req.url ) ? '/index.html' : req.url );
            var responsecode = 200;
            var contenttype = MIME[ filepath.split( '.' ).pop().toLowerCase() ] || 'text/*';
            var content;

            try {

                content = fs.readFileSync( filepath, 'binary' );

            } catch ( err ) {

                contenttype = 'text/plain';
                responsecode = 'ENOENT' === err.code ? 404 : 500;
                content = `${responsecode}\n`;

            }

            res.writeHead( responsecode, { 'Content-Type': contenttype } );
            res.write( content, 'binary' );
            res.end();

        } );

        this.httpServer.listen( options.port, () => console.log( `Server started on ${process.env.PORT ? 'port ' + process.env.PORT : 'http://localhost:7714'}` ) );

        this.listeners = {};
        this.session_id = {};
        this.clients = {};
        this.broadcasts = {};

        this.wss = new WebSocketServer( { server: this.httpServer } );

        this.wss.on( 'connection', ( ws, req ) => {

            console.log( `connection -> ${req.url}` );

            if ( RE_SESSION.test( req.url ) ) {

                ws.session = RE_SESSION.exec( req.url )[ 1 ];
                this.session_id.hasOwnProperty( ws.session ) && ( this.clients[ ws.id = this.session_id[ ws.session ] ] = ws );

            }

            ws.id = ws.id ? ws.id : 'Guest-' + Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 );
            ws.last_heard = ( new Date() ).getTime();
            ws.on( 'pong', () => this.clients.hasOwnProperty( ws.id ) && ( this.clients[ ws.id ].last_heard = ( new Date() ).getTime() ) );
            ws.on( 'message', messages => {

                var encoded_messages = messages.buffer.slice( messages.byteOffset, messages.byteOffset + messages.byteLength );
                var decoded_messages = Codec.decode( encoded_messages );
                console.log( `← ${decoded_messages}${ws.id ? ' ← ' + ws.id : ''}` );
                if ( ! Array.isArray( decoded_messages ) ) return;
                for ( var message of decoded_messages ) this.emit( message.shift(), ws, ...message );

            } );

            if ( this.clients.hasOwnProperty( ws.id ) ) {

                console.log( `${ws.id} reconnected` );
                this.send( [ 'reconnected' ], ws.id );
                this.emit( 'reconnected', ws );

            } else {

                console.log( `${ws.id} connected` );
                this.session_id[ ws.session = Math.floor( ( 1 + Math.random() ) * 0x1000000000000000 ).toString( 16 ) ] = ws.id;
                this.clients[ ws.id ] = ws;
                this.send( [ 'connected', ws.id, ws.session ], ws.id );
                this.emit( 'connected', ws );

            }

        } );

        setInterval( () => {

            var expired = ( new Date() ).getTime() - ( CLIENT_PING_INTERVAL * 2 );

            for ( const id in this.clients ) {

                var ws = this.clients[ id ];

                if ( ws.last_heard >= expired ) {

                    ws.ping();
                    continue;

                }

                this.disconnect( id );

            }

        }, CLIENT_PING_INTERVAL );

        setInterval( () => {

            const _broadcasts = Object.assign( {}, this.broadcasts );

            this.broadcasts = {};

            const messages = _broadcasts.global || [];
            const encoded_messages = messages.length ? io.encode( messages ) : null;

            for ( const id in this.clients ) {

                var ws = this.clients[ id ];

                if ( _broadcasts.hasOwnProperty( id ) ) {

                    var _messages = _broadcasts[ id ].concat( messages );
                    var _encoded_messages = Codec.encode( _messages );
                    console.log( `→ ${_messages} → ${_encoded_messages}[${_encoded_messages.length}] → ${ws.id ? ws.id : ''}` );
                    ws.send( _encoded_messages );

                    continue;

                }

                if ( messages.length ) {

                    console.log( `→ ${messages} → ${encoded_messages}[${encoded_messages.length}] → ${ws.id ? ws.id : ''}` );
                    ws.send( encoded_messages );

                }

            }

        }, CLIENT_UPDATE_INTERVAL );

    }

    close() {

        const encoded_messages = Codec.encode( [[ 'say', 'Server shut down' ]] );
        this.wss.clients.forEach( ws => {

            ws.send( encoded_messages );
            ws.close();

        } );

    }

    disconnect( id ) {

        if ( ! this.clients.hasOwnProperty( id ) ) return;

        const ws = this.clients[ id ];

        delete this.clients[ id ];
        this.session_id.hasOwnProperty( ws.session ) && delete this.session_id[ ws.session ];

        console.log( `${id} disconnected` );
        this.send( [ 'disconnected', id ] );
        this.emit( 'disconnected', ws );

        ws.terminate();

    }

    on( type, callback ) {

        if ( ! this.listeners.hasOwnProperty( type ) ) this.listeners[ type ] = [];
        this.listeners[ type ].push( callback );

    }

    emit( type, ws, ...message ) {

        if ( ! this.listeners.hasOwnProperty( type ) ) return console.log( `← ${type},${message} ← ${ws.id ? ws.id : ''}` );
        for ( var listener of this.listeners[ type ] ) listener( ws, ...message );

    }

    send( message, target ) {

        ( this.broadcasts.hasOwnProperty( target ) ? this.broadcasts[ target ] : this.broadcasts[ target ] = [] ).push( message );

    }

    encode( value ) {

        return Codec.encode( value );

    }

}

const MIME = {
    html: 'text/html',
    js: 'text/javascript',
    mjs: 'text/javascript',
    css: 'text/css',
    json: 'application/json',
    jpeg: 'image/jpeg',
    jpg: 'image/jpg',
    png: 'image/png',
    svg: 'image/svg+xml',
    ogg: 'audio/ogg'
};

const CLIENT_PING_INTERVAL = 10000;
const CLIENT_UPDATE_INTERVAL = 2000;
const RE_SESSION = /[?&]{1}session=(\w+)/;

const Codec = {

    encode: value => {

        var type = typeof value;

        if ( value == null ) return Codec.createbuf( 1, 0 );

        if ( 'number' === type ) {

            var [ wholeStr, fracStr ] = String( Math.abs( value ) ).split( '.' );
            var whole = parseInt( wholeStr, 10 );
            var wholeLen = 255 >= whole ? 1 : 65535 >= whole ? 2 : 4294967295 >= whole ? 4 : 8;
            var frac = fracStr ? parseInt( fracStr, 10 ) : null;
            var fracLen = frac === null ? 0 : 255 >= frac ? 1 : 65535 >= frac ? 2 : 4294967295 >= frac ? 4 : 8;
            var buf = Codec.createbuf( wholeLen + 2 + fracLen, ( wholeLen + 1 ) * ( 0 <= value ? 1 : 2 ) );

            if ( 1 === wholeLen ) buf.view.setUint8( 1, whole );
            else if ( 2 === wholeLen ) buf.view.setUint16( 1, whole );
            else if ( 4 === wholeLen ) buf.view.setUint32( 1, whole );
            else buf.view.setBigUint64( 1, BigInt( whole ) );

            buf.view.setUint8( ++ wholeLen, fracLen );

            if ( 1 === fracLen ) buf.view.setUint8( ++ wholeLen, frac );
            else if ( 2 === fracLen ) buf.view.setUint16( ++ wholeLen, frac );
            else if ( 4 === fracLen ) buf.view.setUint32( ++ wholeLen, frac );
            else if ( 8 === fracLen ) buf.view.setBigUint64( ++ wholeLen, BigInt( frac ) );

            return buf;

        }

        if ( Array.isArray( value ) ) {

            var array = [],
                length = 0;

            value.forEach( item => {

                item = Codec.encode( item );
                array.push( item );
                length += item.length;

            } );

            var buf = Codec.createbuf( length + 3, 22 ),
                i = 3;

            buf.view.setUint16( 1, array.length );
            array.forEach( item => {

                buf.set( item, i );
                i += item.length;

            } );

            return buf;

        }

        var string_value = String( value );

        if ( '[object Object]' === string_value ) {

            var entries = Object.entries( value ),
                array = [],
                length = 0;

            entries.forEach( item => {

                var property = Codec.encode( item[ 0 ] );
                var val = Codec.encode( item[ 1 ] );
                array.push( [ property, val ] );
                length += property.length + val.length;

            } );

            var buf = Codec.createbuf( length + 3, 23 ), i = 3;

            buf.view.setUint16( 1, array.length );
            array.forEach( item => {

                var [ property, val ] = item;
                buf.set( property, i );
                i += property.length;
                buf.set( val, i );
                i += val.length;

            } );

            return buf;

        }

        var length = string_value.length;

        if ( 0 === length ) return Codec.createbuf( 1, 19 );

        if ( 1 === length )	{

            var buf = Codec.createbuf( 2, 20 );
            buf.view.setUint8( 1, string_value.charCodeAt( 0 ) );
            return buf;

        }

        length = string_value.length;

        var buf = Codec.createbuf( length + 3, 21 ), i = 3;

        buf.view.setUint16( 1, length );
        string_value.split( '' ).forEach( ch => buf.view.setUint8( i ++, ch.charCodeAt( 0 ) ) );

        return buf;

    },

    decode: arraybuffer => {

        var dataview = new DataView( arraybuffer, 0 );

        var uint8array = new Uint8Array( arraybuffer );

        'undefined' === typeof arraybuffer._offset && ( arraybuffer._offset = uint8array.byteOffset );

        var type = dataview.getUint8( arraybuffer._offset ++ );

        if ( 19 > type ) {

            if ( 0 === type ) return undefined;

            var value =
				type === 2 ? dataview.getUint8( arraybuffer._offset ++ ) :
				    type === 3 ? dataview.getUint16( arraybuffer._offset ) :
				        type === 4 ? - dataview.getUint8( arraybuffer._offset ++ ) :
				            type === 5 ? dataview.getUint32( arraybuffer._offset ) :
				                type === 6 ? - dataview.getUint16( arraybuffer._offset ) :
				                    type === 9 ? dataview.getBigUint64( arraybuffer._offset ) :
				                        type === 10 ? - dataview.getUint32( arraybuffer._offset ) :
				                            - dataview.getBigUint64( arraybuffer._offset );

            if ( type === 3 || type === 6 ) arraybuffer._offset += 2;
            else if ( type === 4 || type === 10 ) arraybuffer._offset += 4;
            else if ( type === 9 || type === 18 ) arraybuffer._offset += 8;

            var fracLen = dataview.getUint8( arraybuffer._offset ++ ),
                fracInt;

            if ( fracLen === 0 ) return value;

            var fracInt =
				fracLen === 1 ? dataview.getUint8( arraybuffer._offset ) :
				    fracLen === 2 ? dataview.getUint16( arraybuffer._offset ) :
				        fracLen === 4 ? dataview.getUint32( arraybuffer._offset ) :
				            dataview.getBigUint64( arraybuffer._offset );

            arraybuffer._offset += fracLen;

            return Number( `${value}.${fracInt}` );

        }

        if ( 19 === type ) return '';

        if ( 20 === type ) return String.fromCharCode( dataview.getUint8( arraybuffer._offset ++ ) );

        if ( 21 === type ) {

            var length = dataview.getUint16( arraybuffer._offset );
            arraybuffer._offset += 2;

            var i = arraybuffer._offset - uint8array.byteOffset;
            var value = String.fromCharCode.apply( null, uint8array.subarray( i, i + length ) );

            arraybuffer._offset += length;

            return value;

        }

        if ( 22 === type ) {

            var count = dataview.getUint16( arraybuffer._offset );
            arraybuffer._offset += 2;
            var value = [];
            for ( var i = 0; i < count; i ++ ) value.push( Codec.decode( arraybuffer ) );
            return value;

        }

        if ( 23 === type ) {

            var count = dataview.getUint16( arraybuffer._offset );
            arraybuffer._offset += 2;
            var value = {};
            for ( var i = 0; i < count; i ++ ) {

                var property = Codec.decode( arraybuffer );
                var val = Codec.decode( arraybuffer );
                value[ property ] = val;

            }

            return value;

        }

    },

    createbuf: ( length, type ) => {

        var buf = new Uint8Array( length );
        buf.view = new DataView( buf.buffer, 0 );
        buf.view.setUint8( 0, type );
        return buf;

    }

};


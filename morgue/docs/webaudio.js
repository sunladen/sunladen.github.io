class WebAudio {

    constructor( src ) {

        this.audioContext = new AudioContext();

        if ( src ) this.load( src );

    }

    load( src ) {

        if ( src ) this.src = src;

        var self = this;
        var xhr = new XMLHttpRequest();

        xhr.open( 'GET', this.src, true );
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {

            self.audioContext.decodeAudioData( xhr.response, function ( buffer ) {

                if ( ! buffer ) return self.onerror();

                self.buffer = buffer;

                self.onload( self );

            }, self.onerror );

        };

        xhr.send();

    }

    onerror( err ) {

        console.log( err );

    }

    onload( webaudio ) {
    }

    play() {

        // options = Object.assign( {
        // 	loop: false
        // }, options );

        var source = this.audioContext.createBufferSource();
        source.buffer = this.buffer;
        source.connect( this.audioContext.destination );

        //source.loop = options.loop;

        user_gesture ? source.start( 0 ) : pre_user_gesture_plays.push( source );

    }

}

var user_gesture = false;
const pre_user_gesture_plays = [];

document.addEventListener( 'mousedown', () => {

    user_gesture = true;

    while ( pre_user_gesture_plays.length ) {

        var source = pre_user_gesture_plays.shift();
        console.log( source );
        source.start( 0 );

    }

} );

export default WebAudio;

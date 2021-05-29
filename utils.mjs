const utils = {};

String.prototype.format = ( ...args ) => {

	var i = 0;

	return this.replace( /{}/g, () => {

		return typeof args[ i ] !== 'undefined' ? args[ i ++ ] : '';

	} );

};

export default utils;

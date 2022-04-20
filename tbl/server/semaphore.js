/**
 * A promise-based semaphore implementation suitable to be used with async/await.
 *
 * Based on Jan Söndermann's semaphore-async-await
 * https://github.com/jsoendermann/semaphore-async-await/blob/master/src/Semaphore.ts
 *
 * Lock example:
 * const lock = new Semaphore(1);
 *
 * async () => {
 *     await lock.acquire();
 *
 *     try {
 *         // here we have an exclusive lock
 *     } finally {
 *         lock.release();
 *     }
 * }
 */

export default class Semaphore {

	/**
	 * Creates a semaphore.
	 * @param permits  The number of permits allowed in parallel
	 */
	constructor( permits = 1 ) {

		this.permits = permits;
		this.promiseResolvers = [];

	}

	/**
	 * Returns a promise used to wait for a permit to become available. This method should be awaited on.
	 * @returns  A promise that gets resolved when execution is allowed to proceed.
	 */
	async wait() {

		if ( this.permits > 0 ) {

			this.permits -= 1;
			return Promise.resolve( true );

		}

		// If there is no permit available, we return a promise that resolves once the semaphore gets
		// signaled enough times that permits is equal to one.
		return new Promise( resolver => this.promiseResolvers.push( resolver ) );

	}

	/**
	 * Alias for Semaphore.wait.
	 * @returns  A promise that gets resolved when execution is allowed to proceed.
	 */
	async acquire() {

		return this.wait();

	}

	/**
	 * Increases the number of permits by one. If there are other functions waiting, one of them will
	 * continue to execute in a future iteration of the event loop.
	 */
	signal() {

		this.permits += 1;

		if ( this.permits > 1 && this.promiseResolvers.length > 0 ) {

			console.warn( "Semaphore.permits should never be > 0 when there is someone waiting." );

		} else if ( this.permits === 1 && this.promiseResolvers.length > 0 ) {

			// If there is someone else waiting, immediately consume the permit that was released
			// at the beginning of this function and let the waiting function resume.
			this.permits -= 1;

			const nextResolver = this.promiseResolvers.shift();
			if ( nextResolver ) {

				nextResolver( true );

			}

		}

	}

	/**
	 * Alias for Semaphore.signal.
	 */
	release() {

		this.signal();

	}

}


import { expect } from 'chai';

import SpotifyWrapper from '../src/index.js';

describe('Index Library', () => {
	it('should create a instance of SpotifyWrapper', () => {
		const spotify = new SpotifyWrapper({});
		expect(spotify).to.be.an.instanceof(SpotifyWrapper);
	});

	it('should receive apiURL as an option', () => {
		const spotify = new SpotifyWrapper({
			apiURL: 'test',
		});
		expect(spotify.apiURL).to.be.equal('test');
	});

	it('should use the default apiURL if no t provided', () => {
		const spotify = new SpotifyWrapper({});
		expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
	});

	it('should receive token as a option', () => {
		const spotify = new SpotifyWrapper({
			token: 'foo',
		});
		expect(spotify.token).to.be.equal('foo');
	});
});

import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index.js';

describe('SpotifyWrapper Library', () => {
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

  describe('Request Method', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should call fetch when request was call', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the right url', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });
    it('should call fetch with the right headers passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      const headers = {
        headers: {
          authorization: `Bearer foo`,
        },
      };

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });
  });
});

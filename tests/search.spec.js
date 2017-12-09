import chai from 'chai';
import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;
  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });
  describe('smoke tests', () => {
    it('should exist the searchAlbums method', () => {
      expect(spotify.search.albums).to.exist;
    });
    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });
    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });
    it('should exist the spotify.search.playLists method', () => {
      expect(spotify.search.playLists).to.exist;
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artist = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      );

      const artists2 = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      );
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=album'
      );

      const albums2 = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=album'
      );
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const track = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const track = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=track'
      );

      const track2 = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=track'
      );
    });
  });

  describe('spotify.search.playLists', () => {
    it('should call fetch function', () => {
      const playlist = spotify.search.playLists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const playlist = spotify.search.playLists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
      );

      const playlist2 = spotify.search.playLists('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
      );
    });
  });
});

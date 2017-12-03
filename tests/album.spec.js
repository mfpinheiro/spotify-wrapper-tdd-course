import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

describe('Album', () => {
  let stubedFetch;
  let promise;
  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smokes Tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbum method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy?market=ES');

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGT4');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGT4?market=ES');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'nome' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'nome' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '5aawyAB9vmqN3uQ7FjRGT4']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,5aawyAB9vmqN3uQ7FjRGT4?market=ES');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'nome' });
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '5aawyAB9vmqN3uQ7FjRGT4']);
      expect(albums.resolveValue).to.be.eql({ album: 'nome' });
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'nome' });
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(tracks.resolveValue).to.be.eql({ album: 'nome' });
    });
  });
});

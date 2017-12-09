import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smokes Tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'
      );

      const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGT4');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGT4'
      );
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'nome' });
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'nome' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.album.getAlbums([
        '4aawyAB9vmqN3uQ7FjRGTy',
        '5aawyAB9vmqN3uQ7FjRGT4',
      ]);
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,5aawyAB9vmqN3uQ7FjRGT4'
      );
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'nome' });
      const albums = spotify.album.getAlbums([
        '4aawyAB9vmqN3uQ7FjRGTy',
        '5aawyAB9vmqN3uQ7FjRGT4',
      ]);
      expect(albums.resolveValue).to.be.eql({ album: 'nome' });
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.album.getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks'
      );
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'nome' });
      const tracks = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(tracks.resolveValue).to.be.eql({ album: 'nome' });
    });
  });
});

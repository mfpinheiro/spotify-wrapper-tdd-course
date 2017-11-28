import { expect } from 'chai';
import { search } from '../src/main';
import { searchAlbums } from '../src/main';
import { searchArtists } from '../src/main';
import { searchTracks } from '../src/main';
import { searchPlaylists } from '../src/main';

describe('Spotify wrapper', () => {
  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });
    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should fetch function', () => {
      
    });
  });
});
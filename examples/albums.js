import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'GET TOKEN ON DEVELOPER.SPOTIFY.com',
});

global.fetch = require('node-fetch');

const albums = spotify.search.album('Incubus');

albums.then(data => console.log(data));

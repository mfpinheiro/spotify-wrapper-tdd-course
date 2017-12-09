import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'Request your token at https://developer.spotify.com/web-api/',
});

global.fetch = require('node-fetch');

const albums = spotify.search.albums('Incubus');

albums.then(data => console.log(data));



import { API_URL } from './config';
import toJSON from './utils';
import album from './album';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
    this.album = album.bind(this)();
  }
  request(url) {
    const headers = {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    };
    // fetch is global
    // eslint-disable-next-line
    return fetch(url, headers).then(toJSON);
  }
}

// import googleFeed from './google'
import axios from 'axios'

import flickrFeed from './flickr'
import soundcloudFeed from './soundcloud'
// import twitter from './twitter'

export default class Aggr {
  constructor() {
    const location = window.location.origin;
    this.url = location + '/server-utils/p/proxy.php';
  }
  aggrAll() {
    return this.checkCache().then(response => {
      if (response.data.length) {
        return response.data;
      }
      return Promise.all([flickrFeed, soundcloudFeed]).then(result => {
        const agr = [].concat(...result)
        // sort newest to oldest
        const json = agr.sort((a, b) => b.date.toString().localeCompare(a.date));

        console.log(json);
        this.writeCache(json);
        return json;
      })
    });
  }
  checkCache() {
    return axios({
      method: 'get',
      url: this.url
    });
  }
  // TODO: Make togelable when node server setup
  writeCache(json) {
    axios({
      method: 'post',
      url: this.url,
      data: json
    });
  }
}

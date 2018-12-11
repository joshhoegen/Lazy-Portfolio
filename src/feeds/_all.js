import googleFeed from './google'
import flickrFeed from './flickr'
import soundcloudFeed from './soundcloud'
// import twitter from './twitter'

export default class Aggr {
  constructor(opts) {

  }
  aggrAll() {
    return Promise.all([googleFeed, flickrFeed, soundcloudFeed]).then((result) => {
      let agr = [].concat(...result)
      // sort newest to oldest
      return agr.sort((a, b) => b.date.toString().localeCompare(a.date));
    })
  }
}

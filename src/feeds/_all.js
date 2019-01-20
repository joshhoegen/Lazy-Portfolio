import googleFeed from './google'
import flickrFeed from './flickr'
import soundcloudFeed from './soundcloud'
// import twitter from './twitter'

/* eslint-disable class-methods-use-this */
export default class Aggr {
  aggrAll() {
    return Promise.all([googleFeed, flickrFeed, soundcloudFeed]).then(result => {
      const agr = [].concat(...result)

      // sort newest to oldest
      return agr.sort((a, b) => b.date.toString().localeCompare(a.date))
    })
  }
}
/* eslint-enable class-methods-use-this */

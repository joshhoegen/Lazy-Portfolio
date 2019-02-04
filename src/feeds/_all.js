import axios from 'axios'

export default class Aggr {
  constructor(feeds, cacheName = 'default') {
    const location = window.location.origin

    this.feeds = feeds
    this.url = `${location}/server-utils/p/proxy.php?name=${cacheName}`
  }

  aggrAll() {
    return this.checkCache().then(response => {
      if (response.length) {
        return response
      }
      return Promise.all(this.feeds).then(result => {
        const agr = [].concat(...result)
        // sort newest to oldest
        const json = agr.sort((a, b) => b.date.toString().localeCompare(a.date))

        this.writeCache(json)
        return json
      })
    })
  }

  checkCache() {
    return axios({
      method: 'get',
      url: this.url,
    })
      .then(response => response.data)
      .catch(error => {
        console.log(error.response.data)
        return []
      })
  }

  // TODO: Make togelable when node server setup
  writeCache(json) {
    axios({
      method: 'post',
      url: this.url,
      data: json,
    })
  }
}

// import googleFeed from './google'
import axios from 'axios'

import github from './github'

export default class Aggr {
  constructor() {
    const location = window.location.origin
  }

  aggrAll() {
    return this.checkCache().then(response => {
      if (response.length) {
        return response
      }
      return Promise.all([github]).then(result => {
        const agr = [].concat(...result)
        // sort newest to oldest
        // const json = agr.sort((a, b) => b.date.toString().localeCompare(a.date))

        this.writeCache(agr)
        return agr
      })
    })
  }
  checkCache() {
    return axios({
        method: 'get',
        url: this.url
      }).then(response => {
        return response.data
      })
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
      data: json
    })
  }
}

// https://stackoverflow.com/questions/44852054/cant-cancel-axios-post-request-via-canceltoken

import axios from 'axios'
import db from 'whatever-storage'

const { CancelToken } = axios

export default class GetFeed {
  constructor(feedName, url) {
    this.source = CancelToken.source()
    this.feedName = feedName
    this.url = url
    this.feedService = axios.create({
      cancelToken: this.source.token,
      transformRequest: [
        // (data, headers)
        data => {
          const sessionData = db.session.getItem(this.feedName)

          if (sessionData) {
            this.source.cancel(sessionData)
          }

          return data
        },
      ],
    })
  }

  getFeed() {
    const cancel = GetFeed.handleCancel
    const feedPromise = this.feedService
      .get(this.url)
      .then(({ data }) => this.setSessionStorage({ data }))
      .catch(cancel)

    return feedPromise
  }

  setSessionStorage({ data }) {
    db.session.setItem(this.feedName, data)
    return data
  }

  static handleCancel(result) {
    if (axios.isCancel(result)) {
      return result.message
    }
    return result
  }
}

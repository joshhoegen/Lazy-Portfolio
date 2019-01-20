// https://connect.soundcloud.com/sdk/sdk-3.3.1.js

import GetFeed from '../utils/service'
import soundcloudConfig from '../assets/conf/soundcloud'

// const soundcloudConfig = new GetFeed('soundcloudConfig', '../assets/conf/soundcloud.json').getFeed()

// const data = soundcloudConfig
const soundcloudFeed = new GetFeed(
  'soundcloudFeed',
  `https://api.soundcloud.com/tracks?q=byutifu&order=created_at&format=json&client_id=${
    soundcloudConfig.client_id
  }`,
)
  .getFeed()
  .then(data => {
    let i = 0
    const normalizedOutput = []
    let date = ''
    let iframe = ''

    for (i; i < data.length; i += 1) {
      // SEE normalize() comment above for re-use in other feeds
      const d = data[i]

      iframe = `<iframe
        width="100%"
        height="300"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${
          d.id
        }&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
        </iframe>`

      date = new Date(d.created_at).getTime()
      normalizedOutput.push({
        title: d.title,
        date,
        embed_url: '',
        type: 'widget',
        site_url: d.uri,
        image_url: d.artwork_url,
        description: iframe,
      })
    }

    return normalizedOutput
  })

export default soundcloudFeed

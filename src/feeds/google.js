import GetFeed from '../utils/service'

const googleConfig = new GetFeed('googleConfig', '../assets/conf/google.json').getFeed()
const googleFeed = googleConfig
  .then(data => {
    return new GetFeed('googleData', 'https://www.googleapis.com/plus/v1/people/' +
      data.id + '/activities/public?maxResults=' +
      10 + '&key='+
      data.key).getFeed()
  }).then(data => {
    // Abstracting for potential DRYness between feeds
    let i = 0;
    let normalizedOutput = []
    let date = ''

    for (i; i < data.items.length; i++) {
      let item = data.items[i]
      // SEE normalize() comment above for re-use in other feeds
      date = new Date(item.published).getTime()
      let img = ''
      let attachments = item.object.attachments && item.object.attachments.length ? item.object.attachments : false;

      if (attachments && attachments[0].fullImage) {
        img = attachments[0].fullImage.url
      }

      normalizedOutput.push({
          'title': item.displayName,
          'date': date,
          'embed_url': '',
          'type': 'text',
          'site_url': item.url,
          'image_url': img,
          'description': item.object.content,
      })
    }

    return normalizedOutput
  })


export default googleFeed
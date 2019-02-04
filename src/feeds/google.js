import GetFeed from '../utils/service'
import makeTitle from '../utils/make-title'
import googleConfig from '../assets/conf/google'

const googleFeed = new GetFeed(
  'googleData',
  `https://www.googleapis.com/plus/v1/people/${
    googleConfig.id
  }/activities/public?maxResults=${10}&key=${googleConfig.key}`,
)
  .getFeed()
  .then(data => {
    // Abstracting for potential DRYness between feeds
    let i = 0
    const normalizedOutput = []
    let date = ''

    for (i; i < data.items.length; i += 1) {
      const item = data.items[i]
      let description = item.object.content
      const title = makeTitle(description)

      // SEE normalize() comment above for re-use in other feeds
      date = new Date(item.published).getTime()
      let img = ''
      const attachments =
        item.object.attachments && item.object.attachments.length ? item.object.attachments : false

      if (title !== null) {
        description = description.replace(title, '')
      }

      if (attachments && attachments[0].fullImage) {
        img = attachments[0].fullImage.url
      }

      normalizedOutput.push({
        title,
        date,
        embed_url: '',
        type: 'text',
        site_url: item.url,
        image_url: img,
        description,
      })
    }

    return normalizedOutput
  })
  .catch(e => {
    console.log(e)
    return []
  })

export default googleFeed

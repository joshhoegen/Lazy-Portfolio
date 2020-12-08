import GetFeed from '../utils/service'
import makeTitle from '../utils/make-title'

const location = window.location.origin

const flickrFeed = new GetFeed('twitterData', `${location}/server-utils/p/twitter.php`)
  .getFeed()
  .then(data => {
    let i = 0
    const normalizedOutput = []

    let date = ''

    for (i; i < data.length; i += 1) {
      // SEE normalize() comment above for re-use in other feeds
      const d = data[i]

      let description = d.full_text

      let img = ''
      const title = makeTitle(description)

      let type = 'text'

      if (title !== null) {
        description = description.replace(title, '')
      }

      if (d.entities.media) {
        img = d.entities.media[0].media_url_https
        type = 'image'
      }

      date = new Date(d.created_at).getTime()

      normalizedOutput.push({
        title,
        date,
        embed_url: '',
        type,
        site_url: `https://twitter.com/${d.user.screen_name}/status/${d.id}`,
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

export default flickrFeed

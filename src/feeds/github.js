import GetFeed from '../utils/service'
import makeTitle from '../utils/make-title'
import githubConfig from '../assets/conf/github'

const location = window.location.origin;

const flickrFeed = new GetFeed(
  'githubData',
  `https://api.github.com/users/${githubConfig.user.username}/events?type=owner&per_page=20&sort=created&direction=desc?page=1`,
)
  .getFeed()
  .then(data => {
    let i = 0
    const normalizedOutput = []
    let date = ''
    console.log(data);

    for (i; i < data.length; i += 1) {
      // SEE normalize() comment above for re-use in other feeds
      const d = data[i]

      date = new Date(d.created_at).getTime()
      normalizedOutput.push({
        title: d.repo.name,
        date,
        embed_url: d.repo.url,
        type: 'text',
        site_url: d.expanded_url,
        image_url: d.actor.avatar_url,
        description: d.type,
      })
    }

    return normalizedOutput
  }).catch( e => {
    console.log(e)
    return []
  })

export default flickrFeed

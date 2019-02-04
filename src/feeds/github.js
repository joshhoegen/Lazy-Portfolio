import GetFeed from '../utils/service'
import githubConfig from '../assets/conf/github'

const flickrFeed = new GetFeed(
  'githubData',
  `https://api.github.com/users/${
    githubConfig.user.username
  }/events?type=owner&per_page=30&sort=created&direction=desc?page=1`,
)
  .getFeed()
  .then(data => {
    const normalizedOutput = []
    const filter = ['PushEvent', 'CreateEvent']
    let i = 0
    let date = ''

    for (i; i < data.length; i += 1) {
      const d = data[i]
      // Believe it or not the fastest: https://stackoverflow.com/questions/2631001/test-for-existence-of-nested-javascript-object-key
      const message = (((d.payload || {}).commits || [])[0] || {}).message || '' // d.payload.commits[0].message

      if (filter.includes(d.type)) {
        // SEE normalize() comment above for re-use in other feeds
        date = new Date(d.created_at).getTime()
        normalizedOutput.push({
          title: d.repo.name.replace(`${d.actor.login}/`, ''),
          date,
          embed_url: d.repo.url,
          type: 'text',
          site_url: d.expanded_url,
          image_url: d.actor.avatar_url,
          description: `${d.type} - ${message}`,
        })
      }
    }

    return normalizedOutput
  })
  .catch(e => {
    console.log(e)
    return []
  })

export default flickrFeed

import GetFeed from '../utils/service'
import flickrConfig from '../assets/conf/flickr'

const flickrFeed = new GetFeed(
  'flickrData',
  `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${
    flickrConfig.access_token
  }&user_id=${flickrConfig.user.id}&format=json` +
    `&per_page=${10}&page=1&extras=date_upload,last_update&nojsoncallback=1`,
)
  .getFeed()
  .then(data => {
    let i = 0
    const normalizedOutput = []
    let date = ''
    const arr = data.photos

    for (i; i < arr.photo.length; i += 1) {
      // SEE normalize() comment above for re-use in other feeds
      const d = arr.photo[i]
      // Flickr removes last couple of zeros in timestamp

      date = new Date(parseInt(`${d.lastupdate}000`, 10)).getTime()
      normalizedOutput.push({
        title: d.title,
        date,
        embed_url: '',
        type: 'image',
        site_url: `https://farm${d.farm}.staticflickr.com/${d.server}/${d.id}_${d.secret}_c.jpg`,
        image_url: `https://farm${d.farm}.staticflickr.com/${d.server}/${d.id}_${d.secret}_c.jpg`,
        description: '',
      })
    }

    return normalizedOutput
  })
  .catch(e => {
    console.log(e)
    return []
  })

export default flickrFeed

import FeedService from './utils/service'

const instaConfig = new FeedService('../assets/conf/instagram.json')

const instaFeed = instaConfig.getFeed().then(res => {
  console.log(res)
  return new FeedService('https://api.instagram.com/v1/users/' + res.data.user.id + '/media/recent?access_token=' + res.data.access_token + '&count=' + (10) + '&callback=JSON_CALLBACK')
}).then(res => {
  console.log(res.getFeed())
})

import GetFeed from '../utils/service'
import twitterConfig from '../assets/conf/twitter'

// var Twit = require('twit')
//
// var T = new Twit({
//   consumer_key:         twitterConfig.consumer_key,
//   consumer_secret:      twitterConfig.consumer_secret,
//   access_token:         twitterConfig.access_token,
//   access_token_secret:  twitterConfig.access_token_secret,
//   timeout_ms:           10*1000,
// })

//statuses/user_timeline.json

const twitterFeed = T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }).getFeed().then(data => {
// 'https://twitter.com/joshhoegen1').getFeed().then(data => {
    // Abstracting for potential DRYness between feeds
    console.log(data);
    // let i = 0;
    // let normalizedOutput = []
    // let date = ''
    //
    // for (i; i < data.items.length; i++) {
    //   let item = data.items[i]
    //   // SEE normalize() comment above for re-use in other feeds
    //   date = new Date(item.published).getTime()
    //   let img = ''
    //   let attachments = item.object.attachments && item.object.attachments.length ? item.object.attachments : false;
    //
    //   if (attachments && attachments[0].fullImage) {
    //     img = attachments[0].fullImage.url
    //   }
    //
    //   normalizedOutput.push({
    //       'title': item.displayName,
    //       'date': date,
    //       'embed_url': '',
    //       'type': 'text',
    //       'site_url': item.url,
    //       'image_url': img,
    //       'description': item.object.content,
    //   })
    // }
    //
    // return normalizedOutput
  })


export default twitterFeed

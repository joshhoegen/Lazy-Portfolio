// const script = document.createElement('script')
// script.type = 'text/javascript';
// script.src = 'https://connect.soundcloud.com/sdk/sdk-3.3.1.js' // use this for linked script
// document.body.appendChild(script)
//
// const appendScript = new Promise((resolve, reject) => {
//   console.log('append');
//   if (script.readyState) { //IE
//     script.onreadystatechange = function() {
//       if (script.readyState === "loaded" || script.readyState === "complete") {
//         script.onreadystatechange = null
//         console.log('script.readyState === "loaded" || script.readyState === "complete"');
//         // return doFeed()
//       }
//     };
//   } else { //Others
//     console.log('else');
//     return script.onload = function() {
//       // return doFeed()
//     };
//   }
// })

// let sc = SC.initialize({
//   client_id: '0428cb036e5a7aff4e26a5ecfe8077dd' //data.client_id
// })

// return SC.get('/tracks', {
//   q: 'byutifu',
//   order: 'created_at'
// }).then(function(tracks) {
//   return tracks
// })

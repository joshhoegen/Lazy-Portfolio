import dom from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'
import Header from './components/header'
import GithubFeed from './components/github'

import Aggr from './feeds/_all'
// TODO set as const
import flickrFeed from './feeds/flickr'
import soundcloudFeed from './feeds/soundcloud'
import twitter from './feeds/twitter'
import github from './feeds/github'

import './assets/styles/app.scss'

const feedAggr = new Aggr([twitter, flickrFeed, soundcloudFeed])
const feedaggrRight = new Aggr([github], 'github')

class Feed extends JSXComponent {
  render({ date, description, image_url, site_url, title, type }) {
    return (
      <li className={`postLi ${type}`}>
        <div className="title-container">
          <Title {...{ title, type }} />
          <h3 className="date">{new Date(date).toLocaleDateString('en-US')}</h3>
        </div>
        <Image {...{ image_url, type, site_url }} />
        <Description {...{ description, type, site_url }} />
      </li>
    )
  }
}

class Title extends JSXComponent {
  render({ title, type }) {
    if (title && type === 'text') {
      return (
        <span>
          <i className="fa fa-star" aria-hidden="true" />
          <h3 dangerouslySetInnerHTML={{ __html: title }} />
        </span>
      )
    }
    if (title) {
      return <h3>{title}</h3>
    }

    return null
  }
}

class Image extends JSXComponent {
  render(data) {
    const { site_url, image_url, type } = data

    if (image_url && type !== 'widget') {
      return (
        <div>
          <img alt="null" src={image_url} />
          <div className="social-link">
            <a
              href={site_url}
              target="_blank"
              rel="noreferrer"
              title="See Josh Hoegen's art on social media!"
            >
              View on Flickr
            </a>
          </div>
        </div>
      )
    }

    return null
  }
}

class Description extends JSXComponent {
  render(data) {
    const { description, type, site_url } = data

    if (description) {
      if (type === 'text') {
        return (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: description }} />
            <div className="social-link">
              <a href={site_url} target="_blank" rel="noreferrer" title="View this tweet">
                View on Twitter
              </a>
            </div>
          </div>
        )
      }
      return <p dangerouslySetInnerHTML={{ __html: description }} />
    }

    return null
  }
}

document.querySelector('body').prepend(<Header />)

feedAggr.aggrAll().then(feedItems => {
  feedItems.map(item => document.querySelector('.aggr').appendChild(<Feed {...item} />))
})

feedaggrRight.aggrAll().then(feedItems => {
  if (Array.isArray(feedItems) && feedItems.length) {
    document.querySelector('.drawer').appendChild(<GithubFeed feedItems={feedItems} />)
  }
})

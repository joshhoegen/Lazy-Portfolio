import dom from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'
import Header from './components/header'

import Aggr from './feeds/_all'
// TODO set as const
import flickrFeed from './feeds/flickr'
import soundcloudFeed from './feeds/soundcloud'
import twitter from './feeds/twitter'
// import github from './feeds/github'

import './assets/styles/app.scss'

const feedAggr = new Aggr([twitter, flickrFeed, soundcloudFeed])
// const feedaggrRight = new Aggr([github], false)

class Feed extends JSXComponent {
  render({ date, description, image_url, title, type }) {
    return (
      <li className={`postLi ${type}`}>
        <div className="title-container">
          <Title {...{ title, type }} />
          <h3 className="date">{new Date(date).toLocaleDateString('en-US')}</h3>
        </div>
        <Image {...{ image_url, type }} />
        <Description {...{ description, type }} />
      </li>
    )
  }
}

class FeedLeft extends JSXComponent {
  render({ date, description, embed_url, title, type }) {
    return (
      <li className={`postLiRight ${type}`}>
        <a href={embed_url} className="title-container">
          <i className="fa fa-star" aria-hidden="true" />
          <span dangerouslySetInnerHTML={{ __html: title }} />|
          <span dangerouslySetInnerHTML={{ __html: description }} />|
          <span className="date">{new Date(date).toLocaleDateString('en-US')}</span>
        </a>
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
  render({ image_url, type }) {
    if (image_url && type !== 'widget') {
      return <img alt="null" src={image_url} />
    }

    return null
  }
}

class Description extends JSXComponent {
  render({ description, type }) {
    if (description) {
      if (type === 'text') {
        // <i className="fa fa-star" aria-hidden="true" />
        return (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: description }} />
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

// feedaggrRight.aggrAll().then(feedItems => {
//   feedItems.map(item => document.querySelector('.aggrRight').appendChild(<FeedLeft {...item} />))
// })

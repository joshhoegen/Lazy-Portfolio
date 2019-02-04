import dom from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'

/* eslint-disable react/no-danger */
class FeedLeftBody extends JSXComponent {
  render({ date, description, embed_url, title, type }) {
    return (
      <li className={`postLiRight ${type}`}>
        <a href={embed_url} className="title-container">
          <i className="fa fa-star" aria-hidden="true" />
          <span className="date">{new Date(date).toLocaleDateString('en-US')}</span>|
          <span dangerouslySetInnerHTML={{ __html: title }} />|
          <span className="description blue" dangerouslySetInnerHTML={{ __html: description }} />
        </a>
      </li>
    )
  }
}

class FeedLeftHeadline extends JSXComponent {
  render() {
    return (
      <h2 className="drawer-headline">
        <i className="fa fa-github" aria-hidden="true" /> Recent Github Activity
      </h2>
    )
  }
}

class GithubFeed extends JSXComponent {
  static drawerButtonClick(e) {
    const container = document.querySelector('.drawer-wrapper')
    const aggrContainer = document.querySelector('.view-container')

    e.target.classList.toggle('draw-margin')
    container.classList.toggle('show')
    aggrContainer.classList.toggle('drawer-margin')
  }

  render(props) {
    return (
      <div className="drawer-wrapper">
        <button className="drawer-button" ref={super.ref} onClick={GithubFeed.drawerButtonClick}>
          <i className="fa fa-github" />
        </button>
        <div className="drawer-container">
          <FeedLeftHeadline />
          <ul className="aggrRight">
            {Object.keys(props.feedItems).map(key => (
              <FeedLeftBody {...props.feedItems[key]} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default GithubFeed

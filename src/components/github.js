import dom from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'

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
      <h2 className="drawer-headline"><i className="fa fa-github" aria-hidden="true" /> Recent Github Activity</h2>
    )
  }
}

class GithubFeed extends JSXComponent {
  // constructor(props) {
  //   console.log(props);
  //   // this.feed = props.feedItems
  // }

  static drawerButtonClick(e) {
    console.log(e);
    console.log(document.querySelector('.drawer-container'));
    const container = document.querySelector('.drawer-container')
    const aggrContainer = document.querySelector('.view-container')

    e.target.classList.toggle('draw-margin')
    container.classList.toggle('show')
    aggrContainer.classList.toggle('drawer-margin')
  }

  render(props) {
    return (
      <div>
        <button className="drawer-button" ref={super.ref} onClick={GithubFeed.drawerButtonClick}>
          <i className="fa fa-github" />
        </button>
        <div class="drawer-container">
          <FeedLeftHeadline />
          <ul class="aggrRight">
            { Object.keys(props.feedItems).map(key => <FeedLeftBody {...props.feedItems[key]} />) }
          </ul>
        </div>
      </div>
    )
  }
}

export default GithubFeed

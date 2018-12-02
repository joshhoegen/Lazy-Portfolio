import dom, {Fragment} from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'

import GetFeed from '../utils/service'

class List extends JSXComponent {
  constructor(props) {
    super(props)
  }
  static output(pages) {
    return Object.keys(pages).map(key => {
      document.querySelector('#jh-nav ul.pages').appendChild(<Link {...pages[key]} />)
    })
  }
  render(props) {
    return new GetFeed('pages', '../../assets/conf/pages.json').getFeed().then(pages => {
      const d = pages.sort((a, b) => a.order.toString().localeCompare(b.order));
      // TODO: Ask Alex for preferred promise patters.
      // Returning in the promise wasn't working.
      const links = List.output(pages)
    })
  }
}


class Link extends JSXComponent {
  render(props) {
    return (
      <li class="pages-listing">
        <a href={props.url} target="_blank">
          <i class={`fa fa-${props.icon}`}></i>{props.title}
          <span>- {props.description}</span>
        </a>
      </li>
    )
  }
}

export default List

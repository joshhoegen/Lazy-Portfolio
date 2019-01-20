import dom from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'

import pages from '../assets/conf/pages'

class List extends JSXComponent {
  render() {
    const d = pages.sort((a, b) => a.order.toString().localeCompare(b.order))

    return Object.keys(d).map(key => <Link {...pages[key]} />)
  }
}

class Link extends JSXComponent {
  render(props) {
    return (
      <li className="pages-listing">
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          <i className={`fa fa-${props.icon}`} />
          {props.title}
          <span>- {props.description}</span>
        </a>
      </li>
    )
  }
}

export default List

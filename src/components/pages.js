import dom, {Fragment} from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'

import pages from '../assets/conf/pages'

class List extends JSXComponent {
  render(props) {
    const d = pages.sort((a, b) => a.order.toString().localeCompare(b.order));

    return Object.keys(d).map(key => {
      return (<Link {...pages[key]} />)
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

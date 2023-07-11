import { createSignal, onCleanup } from 'solid-js'
import { render } from 'solid-js/web'

import pages from '../config/pages'

const PagesTemplate = () => {
  const d = pages.sort((a, b) => a.order.toString().localeCompare(b.order))

  return Object.keys(d).map((key) => <PagesHTML {...pages[key]} />)
}

const PagesHTML = (props) => {
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

export default PagesTemplate

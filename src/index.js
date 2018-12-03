import dom, {Fragment} from 'jsx-render'
import JSXComponent from 'jsx-render/lib/JSXComponent'
import Header from './components/header'

import Aggr from './feeds/_all'

import './assets/styles/app.scss'

const feedAggr = new Aggr()

class Feed extends JSXComponent {
  constructor(props) {
    super(props)
  }
  render(props) {
    return (
      <li class={`postLi ${props.type}`}>
        <div class="title-container">
          <Title {...{title: props.title}}/>
          <h3 class="date">{new Date(props.date).toLocaleDateString('en-US')}</h3>
        </div>
        <Image {...{image_url: props.image_url, type: props.type}} />
        <Description {...{description: props.description, type: props.type}} />
      </li>
    )
  }
}

class Title extends JSXComponent {
  render(props) {
    if (props.title) {
      return (
        <h3>{props.title}</h3>
      )
    }
    return
  }
}

class Image extends JSXComponent {
  render(props) {
    if (props.image_url && props.type !== 'widget') {
      return (
        <img src={props.image_url}></img>
      )
    }
    return
  }
}

class Description extends JSXComponent {
  render(props) {
    if (props.description) {
      if (props.type === 'text') {
        return (
          <div>
            <i class="fa fa-star" aria-hidden="true"></i>
            <h3 dangerouslySetInnerHTML={{ __html:props.description}}></h3>
          </div>
        )
      }
      return (
        <p dangerouslySetInnerHTML={{ __html:props.description}}></p>
      )
    }
    return
  }
}

document.querySelector('body').prepend(
  <Header />
)

feedAggr.aggrAll().then((feedItems) => {
  feedItems.map((item, index) => {
    document.querySelector('.aggr').appendChild(
      <Feed {...item} ></Feed>
    )
  })
})

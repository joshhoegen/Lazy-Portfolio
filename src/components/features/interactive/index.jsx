import { createSignal, onCleanup, onMount } from 'solid-js'
import interactiveArt from './interactive.json'
import kaleidoscopeVideo from './media/kaleidoscope.gif'
import kaleidoscopeImage from './media/kaleidoscope.png'
import lightTrailsVideo from './media/light-trails.gif'
import lightTrailsImage from './media/light-trails.png'
import fractalsVideo from './media/fractals.gif'
import fractalsImage from './media/fractals.png'

const interactiveArtKeys = Object.keys(interactiveArt)

// TODO: I know, I know. So much to do; so little time
const videos = {
  kaleidoscope: kaleidoscopeVideo,
  'light-trails': lightTrailsVideo,
  fractals: fractalsVideo,
}

const images = {
  kaleidoscope: kaleidoscopeImage,
  'light-trails': lightTrailsImage,
  fractals: fractalsImage,
}

const ImageEl = (props) => {
  const [src, setSrc] = createSignal(props.img)

  const mouseOverHandler = () => {
    setSrc(props.video)
  }

  const mouseOutHandler = () => {
    setSrc(props.img)
  }

  return (
    <img
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      onClick={mouseOutHandler}
      src={src()}
      id={props.id}
      width="100%"
    />
  )
}

const InteractiveArt = () => {
  const projectLinks = []

  for (const key of interactiveArtKeys) {
    const feature = interactiveArt[key]
    projectLinks.push(
      <>
        <div class="feature-child">
          <a class="black-and-white" href={feature.href}>
            <ImageEl id={`video-${key}`} img={images[key]} video={videos[key]} width="100%" />

            <div class="title">{feature.title}</div>
          </a>
          <div class="description">{feature.description}</div>
        </div>
      </>,
    )
  }

  return (
    <>
      <h1 class="feature-h1">Interactive Art</h1>
      <div class="feature">{projectLinks}</div>
      <div class="long-text">
        <p>
          In 1999, I would have told ya computers were destroying art... music... all the things I
          love to create. While draining my soul in the designosphere, I saw my code-monkey
          co-workers making money and having fun making it. so, I learned to code... As an artist, I
          knew it was my responsibility to start creating with this newfound medium. Since taking on
          this responsibility, we've propelled into a Brave New World that can renders the universe
          digitally in 3D & AI-prompted generative art; so here I sit inbetween worlds... Trying to
          leverage Javascript's interactivity, while aiming to offer some eye & ear candy.
        </p>
        <p>- Josh</p>
      </div>
    </>
  )
}

export default InteractiveArt

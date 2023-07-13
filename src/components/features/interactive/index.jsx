import { createSignal, onCleanup, onMount } from 'solid-js'
import interactiveArt from './interactive.json'
import kaleidoscopeVideo from './media/kaleidoscope.gif'
import kaleidoscopeImage from './media/kaleidoscope.png'
import lightTrailsVideo from './media/light-trails.gif'
import lightTrailsImage from './media/light-trails.png'
import fractalsVideo from './media/fractals.gif'
import fractalsImage from './media/fractals.png'

const interactiveArtKeys = Object.keys(interactiveArt)

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
  const mouseOverHandler = (e) => {
    e.currentTarget.src = props.video
  }

  const mouseOutHandler = (e) => {
    e.currentTarget.src = props.img
  }
  
  return <img onmouseover={mouseOverHandler} onmouseout={mouseOutHandler} src={props.img} id={props.id} width="100%" />
}

const InteractiveArt = () => {
  // const playVideo = (e, key) => {
  //   const videoElement = e.currentTarget
  //   videoElement.src = 
  // }

  

  // const handleUserInteraction = () => {
  //   interactiveArtKeys.forEach((key) => {
  //     playVideo(key)
  //   })
  // }

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
      <p class="feature-p">
        Interactive art has captivated me the way it has many others. Once I learned how to code, I
        knew it was essential to my self-worth to start doing art with this newfound skill. I don't
        often create enough art with code, but you'll find new works as it's released here.
      </p>
    </>
  )
}

export default InteractiveArt

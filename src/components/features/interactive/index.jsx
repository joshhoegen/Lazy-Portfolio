import { createSignal, onCleanup, onMount } from 'solid-js'
import interactiveArt from './interactive.json'
import kaleidoscopeVideo from './media/kaleidoscope.mp4'
import lightTrailsVideo from './media/light-trails.mp4'
import fractalsVideo from './media/fractals.mp4'

const interactiveArtKeys = Object.keys(interactiveArt)

const videos = {
  kaleidoscope: kaleidoscopeVideo,
  'light-trails': lightTrailsVideo,
  fractals: fractalsVideo,
}

const InteractiveArt = () => {
  const playVideo = (key) => {
    const videoElement = document.getElementById(`video-${key}`)
    videoElement.play().catch((error) => {
      // Handle the play() promise rejection
      console.error('Failed to play video:', error)
    })
  }

  const pauseVideo = (key) => {
    const videoElement = document.getElementById(`video-${key}`)
    videoElement.pause()
    videoElement.currentTime = 0
  }

  onMount(() => {
    interactiveArtKeys.forEach((key) => {
      const videoElement = document.getElementById(`video-${key}`)
      videoElement.playbackRate = 0.5
      videoElement.addEventListener('mouseout', () => pauseVideo(key))
      videoElement.addEventListener('mouseover', () => playVideo(key))
    })

    // Wait for a user interaction event before triggering video playback
    document.addEventListener('click', handleUserInteraction)
  })

  onCleanup(() => {
    interactiveArtKeys.forEach((key) => {
      const videoElement = document.getElementById(`video-${key}`)
      videoElement.removeEventListener('mouseout', () => pauseVideo(key))
      videoElement.removeEventListener('mouseover', () => playVideo(key))
    })

    // Clean up the user interaction event listener
    document.removeEventListener('click', handleUserInteraction)
  })

  const handleUserInteraction = () => {
    interactiveArtKeys.forEach((key) => {
      playVideo(key)
    })
  }

  const projectLinks = []

  for (const key of interactiveArtKeys) {
    const feature = interactiveArt[key]
    projectLinks.push(
      <>
        <div class="feature-child">
          <a class="black-and-white" href={feature.href}>
            <video id={`video-${key}`} muted="true" src={videos[key]} width="100%" />

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

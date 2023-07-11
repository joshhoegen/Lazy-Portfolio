import { createSignal, onCleanup } from 'solid-js'
import { render } from 'solid-js/web'

import HeaderTemplate from './components/header.jsx'
import FeatureInteractiveArt from './components/features/interactive/index.jsx'

const App = () => {
  return (
    <>
      <HeaderTemplate></HeaderTemplate>
      <div id="jh-page">
        <FeatureInteractiveArt />
      </div>
    </>
  )
}

render(() => <App />, document.getElementById('content'))

// import { buildUi, updateControlsFromAddressBar, updateAddressBar } from './components/ui'
// // import { Worker } from 'worker_threads'; // This line is required only in Node.js. Remove it for browser environment.

// const { initialControls, initialToggles } = updateControlsFromAddressBar()
// const { sliders, checkboxes } = buildUi(initialControls, initialToggles)

// const asset = 'assets/images/lovers.png'

// const width43 = 1440
// const height43 = 960

// // const width43 = 2880
// // const height43 = 1920

// // Create a canvas element
// const canvas = document.createElement('canvas')
// canvas.id = 'fractal-canvas'
// const canvasTemp = document.createElement('canvas')
// const videoContainer = document.getElementById('video-container')
// videoContainer.appendChild(canvas)

// const bgCanvas = document.getElementById('background-canvas')
// const bgCtx = bgCanvas.getContext('2d')

// bgCanvas.width = window.innerWidth
// bgCanvas.height = window.innerHeight

// let animationId = null

// // Set the canvas width to match the window width
// canvas.width = window.innerWidth
// canvas.height = canvas.width

// canvasTemp.width = canvas.width
// canvasTemp.height = canvas.height

// function getAudioAnalyser(stream) {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)()

//   const source = audioContext.createMediaStreamSource(stream)

//   const analyser = audioContext.createAnalyser()
//   analyser.fftSize = 512 // 1024 // Adjust as needed

//   source.connect(analyser)

//   return analyser
// }
// let frameCounter = 0

// function createMask(ctx, canvas) {
//   const canvasWidth = 1200
//   const canvasHeight = 1200
//   // const canvasWidth = canvas.width
//   // const canvasHeight = canvas.height
//   ctx.beginPath()
//   ctx.moveTo(15, 15)
//   ctx.quadraticCurveTo(
//     canvasWidth / 2,
//     -(canvasHeight / 12),
//     canvasWidth / 2.5,
//     // holders
//     canvasHeight * 0.24,
//   )
//   ctx.quadraticCurveTo(
//     canvasWidth / 8 - 15,
//     // cuzx
//     canvasHeight / 2 - 15,
//     15,
//     15,
//   )

//   ctx.clip()

//   ctx.clearRect(0, 0, canvas.width, canvas.height)
// }

// function drawBlurredBackground(video, bgCanvas, bgCtx) {
//   // Update the background only once every 20 frames

//   // Draw the video frame to the background canvas
//   bgCtx.drawImage(video, 0, 0, bgCanvas.width / 2, bgCanvas.height / 2)

//   // Apply the blur filter
//   bgCtx.filter = 'blur(5px)' // You can adjust the blur radius to your liking

//   // Draw the scaled-up blurred image
//   bgCtx.drawImage(
//     bgCanvas,
//     0,
//     0,
//     bgCanvas.width / 2,
//     bgCanvas.height / 2,
//     0,
//     0,
//     bgCanvas.width,
//     bgCanvas.height,
//   )

//   // Clear the blur filter
//   bgCtx.filter = 'none'
// }

// async function start() {
//   const layerSpacing = {
//     value: 10,
//     range: [1, 10],
//     step: 1,
//   }

//   const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//   const analyser = getAudioAnalyser(stream)
//   const dataArray = new Uint8Array(analyser.frequencyBinCount)

//   const initializeWorker = () => {
//     const audioWorkerUrl = new URL('./workers/audio.js', import.meta.url)
//     const audioWorker = new Worker(audioWorkerUrl, { type: 'module' })

//     audioWorker.onmessage = (event) => {
//       layerSpacing.value = event.data
//       drawSpiral(initialControls)
//       animationId = requestAnimationFrame(drawWebcam)
//     }

//     return audioWorker
//   }

//   const initializeSpiralWorker = () => {
//     const spiralWorkerUrl = new URL('./workers/spiral.js', import.meta.url)
//     const spiralWorker = new Worker(spiralWorkerUrl, { type: 'module' })

//     spiralWorker.onmessage = (event) => {
//       const computedData = event.data

//       const cHeight = canvas.height
//       const cWidth = canvas.width

//       ctx.clearRect(0, 0, cWidth, cHeight)
//       ctxTemp.drawImage(video, 0, 0)

//       for (const data of computedData) {
//         ctx.save()
//         ctx.translate(data.x, data.y)
//         ctx.rotate(data.rotation)
//         ctx.drawImage(
//           canvasTemp,
//           -data.scaledWidth / 2,
//           -data.scaledHeight / 2,
//           data.scaledWidth,
//           data.scaledHeight,
//         )
//         ctx.restore()
//       }
//     }

//     return spiralWorker
//   }

//   const spiralWorker = initializeSpiralWorker()
//   const worker = initializeWorker()
//   const video = document.createElement('video')

//   video.muted = true
//   video.srcObject = stream
//   videoContainer.appendChild(video)
//   video.play()

//   const ctx = canvas.getContext('2d')
//   const ctxTemp = canvasTemp.getContext('2d')
//   createMask(ctxTemp, canvasTemp)

//   const drawWebcam = () => {
//     cancelAnimationFrame(animationId)

//     if (!!initialToggles.audio.value) {
//       // if (frameCounter % 3 !== 0) { // if (frameCounter % 2 === 0) {
//       //   analyser.getByteFrequencyData(dataArray)
//       //   worker.postMessage(dataArray)
//       // } else {
//       //   drawSpiral(initialControls)
//       //   animationId = requestAnimationFrame(drawWebcam)
//       // }
//       // analyser.getByteFrequencyData(dataArray)
//       // worker.postMessage(dataArray)
//       // drawSpiral(initialControls)
//       // animationId = requestAnimationFrame(drawWebcam)
//       if (frameCounter % 3 !== 0) {
//         // if (frameCounter % 2 === 0) {
//         analyser.getByteFrequencyData(dataArray)
//         worker.postMessage(dataArray)
//       }
//       drawSpiral(initialControls)
//       animationId = requestAnimationFrame(drawWebcam)
//     } else {
//       layerSpacing.value = 10
//       drawSpiral(initialControls)
//       animationId = requestAnimationFrame(drawWebcam)
//     }
//     if (frameCounter % 2 === 0) {
//       drawBlurredBackground(canvas, bgCanvas, bgCtx)
//     }
//     frameCounter < 1000 ? frameCounter++ : 0
//   }

//   const drawSpiral = (controls = initialControls) => {
//     const { numLayers, imageSize, angleAdjust, rotationAdjust } = controls

//     const videoWidth = video.videoWidth
//     const videoHeight = video.videoHeight
//     const cWidth = canvas.width
//     const cHeight = canvas.height

//     spiralWorker.postMessage({
//       numLayers: numLayers.value,
//       imageSize: imageSize.value,
//       angleAdjust: angleAdjust.value,
//       rotationAdjust: rotationAdjust.value,
//       layerSpacing: layerSpacing.value,
//       videoWidth,
//       videoHeight,
//       cWidth,
//       cHeight,
//     })
//   }

//   // Event listener for the "loadedmetadata" event of the video element
//   video.addEventListener('loadedmetadata', () => {
//     drawWebcam()
//   })

//   // TODO: Add slider/checkbox stuff stuff back to UI. Needed to debug something.
//   sliders.forEach((s) => {
//     s.addEventListener('input', (event) => {
//       const newValue = parseFloat(event.target.value)
//       if (initialControls[s.name].value !== newValue) {
//         initialControls[s.name].value = newValue
//         drawWebcam()
//         updateAddressBar({ ...initialControls })
//       }
//     })
//   })

//   checkboxes.forEach((c) => {
//     c.addEventListener('change', (event) => {
//       const newValue = event.target.checked
//       if (initialToggles[c.name].value !== newValue) {
//         initialToggles[c.name].value = newValue
//         drawWebcam()
//       }
//     })
//   })

//   // Adjust the canvas size when the window is resized
//   // window.addEventListener('resize', () => {
//   //   canvas.width = window.innerWidth
//   //   const canvasHeight = canvas.width / aspectRatio
//   //   canvas.height = canvasHeight
//   //   drawWebcam()
//   //   sliders.forEach((s) => {
//   //     s.removeEventListener('input')
//   //   })
//   //   checkboxes.forEach((c) => {
//   //     c.removeEventListener('input')
//   //   })
//   // })
// }

// document.addEventListener('DOMContentLoaded', () => {
//   start()
// })

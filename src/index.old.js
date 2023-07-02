// Create a canvas element
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const controlContainer = document.getElementById('controls')
controlContainer.style.position = 'absolute'
controlContainer.style.left = '20px'
controlContainer.style.bottom = '20px'
controlContainer.style.zIndex = 1

// Set the canvas width to match the window width
canvas.width = window.innerWidth

// Load the image
const image = new Image()
image.src = 'assets/images/jh-logo-150.png'
image.onload = () => {
  // Calculate the corresponding canvas height to maintain the image aspect ratio
  const aspectRatio = image.width / image.height
  const canvasHeight = canvas.width / aspectRatio
  canvas.height = canvasHeight
  // Set the position of the canvas using CSS
  canvas.style.position = 'absolute'
  canvas.style.left = '50%'
  canvas.style.top = '50%'
  canvas.style.transform = 'translate(-50%, -50%)'

  const ctx = canvas.getContext('2d')

  let initialControls = {
    imageSize: {
      value: 1.6,
      range: [0.1, 3],
      step: 0.1,
    },
    numLayers: {
      value: 1,
      range: [1, 10],
      step: 1,
    },
    layerSpacing: {
      value: 10,
      range: [1, 10],
      step: 1,
    },
  }

  const createSlider = (type, value = null, range = [0, 0], step = 1) => {
    const slider = document.createElement('input')
    slider.type = 'range'
    slider.min = range[0]
    slider.max = range[1]
    slider.step = step
    slider.value = String(value)

    controlContainer.appendChild(slider)

    slider.addEventListener('input', (event) => {
      console.log('DRAW', value)
      initialControls[type].value = parseFloat(event.target.value)
      drawSpiral(initialControls)
    })
  }

  const drawSpiral = (controls = initialControls) => {
    const { numLayers, layerSpacing, imageSize } = controls
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // Set the starting point for the spiral
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = numLayers.value; i > 0; i--) {
      const radius = i * layerSpacing.value
      let angle = 0
      const scaleFactor = Math.pow(imageSize.value, i)

      // Draw the logarithmic spiral for each layer
      while (radius < Math.max(canvas.width, canvas.height)) {
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        // Get the pixel color at the spiral point
        const pixelData = ctx.getImageData(x, y, 1, 1).data
        const red = pixelData[0]
        const green = pixelData[1]
        const blue = pixelData[2]

        // Calculate the scaled size of the image
        const scaledWidth = image.width / scaleFactor
        const scaledHeight = image.height / scaleFactor

        // Draw the image at the spiral point with reduced opacity
        // ctx.globalAlpha = 1 // Adjust this value to change the opacity of the layered effect
        ctx.drawImage(image, x - scaledWidth / 2, y - scaledHeight / 2, scaledWidth, scaledHeight)

        // Reset the global alpha value
        // ctx.globalAlpha = 1

        // Update the angle for the next spiral point
        angle += 0.3 // Adjust this value to change the tightness of the spiral
        radius *= 1.04 // Adjust this value to change the growth rate of the spiral
      }
    }
  }

  // Function to create the export button and handle its click event
  const createExportButton = () => {
    const exportButton = document.createElement('button')
    exportButton.textContent = 'Export Canvas'
    exportButton.style.position = 'absolute'
    exportButton.style.right = '20px' // Add the unit 'px'
    exportButton.style.bottom = '20px' // Add the unit 'px'
    exportButton.style.zIndex = 1
    document.body.appendChild(exportButton)

    exportButton.addEventListener('click', () => {
      const exportedCanvas = document.createElement('canvas')
      exportedCanvas.width = canvas.width * 2
      exportedCanvas.height = canvas.height * 2
      const exportedCtx = exportedCanvas.getContext('2d')
      exportedCtx.drawImage(canvas, 0, 0, exportedCanvas.width, exportedCanvas.height)

      const link = document.createElement('a')
      link.href = exportedCanvas.toDataURL('image/png')
      link.download = 'canvas_export.png'
      link.click()
    })
  }

  // Call the functions to create the slider and export button
  // createSlider()
  // createLayerSlider()
  // createSpacingSlider()
  createExportButton()
  for (const prop in initialControls) {
    const input = initialControls[prop]
    createSlider(prop, input.value, input.range, input.step)
    console.log(`${prop}: ${initialControls[prop]}`)
  }
  // Adjust the canvas size when the window is resized
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    const canvasHeight = canvas.width / aspectRatio
    canvas.height = canvasHeight
    drawSpiral(initialControls)
  })

  drawSpiral(initialControls)
}

// Create a new image element
const imageElement = document.createElement('img')
imageElement.src = 'assets/images/jh-logo-150.png'

// Set the position and size of the image using CSS
imageElement.style.position = 'absolute'
imageElement.style.left = '50%'
imageElement.style.top = '50%'
imageElement.style.transform = 'translate(-50%, -50%)'
imageElement.style.width = '200px' // Adjust the width as needed
imageElement.style.height = '200px' // Adjust the height as needed

// Append the image element to the document body
document.body.appendChild(imageElement)

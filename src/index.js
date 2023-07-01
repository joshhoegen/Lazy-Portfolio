



// Create a canvas element
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// Set the canvas width to match the window width
canvas.width = window.innerWidth;

// Load the image
const image = new Image();
image.src = 'assets/images/jh-logo-150.png';
image.onload = () => {
  // Calculate the corresponding canvas height to maintain the image aspect ratio
  const aspectRatio = image.width / image.height;
  const canvasHeight = canvas.width / aspectRatio;
  canvas.height = canvasHeight;
  // Set the position of the canvas using CSS
  canvas.style.position = 'absolute';
  canvas.style.left = '50%';
  canvas.style.top = '50%';
  canvas.style.transform = 'translate(-50%, -50%)';

  const ctx = canvas.getContext('2d');
  
  let initialImageSize = 1.6; // Adjust this value to control the initial image size
  let initialNumLayers = 1; 
  // Define the number of layers and spacing between them
  let initialLayerSpacing = 10;
  

  const drawSpiral = (imageSize, numLayers, layerSpacing) => {
    console.log(numLayers)
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Set the starting point for the spiral
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;



    for (let i = numLayers; i > 0; i--) {
      const radius = i * layerSpacing;
      let angle = 0;
      const scaleFactor = Math.pow(imageSize, i);

      // Draw the logarithmic spiral for each layer
      while (radius < Math.max(canvas.width, canvas.height)) {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Get the pixel color at the spiral point
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];

        // Calculate the scaled size of the image
        const scaledWidth = image.width / scaleFactor;
        const scaledHeight = image.height / scaleFactor;

        // Draw the image at the spiral point with reduced opacity
        ctx.globalAlpha = 1; // Adjust this value to change the opacity of the layered effect
        ctx.drawImage(image, x - scaledWidth / 2, y - scaledHeight / 2, scaledWidth, scaledHeight);

        // Reset the global alpha value
        ctx.globalAlpha = 1;

        // Update the angle for the next spiral point
        angle += 0.3; // Adjust this value to change the tightness of the spiral
        radius *= 1.04; // Adjust this value to change the growth rate of the spiral
      }
    }
  }

  // Function to create the slider and handle its input event
  const createLayerSlider = () => {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '1';
    slider.max = '10';
    slider.step = '1';
    slider.value = String(initialNumLayers);
    slider.style.position = 'absolute';
    slider.style.left = '200px';
    slider.style.bottom = '20px';
    slider.style.zIndex = 1
    document.body.appendChild(slider);

    slider.addEventListener('input', (event) => {
      console.log('DRAW', initialImageSize)
      initialNumLayers = parseFloat(event.target.value)
      drawSpiral(initialImageSize, initialNumLayers, initialLayerSpacing);
    });
  };

  // Function to create the slider and handle its input event
  const createSpacingSlider = () => {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '1';
    slider.max = '10';
    slider.step = '1';
    slider.value = String(initialLayerSpacing);
    slider.style.position = 'absolute';
    slider.style.left = '400px';
    slider.style.bottom = '20px';
    slider.style.zIndex = 1
    document.body.appendChild(slider);

    slider.addEventListener('input', (event) => {
      console.log('DRAW', initialLayerSpacing)
      initialLayerSpacing = parseFloat(event.target.value)
      drawSpiral(initialImageSize, initialNumLayers, initialLayerSpacing);
    });
  };

  // Function to create the slider and handle its input event
  const createSlider = () => {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '1';
    slider.max = '3';
    slider.step = '0.1';
    slider.value = String(initialImageSize);
    slider.style.position = 'absolute';
    slider.style.left = '20px';
    slider.style.bottom = '20px';
    slider.style.zIndex = 1
    document.body.appendChild(slider);

    slider.addEventListener('input', (event) => {
      console.log('DRAW', initialImageSize)
      initialImageSize = parseFloat(event.target.value);
      drawSpiral(initialImageSize, initialNumLayers, initialLayerSpacing);
    });
  };

  // Function to create the export button and handle its click event
  const createExportButton = () => {
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Canvas';
    exportButton.style.position = 'absolute';
    exportButton.style.right = '20px'; // Add the unit 'px'
    exportButton.style.bottom = '20px'; // Add the unit 'px'
    exportButton.style.zIndex = 1
    document.body.appendChild(exportButton);

    exportButton.addEventListener('click', () => {
      const exportedCanvas = document.createElement('canvas');
      exportedCanvas.width = canvas.width * 2;
      exportedCanvas.height = canvas.height * 2;
      const exportedCtx = exportedCanvas.getContext('2d');
      exportedCtx.drawImage(canvas, 0, 0, exportedCanvas.width, exportedCanvas.height);

      const link = document.createElement('a');
      link.href = exportedCanvas.toDataURL('image/png');
      link.download = 'canvas_export.png';
      link.click();
    });
  };

  // Call the functions to create the slider and export button
  createSlider();
  createLayerSlider();
  createSpacingSlider();
  createExportButton();
  drawSpiral(initialImageSize, initialNumLayers, initialLayerSpacing)
};

// Create a new image element
const imageElement = document.createElement('img');
imageElement.src = 'assets/images/jh-logo-150.png';

// Set the position and size of the image using CSS
imageElement.style.position = 'absolute';
imageElement.style.left = '50%';
imageElement.style.top = '50%';
imageElement.style.transform = 'translate(-50%, -50%)';
imageElement.style.width = '200px'; // Adjust the width as needed
imageElement.style.height = '200px'; // Adjust the height as needed



// Append the image element to the document body
document.body.appendChild(imageElement);



// Adjust the canvas size when the window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  const canvasHeight = canvas.width / aspectRatio;
  canvas.height = canvasHeight;
});

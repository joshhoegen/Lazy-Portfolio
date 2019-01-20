// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/register')({
    presets: [ '@babel/preset-env' ]
})

require.extensions['.scss'] = () => {
  return;
}

require.extensions['.css'] = () => {
  return;
}

// Import the rest of our application.
module.exports = require('./server.js')

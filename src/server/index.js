const express = require('express')
const path = require('path')

const app = express()
const DIST_DIR = `${__dirname}`
const HTML_FILE = path.join(DIST_DIR, '../../', 'dist/index.html')
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(DIST_DIR, '../../dist')))
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})

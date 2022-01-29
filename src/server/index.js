const express = require('express')
const path = require('path')

const app = express()
const DIST_DIR = `${__dirname}`
const HTML_FILE = path.join(DIST_DIR, '../../', 'dist/index.html')
const port = process.env.PORT || 8080

app.use(express.static(path.join(DIST_DIR, '../../dist')))
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})

// import path from 'path'
// import express from 'express'

// const app = express(),
//   DIST_DIR = __dirname,
//   HTML_FILE = path.join(DIST_DIR, 'index.html')

// app.use(express.static(DIST_DIR))

// app.get('*', (req, res) => {
//   res.sendFile(HTML_FILE)
// })

// const PORT = process.env.PORT || 8080
// app.listen(PORT, () => {
//   console.log(`App listening to ${PORT}....`)
//   console.log('Press Ctrl+C to quit.')
// })

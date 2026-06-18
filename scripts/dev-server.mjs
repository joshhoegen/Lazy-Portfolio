import http from 'node:http'
import net from 'node:net'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

const PUBLIC_PORT = Number(process.env.PORT || 1111)
const PARCEL_PORT = Number(process.env.PARCEL_PORT || 1112)
const PARCEL_HOST = '127.0.0.1'

const VIDEO_FRACTALS_ROOT = path.resolve('..', 'video-fractals')
const localPageBuilds = new Map([
  ['kaleidoscope', path.join(VIDEO_FRACTALS_ROOT, 'distKaleidoscope')],
  ['fractals', path.join(VIDEO_FRACTALS_ROOT, 'distFractals')],
  ['portal', path.join(VIDEO_FRACTALS_ROOT, 'distPortal')],
  ['trails', path.join(VIDEO_FRACTALS_ROOT, 'distTrails')],
])

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.mp4', 'video/mp4'],
  ['.webm', 'video/webm'],
])

const parcel = spawn(
  'npx',
  ['parcel', 'src/index.html', '--port', String(PARCEL_PORT), '--host', PARCEL_HOST],
  {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
)

const writeJson = (response, data) => {
  response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
  response.end(`${JSON.stringify(data, null, 2)}\n`)
}

const rewriteLocalPageHtml = (html, pageName) => {
  const pageRoot = `/pages/${pageName}`

  return html
    .replace(/\b(src|href|action|poster)=["']\/([^"']+)["']/gi, (match, attribute, assetPath) => {
      return `${attribute}="${pageRoot}/${assetPath}"`
    })
    .replace(/url\((['"]?)\/([^'")]+)\1\)/gi, (match, quote, assetPath) => {
      return `url(${quote}${pageRoot}/${assetPath}${quote})`
    })
}

const disableParcelHmr = (javascript) => {
  return javascript.replace(
    /if \(\(!parent \|\| !parent\.isParcelRequire\) && typeof WebSocket !== "undefined"\) \{/g,
    'if ((!parent || !parent.isParcelRequire) && false) {',
  )
}

const getLocalPageRequest = (requestUrl = '/') => {
  const url = new URL(requestUrl, `http://localhost:${PUBLIC_PORT}`)
  const match = url.pathname.match(/^\/pages\/([^/]+)(?:\/(.*))?$/)

  if (!match) return null

  const [, pageName, assetPath = ''] = match
  const buildDir = localPageBuilds.get(pageName)

  if (!buildDir) return null

  return {
    pageName,
    buildDir,
    assetPath: assetPath || 'index.html',
  }
}

const serveLocalPageRequest = (pageRequest, response) => {
  const requestedPath = path.normalize(pageRequest.assetPath)

  if (requestedPath.startsWith('..') || path.isAbsolute(requestedPath)) {
    response.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Invalid local page asset path.\n')
    return
  }

  const filePath = path.join(pageRequest.buildDir, requestedPath)

  if (!filePath.startsWith(pageRequest.buildDir)) {
    response.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Invalid local page asset path.\n')
    return
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Local page asset not found.\n')
    return
  }

  const extension = path.extname(filePath)
  const contentType = contentTypes.get(extension) || 'application/octet-stream'

  if (extension === '.html') {
    const html = fs.readFileSync(filePath, 'utf8')
    response.writeHead(200, { 'content-type': contentType })
    response.end(rewriteLocalPageHtml(html, pageRequest.pageName))
    return
  }

  if (extension === '.js') {
    const javascript = fs.readFileSync(filePath, 'utf8')
    response.writeHead(200, { 'content-type': contentType })
    response.end(disableParcelHmr(javascript))
    return
  }

  response.writeHead(200, { 'content-type': contentType })
  fs.createReadStream(filePath).pipe(response)
}

const missingLocalPageBuilds = () =>
  [...localPageBuilds.entries()]
    .filter(([, buildDir]) => !fs.existsSync(path.join(buildDir, 'index.html')))
    .map(([pageName]) => pageName)

const proxyHttpRequest = (clientRequest, clientResponse) => {
  const proxyRequest = http.request(
    {
      hostname: PARCEL_HOST,
      port: PARCEL_PORT,
      path: clientRequest.url,
      method: clientRequest.method,
      headers: clientRequest.headers,
    },
    (proxyResponse) => {
      clientResponse.writeHead(proxyResponse.statusCode || 502, proxyResponse.headers)
      proxyResponse.pipe(clientResponse)
    },
  )

  proxyRequest.on('error', () => {
    clientResponse.writeHead(502, { 'content-type': 'text/plain; charset=utf-8' })
    clientResponse.end('Parcel dev server is not ready yet. Refresh in a moment.\n')
  })

  clientRequest.pipe(proxyRequest)
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://localhost:${PUBLIC_PORT}`)
  const localPageRequest = getLocalPageRequest(request.url)

  console.log(`${request.method} ${request.url}`)

  if (request.url === '/__proxy-check') {
    writeJson(response, {
      ok: true,
      server: 'lazy-portfolio dev wrapper',
      port: PUBLIC_PORT,
      localPageBuilds: Object.fromEntries(localPageBuilds),
      missingLocalPageBuilds: missingLocalPageBuilds(),
    })
    return
  }

  if (localPageRequest && requestUrl.searchParams.has('__debug')) {
    writeJson(response, {
      ok: true,
      route: request.url,
      localBuildDir: localPageRequest.buildDir,
      localAssetPath: localPageRequest.assetPath,
    })
    return
  }

  if (localPageRequest) {
    console.log(`Serving local page ${request.url} -> ${localPageRequest.buildDir}`)
    response.setHeader('x-lazy-portfolio-dev-proxy', 'local-page')
    serveLocalPageRequest(localPageRequest, response)
    return
  }

  proxyHttpRequest(request, response)
})

server.on('upgrade', (request, socket, head) => {
  const proxySocket = net.connect(PARCEL_PORT, PARCEL_HOST, () => {
    proxySocket.write(
      `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n` +
        Object.entries(request.headers)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\r\n') +
        '\r\n\r\n',
    )
    proxySocket.write(head)
    proxySocket.pipe(socket)
    socket.pipe(proxySocket)
  })

  proxySocket.on('error', () => {
    socket.destroy()
  })
})

const shutdown = () => {
  server.close()
  parcel.kill()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
parcel.on('exit', (code) => {
  server.close(() => process.exit(code ?? 0))
})

server.listen(PUBLIC_PORT, '127.0.0.1', () => {
  const missingBuilds = missingLocalPageBuilds()

  console.log(`Local dev server: http://localhost:${PUBLIC_PORT}`)
  console.log(`Parcel is running behind it on http://${PARCEL_HOST}:${PARCEL_PORT}`)
  console.log(`Local video-fractals root: ${VIDEO_FRACTALS_ROOT}`)
  console.log(
    missingBuilds.length
      ? `Missing local page builds: ${missingBuilds.join(', ')}`
      : 'Local page builds: ok',
  )
})

var test = require('tape')
var createManifest = require('../')

test('check basic appcache functionality', function (t) {
  var manifest = createManifest({version: 123})

  manifest.cache('/')
  manifest.cache('/some/image.png')
  manifest.fallback('/somepath.html /somefallback.html')

  var expected = [
    'CACHE MANIFEST',
    '# version: 123',
    '',
    'CACHE:',
    '/',
    '/some/image.png',
    '',
    'NETWORK:',
    '*',
    '',
    'FALLBACK:',
    '/somepath.html /somefallback.html'
  ].join('\n')

  t.equal(manifest.toAppCache(), expected)
  t.end()
})

test('turn off allowOtherPaths default', function (t) {
  var manifest = createManifest({
    version: 123,
    allowOtherPaths: false
  })

  manifest.cache('/')
  manifest.cache('/some/image.png')
  manifest.fallback('/somepath.html /somefallback.html')

  var expected = [
    'CACHE MANIFEST',
    '# version: 123',
    '',
    'CACHE:',
    '/',
    '/some/image.png',
    '',
    'FALLBACK:',
    '/somepath.html /somefallback.html'
  ].join('\n')

  t.equal(manifest.toAppCache(), expected)

  var sw = manifest.toServiceWorker()

  // make sure template items got removed
  t.ok(sw.length)
  t.ok(sw.indexOf('{{') === -1)
  t.ok(sw.indexOf('}}') === -1)

  t.end()
})

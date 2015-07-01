var fs = require('fs')
var createManifest = require('../')

var manifest = createManifest({
  version: 123
})

manifest.cache('/')
manifest.cache('/some/image.png')
manifest.fallback('/somepath.html /somefallback.html')

fs.writeFileSync(__dirname + '/generated-sw.js', manifest.toServiceWorker(), 'utf8')
console.log('\n\ncreated: example/generated-sw.js')

fs.writeFileSync(__dirname + '/generated.appcache', manifest.toAppCache(), 'utf8')
console.log('created: example/generated.appcache')

console.log('\nbam! done. <3 @HenrikJoreteg\n\n')

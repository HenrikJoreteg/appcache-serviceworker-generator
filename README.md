# appcache-serviceworker-generator

Can generates an appcache manifest and ServiceWorker from same abstraction.

While this largely ignores all the other cool stuff you can with ServiceWorker, I still found it useful for a small, static, offline app I'm building.

```js
var createManifest = require('appcache-serviceworker-generator')
var fs = require('fs')

// give it a version (important for appcache)
var manifest = createManifest({version: '123'})

manifest.cache('/some/image.png')
manifest.cache('/')
manifest.fallback('/somepath.html /somefallback.html')

console.log(manifest.toAppCache())
/*
creates this string =>

`
CACHE MANIFEST
# version: 123

CACHE:
/
/some/image.png

NETWORK:
*

FALLBACK:
/somepath.html /somefallback.html
`
*/

// It can then also generate a *roughly* equivalent ServiceWorker as a string
// (it's your job to write to disk or whatever)
console.log(manifest.toServiceWorker())

```

How ready for primetime is this? Short answer: `¯\_(ツ)_/¯` 

I'm mainly sharing this because I think it's interesting, not because I think you should use it or saying that I'm interested in maintaining this long term.

I *am* using this on a small project where I've generated a static site with webpack and use the assets information that webpack has to generate an appcache for iOS (since no SW support) and a ServiceWorker for platforms that support it. It has a few very basic tests. Biggest question is how good the generated SW implementation actually is, feedback? Ping me on twitter: [@HenrikJoreteg](http://twitter.com/henrikjoreteg).

The app the initiates either selectively by first checking for support like this:

```
var cacheNanny = require('appcache-nanny')

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ',    registration.scope);
        }).catch(function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        })
} else {
	// this uses cache-nanny to actually give you a choice 
	// of when to init your appcache :)
	// see link below
    cacheNanny.start()
}
```

If you're planning on using appcache at all, I'd suggest checking out [gr2m/appcache-nanny](https://github.com/gr2m/appcache-nanny) as used by the [Hood.ie](http://hood.ie/) folks (who know a thing or two about offline).

## example

See `example` directory. Run `node example/run-me` to re-generate the appcache and SW files in that dir.

## install

```
npm install appcache-serviceworker-generator
```

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT


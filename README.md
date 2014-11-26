# journeyvienna.at

## Install requirements

The development and deploy process are based on Grunt, thus http://nodejs.org/
and the Grunt CLI from http://gruntjs.com/ need to be installed for development.
After that run `npm install` inside the folder to locally install all required
Node.js packages and afterwards it's as simple as using the commands described below.

## Build

Build to `dist/`:

    grunt

## Serve

Build to `dist/` and start browser/server session with livereload:

    grunt serve
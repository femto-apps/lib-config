const appRoot = require('app-root-path').toString()
const jetpack = require('fs-jetpack')
const hjson = require('hjson')
const path = require('path')
const _ = require('lodash')

const root = jetpack.cwd(appRoot)

const defaultConfigs = require('./default-config-files')

function addJsJson(paths, files) {
  for (let file of files) {
    if (root.exists(file)) {
      Object.assign(paths, require(path.join(appRoot, file)))
    }
  }
  return paths
}

function addHjson(paths, files) {
  for (let file of files) {
    if (root.exists(file)) {
      Object.assign(paths, hjson.parse(root.read(file)))
    }
  }
  return paths
}

module.exports = function(jsonFiles, jsFiles, hjsonFiles) {
  jsonFiles = Array.isArray(jsonFiles) ? jsonFiles : defaultConfigs.json
  jsFiles = Array.isArray(jsFiles) ? jsFiles : defaultConfigs.js
  hjsonFiles = Array.isArray(hjsonFiles) ? hjsonFiles : defaultConfigs.hjson

  let fileSet1 = jsonFiles.concat(jsFiles)
  let fileSet2 = hjsonFiles

  let paths = {}

  paths = addJsJson(paths, fileSet1)
  paths = addHjson(paths, fileSet2)

  let config = {
    paths: paths
  }

  /*
   * Get a configuration option.  Return undefined if the configuration option is not found.
   *
   * @example <caption>Simple config lookup</caption>
   * const config = require('@femto-host/config')
   * config.get('path.to.get')
   */
  config.get = function(path, def) {
    return _.get(config.paths, path)
  }

  config.addJson = function(conf, files) {
    addJsJson(conf.paths, Array.isArray(files) ? files : [])
  }

  config.addJs = function(conf, files) {
    addJsJson(conf.paths, Array.isArray(files) ? files : [])
  }

  config.addHjson = function(conf, files) {
    addHjson(conf.paths, Array.isArray(files) ? files : [])
  }

  console.log(config)
  return config
}





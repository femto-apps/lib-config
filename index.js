const appRoot = require('app-root-path').toString()
const jetpack = require('fs-jetpack')
const hjson = require('hjson')
const path = require('path')
const _ = require('lodash')

const root = jetpack.cwd(appRoot)

let config = {}

for (let file of ['config.js', 'config.json']) {
    if (root.exists(file)) {
        config = Object.assign(config, require(path.join(appRoot, file)))
    }
}

for (let file of ['config.hjson']) {
    if (root.exists(file)) {
        config = Object.assign(config, hjson.parse(root.read(file)))
    }
}

/*
 * Get a configuration option.  Return undefined if the configuration option is not found.
 *
 * @example <caption>Simple config lookup</caption>
 * const config = require('@femto-host/config')
 * config.get('path.to.get')
 */
config.get = function(path) {
    return _.get(config, path)
}

module.exports = config
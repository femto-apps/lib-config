const appRoot = require('app-root-path').toString()
const jetpack = require('fs-jetpack')
const hjson = require('hjson')
const path = require('path')
const _ = require('lodash')

const root = jetpack.cwd(appRoot)

let defaultJsonFiles = ['config.default.json', 'config.json', 'config/config.default.json', 'config/config.json']
let defaultJsFiles = ['config.default.js', 'config.js', 'config/config.default.js', 'config/config.js']
let defaultHjsonFiles = ['config.default.hjson', 'config.hjson', 'config/config.default.hjson', 'config/config.hjson']

function testArray(arr, def) {
	if (Array.isArray(arr)) {
		if (arr.length > 0) {
			return arr
		}
		else {
			return def
		}
	}
	else {
		return def
	}
}

module.exports = function(jsonFiles, jsFiles, hjsonFiles) {
	jsonFiles = testArray(jsonFiles, defaultJsonFiles)
	jsFiles = testArray(jsFiles, defaultJsFiles)
	hjsonFiles = testArray(hjsonFiles, defaultHjsonFiles)

	let fileSet1 = jsonFiles.concat(jsFiles)
	let fileSet2 = hjsonFiles

	let config = {}

	for (let file of fileSet1) {
	    if (root.exists(file)) {
	        config = Object.assign(config, require(path.join(appRoot, file)))
	    }
	}

	for (let file of fileSet2) {
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

	return config
}





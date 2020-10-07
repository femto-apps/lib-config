const jetpack = require('fs-jetpack')
const hjson = require('hjson')
const path = require('path')
const _ = require('lodash')

/*
 * You are able to have either a single file, called `config.(json|hjson|js)`
 * or an unlimited number of files within a `configs` folder.
 * 
 * You can further have default values, implemented by adding `.default` just
 * before the suffix.
 */

class Config {
  constructor() {
    const appRoot = path.dirname(module.parent.filename)

    this.config = {}
    this.root = jetpack.cwd(appRoot)

    // first, search for a top level config file
    this.load('config')

    // then we should search for everything in the 'configs' directory
    this.loadFolder('configs')

    this.outDir = undefined
  }

  get(path) {
    return _.get(this.config, path)
  }

  loadFolder(folder) {
    let files = this.root.list(folder)

    // if folder doesn't exist
    if (!files) return

    files = files
      .map(file => file.split('.').slice(0, -1))
      .map(file => file.length > 1 && file[file.length - 1] === 'default' ? file.slice(0, -1) : file)
      .map(file => file.join('.'))
    
    for (let file of _.uniq(files)) {
      this.load(path.join(folder, file), file)
    }
    
    return this
  }

  load(file, prefix) {
    // load a file based on its name, starting with default
    // and then continuing on to the normal file

    // load default first, then normal
    for (let type of ['.default', '']) {
      for (let extension of ['hjson', 'json', 'js']) {
        let qualifiedFile = `${file}${type}.${extension}`
        if (this.root.exists(qualifiedFile)) {
          let contents = this.loadRaw(qualifiedFile, extension)

          if (prefix) {
            contents = _.set({}, prefix, contents)
          }

          this.config = _.merge(this.config, contents)
        }
      }
    }

    return this
  }

  loadRaw(file, extension) {
    switch(extension) {
      case 'js':
      case 'json':
        return require(path.join(this.root.cwd(), file))
      case 'hjson':
        return hjson.parse(this.root.read(file))
    }
  }

  remove(path) {
    this.config = _.omit(this.config, path)
    return this
  }

  values() {
    return _.values(this.config)
  }

  set(path, value) {
    this.config = _.set(this.config, path, value)
    return this
  }

  setOutDir(dirPath) {
    this.outDir = jetpack.cwd(dirPath)
    return this.outDir
  }

  save(file) {
    if (!(file.includes('.'))) jetpack.write(path.join(this.outDir.cwd(), file + '.json'), this.config)
    else if (file.split('.').slice(0, -1) === '.hjson') jetpack.write(path.join(this.outDir.cwd()))
    else jetpack.write(path.join(this.outDir.cwd(), file), hjson.rt.stringify(this.config))
  }
}

module.exports = new Config()

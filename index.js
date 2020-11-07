const jetpack = require('fs-jetpack')
const hjson = require('hjson')
const path = require('path')
const _ = require('lodash')

const deepMerge = require('./deepMerge')

/*
 * You are able to have either a single file, called `config.(json|hjson|js)`
 * or an unlimited number of files within a `configs` folder.
 *
 * You can further have default values, implemented by adding `.default` just
 * before the suffix.
 */

/*
 * Note: filename implies a full filename or file path whereas file implies a file or a filename with no path or extension
 * Note: backup implies a relative path to a backup where isBackup implies a Boolean specifying whether a file is a backup or not
 */

class Config {
  constructor() {
    const appRoot = path.dirname(module.parent.filename)

    this.config = {}
    this.root = jetpack.cwd(appRoot)
    this.files = {}

    // first, search for a top level config file
    this.load('config')

    // then we should search for everything in the 'configs' directory
    this.loadFolder('configs')
  }

  get(path) {
    return _.get(this.config, path)
  }

  getAll() {
    return this.config
  }

  loadFolder(folder) {
    let files = this.root.list(folder)

    // if folder doesn't exist
    if (!files) return

    files = files
      .map((file) => file.split('.').slice(0, -1))
      .map((file) => (file.length > 1 && file[file.length - 1] === 'default' ? file.slice(0, -1) : file))
      .map((file) => file.join('.'))

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
            this.files[qualifiedFile] = prefix
          } else {
            this.files[qualifiedFile] = '.'
          }

          this.config = _.merge(this.config, contents)
        }
      }
    }

    return this
  }

  // Private - not documented
  loadRaw(filename, extension) {
    switch (extension) {
      case 'js':
      case 'json': {
        return require(path.join(this.root.cwd(), filename))
      }
      case 'hjson': {
        return hjson.rt.parse(this.root.read(filename))
      }
    }
  }

  remove(path) {
    this.config = _.omit(this.config, path)
    return this
  }

  values(path) {
    return _.values(path ? _.get(this.config, path) : this.config)
  }

  keys(path) {
    return _.keys(path ? _.get(this.config, path) : this.config)
  }

  set(path, value) {
    this.config = _.set(this.config, path, value)
    return this
  }

  getFiles() {
    return this.files
  }

  // Private - not documented
  saveRaw(filename, pathModifier, extension, file) {
    switch (extension) {
      case 'js':
        jetpack.write(path.join(this.root.cwd(), path.dirname(filename), pathModifier, path.basename(filename)), 'module.exports = ')
        jetpack.append(path.join(this.root.cwd(), path.dirname(filename), pathModifier, path.basename(filename)), JSON.stringify(file, null, 2))
        break
      case 'json': {
        jetpack.write(path.join(this.root.cwd(), path.dirname(filename), pathModifier, path.basename(filename)), file)
        break
      }
      case 'hjson': {
        jetpack.write(path.join(this.root.cwd(), path.dirname(filename), pathModifier, path.basename(filename)), hjson.rt.stringify(file))
        break
      }
    }
  }

  saveNewFile(filename, isBackup) {
    if (isBackup === true) filename = this.makeBackupFilename(filename)
    this.saveRaw(filename, '', this.getFileExtension(filename), this.config)
  }

  saveFile(filename, prefix, backup, withDefault) {
    if (!_.has(this.files, filename)) return
    // Not === to catch both null and undefined
    if (prefix == undefined) prefix = this.files[filename]
    let extension = this.getFileExtension(filename)
    let file = this.loadRaw(filename, extension)
    if (withDefault) {
      let defaultFile = this.loadRaw(this.makeDefault(filename), extension)
      deepMerge(file, defaultFile, { addToDestination: true })
    }
    deepMerge(file, prefix === '.' ? this.config : _.get(this.config, prefix))
    if (backup) filename = this.makeBackupFilename(filename)
    this.saveRaw(filename, typeof backup === 'string' || backup instanceof String ? backup : '', extension, file)
  }

  // Private - not documented
  getFileExtension(filename) {
    return filename.split('.').pop()
  }

  // Private - not documented
  makeBackupFilename(filename) {
    return filename.slice(0, filename.lastIndexOf('.')) + '.backup' + filename.slice(filename.lastIndexOf('.'))
  }

  // Private - not documented
  makeDefault(filename) {
    filenameParts = filename.split('.')
    filenameParts.push(filenameParts[filenameParts.length - 1])
    filenameParts[filenameParts.length - 2] = 'default'
    return filenameParts.join('.')
  }
}

module.exports = new Config()

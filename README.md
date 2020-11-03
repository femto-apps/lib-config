# Config Loader

## Descciption

By default, this module lets you have either a single file, called `config.(json|hjson|js)` or an unlimited number of files within a `configs` folder.

You can further have default values, implemented by adding `.default` just before the suffix.

Alternate config files can be loaded afterwards.

Configuration values can also be set and saved back in to the files they came from, preserving comments in HJSON files. Alternatively, the whole configuration can be saved in to a new file.

## Usage

```JavaScript
// Load the module and load the pre-defined files and their defaults.
const config = require('@femto-host/config')

// Load additional files and their defaults.
config.load('prefix', 'config2.hjson')

// Load all additional files and their defaults in a folder.
config.loadFolder('folder')

// Get a config value.
config.get('path.to.option[0]')

// Set a config value.
config.set('prefix.path.to.option', 'value')

// Update all the config values stored in the specified file.
config.save('config2.hjson')

// Save the entire configuration to the specified file.
config.saveNewFile('newFile.json')

// Get the entire config.
config.getAll()

// Get the config as an array of first-level values (second-level and deeper objects remain together as items in the array).
config.values()

// Get all files loaded and the prefix in the config their values are stored under. A '.' means that a file's values were added at the top level.
config.getFiles()

// Remove a value from the config. Removed values will not overwrite values in files when 'save' isused, but will not be present when 'saveNewFile' is used.
config.remove('path.to.value.to.remove')
```

## Dependencies

This module uses `fs-jetpack`, `hjson` and `lodash` as dependencies.

For development, `prettier` and `node-git-hooks` are also required.

## License

This project is licensed under a MIT license. See the [LICENSE](LICENSE 'LICENSE') file for more information.

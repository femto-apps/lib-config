# Config Loader

Looks for configuration file such as `config.js`, `config.json` and `config.hjson` in the top level directory, in the `config` directory, in the `configs` directory and in the `test-configs` directory.  It first attempts to load `config.default.js`, `config.default.json` and `config.default.hjson` in the aforementioned directories in case the non-default files cannot be found.  Usage:

```javascript
const config = require('@femto-host/config')()

config.get('path.to.option[0]')
```

The configuration files it looks for can be customised.  Usage: 

```javascript
let extraJsonFiles = ['example.json']
let extraJsFiles = ['example.js']
let extraHjsonFiles = ['example.hjson']
const config = require('@femto-host/config')(extrahJsonFiles, extraJsFiles, extraHjsonFiles)
```

Setting one of the three parameters to an empty array (`[]`) will make it not load any configuration file of that type. 


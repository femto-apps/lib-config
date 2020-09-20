# Config Loader

Looks for configuration file such as `config.js`, `config.json` and `config.hjson` in the top level directory, in the `config` directory, in the `configs` directory and in the `test-configs` directory.  It first attempts to load `config.default.js`, `config.default.json` and `config.default.hjson` in the aforementioned directories in case the non-default files cannot be found.  Usage:

```javascript
const config = require('@femto-host/config')

config.get('path.to.option[0]')
```

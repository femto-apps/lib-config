# Config Loader

Looks for configuration as `config.js`, `config.json` and `config.hjson`.  Usage:

```javascript
const config = require('@femto-host/config')

config.get('path.to.option[0]')
```
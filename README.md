# Config Loader

## Descciption 

 By default, this module lets you have either a single file, called `config.(json|hjson|js)` or an unlimited number of files within a `configs` folder.
 
 You can further have default values, implemented by adding `.default` just before the suffix.

 Alternate config files can be loaded afterwards. 

 ## Usage 

```JavaScript
const config = require('@femto-host/config')

config.get('path.to.option[0]')
```

## License 

This project is licensed under a MIT license. See the [LICENSE](LICENSE "LICENSE") file for more information. 

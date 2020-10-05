const config = require('../')

console.log(config.get('hello'))
console.log(config.get('bye'))

config.load('config2')
config.load('config2', 'cf2')

console.log(config.get('a'))
console.log(config.get('d[0]'))

console.log(config)
console.log(config.get('cf2.e.h'))
config.remove('cf2.d')
config.set('cf2.e.h[1]', 12)
console.log(config)
console.log(config.get('cf2.e.h'))
console.log(config.get('this.path.does.not.exist'))

console.log(config.values())

config.setOutDir('./')
config.save('config3')

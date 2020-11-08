// Testing index file
const config = require('../')
const deepMerge = require('../deepMerge')

let tags = []
let results = {}

function test(tag, from, to) {
  tag = String(tag)
  let fullTag = tag
  let i = 0
  while (fullTag in tags) {
    fullTag = tag + '_' + String(i++)
  }
  console.log(fullTag, ':', from, '\n')
  results[fullTag] = _.isEqual(from, to)
}

/*
let d = Date.now()
console.log(d)
let a = {
  "a": "b",
  "c": 34,
  "d": [4, 5, 6],
  "e": {
    "f": "g",
    "h": [7, 8]
  },
  "i": "j",
  "m": "n", 
  "o": "p", 
  "r": "s",
  "q": d
}
let b = {
  "a": "b2",
  "c": 35, 
  "d": [4, 9, 6, 7, null, undefined, 10],
  "e": {
    "f": "g2"
  }, 
  "k": "ll",
  "m": null,
  "n": undefined,
  "o": undefined,
  "r": {
    "t": "u", 
    "v": "w"
  },
  "q": Date.now()
}

console.log(deepMerge(a, b, {addToDestination: false, addToDestinationArray: true, overwriteWithNull: false, overwriteWithUndefined: true}))
*/

/*
console.log(config.get('hello'))
console.log(config.get('bye'))

config.set('hello', 'hello from an updated config')

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

console.log(config.getFiles())

config.remove('hello')

config.saveFile('config.hjson')
config.saveFile('config2.js')

config.saveNewFile('config4.hjson')

//config.setOutDir('./')
//config.save('config3')
//
*/

//console.log(config.root)
//console.log(config.getFiles())

test('Files', config.getFiles(), {
  'configs\\config1.default.hjson': 'config1',
  'configs\\config1.default.json': 'config1',
  'configs\\config1.default.js': 'config1',
  'configs\\config1.hjson': 'config1',
  'configs\\config1.json': 'config1',
  'configs\\config1.js': 'config1',
  'configs\\config2.hjson': 'config2'
})

test('Keys', config.keys(), ['config1', 'config2'])

// Suspected bug in HJSON when fourth parameter is true
config.saveFile('configs\\config2.hjson', null, '..\\backups', false)
config.saveNewFile('config.hjson', true)

console.log(config.getAll())

config.set('config1.i.j', 'k2')

console.log(results)

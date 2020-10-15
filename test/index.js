const config = require('../')
const deepMerge = require('../deepMerge')

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

/*
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

//config.setOutDir('./')
//config.save('config3')
*/

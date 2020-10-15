_ = require('lodash')
module.exports = function deepMergeIf(destination, source, options) {
	if (destination === source) return destination 
  for (let i in source) {
    let sourceValue = source[i] 
    let destinationValue = destination[i]
    if ((Object(sourceValue) === sourceValue) && (Object(destinationValue) === destinationValue)) {
      destination[i] = deepMergeIf(destinationValue, sourceValue, options)
      continue
    }
    console.log(Array.isArray(destination), i, options.addToDestinationArray)
    if (((_.has(destination, i)) || (options.addToDestinationArray && (Array.isArray(destination))) || (options.addToDestination && !(Array.isArray(destination)))) 
    	&& (options.overwriteWithUndefined || source[i] !== undefined || (Array.isArray(destination))) 
    	&& (options.overwriteWithNull || source[i] !== null || (Array.isArray(destination)))) {
    	console.log(i)
    	_.set(destination, i, source[i]) }
  }
  return destination
}

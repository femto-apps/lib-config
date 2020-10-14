module.exports = function deepMergeIf(destination, source) {
	if (destination === source) return destination 
  for (let i in source) {
    let sourceValue = source[i] 
    let destinationValue = destination[i]
    if ((Object(sourceValue) === sourceValue) && (Object(destinationValue) === destinationValue)) {
      destination[i] = deepAssign(destinationValue, sourceValue)
      continue
    }
    destination[i] = source[i]
  }
  return destination
}

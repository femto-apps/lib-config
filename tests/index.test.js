const config = require('../index')()

console.log(config)

test('javascript', () => {
    expect(config.get('js.str')).toEqual('hello, world!')
    expect(config.get('js.bool')).toEqual(true)
    expect(config.get('js.number')).toEqual(10)
    expect(config.get('js.array')).toEqual(['a', 'b', 'c'])
    expect(config.get('js.nothing')).toEqual(undefined)
})

test('json', () => {
    expect(config.get('json.str')).toEqual('hello, world!')
    expect(config.get('json.bool')).toEqual(true)
    expect(config.get('json.number')).toEqual(10)
    expect(config.get('json.array')).toEqual(['a', 'b', 'c'])
    expect(config.get('json.nothing')).toEqual(undefined)
})

test('hjson', () => {
    expect(config.get('hjson.str')).toEqual('hello, world!')
    expect(config.get('hjson.bool')).toEqual(true)
    expect(config.get('hjson.number')).toEqual(10)
    expect(config.get('hjson.array')).toEqual(['a', 'b', 'c'])
    expect(config.get('hjson.nothing')).toEqual(undefined)
})

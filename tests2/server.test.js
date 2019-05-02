const express = require('express')
const config = require('../index')()

const app = express()

const port = 6945

app.get('/', (req, res) => {
	res.header("Content-Type",'application/json')
	res.send(JSON.stringify(config, null, 4))
})

app.get('/:path', (req, res) => {
	res.header("Content-Type",'application/json')
	res.send(JSON.stringify(config.get(req.params.path), null, 4))
})

app.listen(6945, () => {console.log("Server listening on port " + String(port))})

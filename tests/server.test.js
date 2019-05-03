const express = require('express')
let config = require('../index')()

const app = express()

const port = 6945

app.get('/', (req, res) => {
  res.header("Content-Type", 'application/json')
  res.send(JSON.stringify(config, null, 4))
})

app.get('/paths', (req, res) => {
  res.header("Content-Type", 'application/json')
  res.send(JSON.stringify(config.paths, null, 4))
})

app.get('/paths/:path', (req, res) => {
  res.header("Content-Type", 'application/json')
  res.send(JSON.stringify(config.get(req.params.path), null, 4))
})

app.get('/add', (req, res) => {
  res.redirect('/')
})

app.get('/add/:method', (req, res) => {
  res.redirect('/')
})

app.get('/add/:method/:file', (req, res) => {
  if (config[req.params.method] != null) {
    config.addJson(config, [req.params.file])
    res.redirect('/')
  }
  else {
    res.redirect('/paths')
  }
})

app.listen(port, () => {console.log(`Server listening on port ${port}`)})

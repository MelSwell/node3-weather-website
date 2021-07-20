const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getWeather = require('./utils/getWeather')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get("", (req, res) => {
  res.render('index', {
    title: 'Weather',
  })
})

app.get("/about", (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Seth Cohen'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: "If you need some help, I got you.",
    title: 'Help',
    name: 'Seth Cohen'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide an address'
    })
  }

  geocode(req.query.address, (error, {lat, lon, location} = {}) => {
    if (error) return res.send({ error })
    
    getWeather(lat, lon, (error, forecast) => {
      if (error) return res.send({ error })
      
      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found',
    name: 'Seth Cohen',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found',
    name: 'Seth Cohen',
    title: '404'
  })
})

app.listen(3000, () => {
  console.log('Server up on port 3000')
})
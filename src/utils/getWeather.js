const request = require('postman-request')

const getWeather = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=af8ba2cdf6754587983d6e8b773ca6f2&query=${lat},${lon}&units=f`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees.`)
    }
  })
}

module.exports = getWeather
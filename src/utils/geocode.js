const request = require('postman-request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic21jb2hlbjgyIiwiYSI6ImNrcjVtYzQ5NTM3NmQyb284aDE2YWVzeWkifQ.6n3VxE9Xs7MQ6S0V9No1Xg&limit=1`
  
  request({ url, json: true }, (error, { body }) => {
    if (error){
      callback('Unable to connect to location services')
    } else if (body.message) {
      callback('Invalid location, please try again')
    } else if (body.features.length  === 0) {
      callback('Invalid location, please try again')
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
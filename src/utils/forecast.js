const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=e6f3a29feac4534679842cfc03c54da&query='+ latitude + ',' + longitude +'&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=e6f3a29feac4534679842cfc03c54daf&query='+latitude+','+longitude+'&units=f';
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
             callback(undefined, response.body.request.query + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast
const request = require('request')

const forecast = (lat, long, callback) => {
    const weatherApiURL = 'http://api.weatherstack.com/current?access_key=73a5bec22d1346fcd8be44921bd70baf&query=' + lat + ',' + long + '&units=f';

    request({ url: weatherApiURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (response.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                location: response.body.location,
                weather: response.body.current.weather_descriptions[0],
            })
        }
    })

}

module.exports = forecast
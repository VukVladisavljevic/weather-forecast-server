const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=9d27c75ec867ee8a2f47e053ebb437a5&query=' + encodeURIComponent(address)

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.data.length === 0) {
            callback('Unable to find location, try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label,
            })
        }
    })


}

module.exports = geocode
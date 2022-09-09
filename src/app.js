const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to servce
app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    const reqAddress = req.query.address

    if (!reqAddress) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(reqAddress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        console.log(latitude, longitude, location);
        forecast(latitude, longitude, (error, { weather }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: weather,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vuk V'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vuk V',
        helpText: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Vuk V',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('index', {
        title: 'Unknown',
        name: 'Vuk V',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Serves is up on port 3000');
})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const axios = require('axios')
const xml2js = require('xml2json')
dotenv.config();

// setup express server
const port = '3000'
const app = express()
app.use(cors())
app.use(express.static(__dirname + '/../../dist/'))
app.use(bodyParser.json())

// server data
let timeToTrip;

app.listen(port, () => {
    console.log('Server running on port: ' + port)
})

app.get('/', (req, res) => {
    res.sendFile('/dist/index.html', { root: __dirname + '/../..' })
})

app.post('/takeoff', onPost)

async function onPost(req, res) {
    res.send({ request: req.body })
    const tripInfo = req.body
    timeToTrip = getTimeToTrip(req.body.date)

    let coord = ''
    const resGeo = await getLocation(tripInfo)
    try {
        const geoJson = JSON.parse(xml2js.toJson(resGeo.data))
        coord = { lat: geoJson.geonames.code[0].lat, lng: geoJson.geonames.code[0].lng }
        console.log(coord)

        // get weather info with coords
        if (timeToTrip < 7) {
            let weatherFor = 'current'
            const resWeather = await getWeather(weatherFor, coord)
            try {
                console.log('Calling Weather API')
                console.log(resWeather.data)
            }
            catch (error) {
                console.log('Problem connecting to weather API')
                console.log(error)
            }
        }
        else {
            let weatherFor = 'forecast/daily'
            const resWeather = await getWeather(weatherFor, coord)
            try {
                console.log('Calling Weather API')
                console.log(resWeather.data)
            }
            catch (error) {
                console.log('Problem connecting to weather API')
                console.log(error)
            }
        }
    }
    catch (error) {
        console.log('Problem connecting to Geo API')
        console.log(error)
    }

}

// API caller functions
async function getLocation(tripInfo) {
    const baseUrl = `http://api.geonames.org/postalCodeSearch?username=${process.env.GEO_KEY}&`
    const cityName = `placename=${tripInfo.location}`
    console.log('URL defined')
    // get 
    return await axios.get(baseUrl + cityName)
}

async function getWeather(weatherFor, coord) {
    const baseUrl = `https://api.weatherbit.io/v2.0/${weatherFor}?key=${process.env.WEATHER_KEY}&`
    const unit = "units=M&"
    console.log(coord)
    const coordParam = `lat=${coord.lat}&lon=${coord.lng}`
    return await axios.get(baseUrl + unit + coordParam)
}

async function getPicture(tripInfo) {
    const baseUrl = "https://pixabay.com/api/"
    // get
}

// get days until trip
function getTimeToTrip(tripDate) {
    const todayDate = (() => {
        const todayTime = new Date()
        return new Date(todayTime.getFullYear(), todayTime.getMonth(), todayTime.getDate())
    })()
    const splitDate = tripDate.split('-')
    const planDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
    const diff = planDate - todayDate
    console.log('frontend:' + tripDate)
    return Math.floor((diff / 3600 / 24 / 1000))
}
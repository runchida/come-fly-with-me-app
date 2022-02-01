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
let daysToTrip;
let tripData = {};

app.listen(port, () => {
    console.log('Server running on port: ' + port)
})

app.get('/', (req, res) => {
    res.sendFile('/dist/index.html', { root: __dirname + '/../..' })
})

app.post('/takeoff', onPost)

async function onPost(req, res) {
    const tripInfo = req.body
    // daysToTrip = getDaysToTrip(req.body.date)
    daysToTrip = getDaysleft('today', req.body.date)
    const tripInDays = getDaysleft(req.body.date, req.body.endDate)
    Object.assign(tripData, { city: tripInfo.location })
    Object.assign(tripData, { daysToTrip: daysToTrip })
    Object.assign(tripData, { tripInDays: tripInDays })

    let coord = ''
    const resGeo = await getLocation(tripInfo)
    try {
        console.log('Geo called')
        const geoJson = JSON.parse(xml2js.toJson(resGeo.data))
        coord = { lat: geoJson.geonames.code[0].lat, lng: geoJson.geonames.code[0].lng }

        // get weather info with coords
        const resWeather = await getWeather(daysToTrip, coord)
        try {
            // process weather data
            console.log('Weather API called')
            if (daysToTrip < 7) {
                Object.assign(tripData, { weather: resWeather.data.data[0] })
            }
            else {
                Object.assign(tripData, { weather: resWeather.data.data })
            }
            console.log(resWeather.data.data[0])


            // get picture with city name
            const resPixa = await getPicture(tripInfo)
            try {
                console.log('Pixabay called')
                Object.assign(tripData, { pics: resPixa.data })
                res.send(tripData)
            }
            catch (error) {
                console.log('Problem connecting to Pixabay')
                console.log(error)
            }
        }
        catch (error) {
            console.log('Problem connecting to weather API')
            console.log(error)
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

async function getWeather(daysToTrip, coord) {
    let weatherFor = 'forecast/daily'
    if (daysToTrip < 7) {
        weatherFor = 'current'
    }
    const baseUrl = `https://api.weatherbit.io/v2.0/${weatherFor}?key=${process.env.WEATHER_KEY}&`
    const unit = "units=M&"
    const coordParam = `lat=${coord.lat}&lon=${coord.lng}`
    return await axios.get(baseUrl + unit + coordParam)
}

async function getPicture(tripInfo) {
    const baseUrl = `https://pixabay.com/api?key=${process.env.PIXA_KEY}&`
    const cityName = `q=${tripInfo.location}&`
    const params = `editors_choice=true&orientation=wide&min_width=600&page=1&per_page=5`
    return await axios.get(baseUrl + cityName + params)
}

// get days until trip
// function getDaysToTrip(tripDate) {
//     const todayDate = (() => {
//         const todayTime = new Date()
//         return new Date(todayTime.getFullYear(), todayTime.getMonth(), todayTime.getDate())
//     })()
//     const splitDate = tripDate.split('-')
//     const planDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
//     const diff = planDate - todayDate
//     console.log('frontend:' + tripDate)
//     return Math.floor((diff / 3600 / 24 / 1000))
// }

function getDaysleft(startDate, endDate) {
    let newStartDate;
    // case differentiation for today or other date
    if (startDate = 'today') {
        newStartDate = (() => {
            const todayTime = new Date()
            return new Date(todayTime.getFullYear(), todayTime.getMonth(), todayTime.getDate())
        })()
    }
    else {
        const startTemp = startDate.split('-')
        newStartDate = new Date(startTemp[0], startTemp[1] - 1, startTemp[2])
    }

    const endTemp = endDate.split('-')
    const newEndDate = new Date(endTemp[0], endTemp[1] - 1, endTemp[2])
    const diff = newEndDate - newStartDate
    return Math.floor((diff / 3600 / 24 / 1000))
}
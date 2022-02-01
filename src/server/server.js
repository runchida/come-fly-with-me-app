const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config();

// setup express server
const port = '3000'
const app = express()
app.use(cors())
app.use(express.static(__dirname + '/../../dist/'))
app.use(bodyParser.json())

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
    const resGeo = await getLocation(tripInfo)
    try {
        console.log(resGeo.data)
    }
    catch (error) {
        console.log('Problem connecting to API')
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

async function getWeather(tripInfo) {
    const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?"
    const unit = "units=M"
    // get
}

async function getPicture(tripInfo) {
    const baseUrl = "https://pixabay.com/api/"
    // get
}

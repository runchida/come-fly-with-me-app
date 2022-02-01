import axios from "axios"

export async function getLocation(tripInfo) {
    const baseUrl = `api.geonames.org/postalCodeSearch?username=${process.env.GEO_KEY}&`
    const cityName = `placename=${tripInfo.location}`
    // get 
    axios.get(baseUrl + cityName)
    .then((res) => {
        console.log(res)
    })
}

export async function getWeather(tripInfo) {
    const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?"
    const unit = "units=M"
    // get
}

export async function getPicture(tripInfo) {
    const baseUrl = "https://pixabay.com/api/"
    // get
}
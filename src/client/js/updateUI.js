export function updateResult(data) {
    const docFrag = document.createDocumentFragment()
    const weatherDiv = document.createElement('div', { "id": 'weatherDiv' })
    const picDiv = document.createElement('div', { "id": 'picDiv' })
    const result = document.getElementById('result')
    result.innerHTML = ''

    console.log(data)
    // add weather Info
    weatherDiv.setAttribute("class", "weatherDiv")

    const countdownDiv = document.createElement('div', { "id": "countdown" })
    countdownDiv.innerHTML = `Your dream will last ${data.tripInDays} days`

    if (data.daysToTrip < 7) {
        weatherDiv.innerHTML =
            `<div>Today's weather in ${data.city}</div>
            <div>Temperature ${data.weather.temp}</div>
            <div>Feels like ${data.weather.app_temp}</div>
            <div>Look at the sky and you might see ${data.weather.description}</div>`
    }
    else {
        let forecastBegin = data.daysToTrip;
        if (data.daysToTrip > 16) {
            forecastBegin = 13
        }
        for (let i = forecastBegin; i < forecastBegin + 3; i++) {
            const forecast = document.createElement("div")
            forecast.setAttribute("class", "forecast")
            forecast.innerHTML =
                    `<div>Forecast for ${data.weather[i].valid_date}</div>
                    <div>High ${data.weather[i].max_temp} Degree Celsius</div>
                    <div>Low ${data.weather[i].min_temp} Degree Celsius</div>
                    <div>You maybe see ${data.weather[i].weather.description} in the sky</div>`
            weatherDiv.appendChild(forecast)
        }
    }

    // add pictures
    picDiv.setAttribute("class", "picDiv")
    for (let i = 0; i < data.pics.hits.length; i++) {
        const pic = document.createElement("img")
        pic.setAttribute("class", "cityPic")
        pic.setAttribute("id", `pic${i + 1}`)
        pic.setAttribute("src", data.pics.hits[i].largeImageURL)
        picDiv.appendChild(pic)
        if (i == 2) break;
    }
    docFrag.appendChild(countdownDiv)
    docFrag.appendChild(weatherDiv)
    docFrag.appendChild(picDiv)
    result.appendChild(docFrag)
}

export function resetResult(event) {
    event.preventDefault()
    const result = document.getElementById('result')
    result.innerHTML = ''
}

export function updateError() {
    console.log('Showing error')
    const result = document.getElementById('result')
    result.innerHTML = 'Flight canceled :('
}
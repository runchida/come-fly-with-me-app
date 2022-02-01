export function updateResult(data) {
    const docFrag = document.createDocumentFragment()
    const weatherDiv = document.createElement('div', { id: 'weatherDiv' })
    const picDiv = document.createElement('div', { id: 'picDiv' })
    const result = document.getElementById('result')

    console.log(data)
    // add weather Info
    console.log(data.daysToTrip)
    if (data.daysToTrip < 7) {
        weatherDiv.innerHTML =
            `<div>Today's weather in ${data.city}</div>
            <div>Temperature ${data.weather.temp}</div>
            <div>Feels like ${data.weather.app_temp}</div>
            <div>Look at the sky and you might see ${data.weather.app_temp}</div>`
    }
    else {
        weatherDiv.innerHTML =
            `<div class="forecast">
                <div>Temperature ${data.weather.temp}</div>
                <div>Feels like ${data.weather.app_temp}</div>
                <div>Look at the sky and you probably see ${data.weather.weather.description}</div>
            </div>
            <div class="forecast">
                <div>Temperature ${data.weather.temp}</div>
                <div>Feels like ${data.weather.app_temp}</div>
                <div>Here maybe you will see ${data.weather.weather.description}</div>
            </div>
            <div class="forecast">
                <div>Temperature ${data.weather.temp}</div>
                <div>Feels like ${data.weather.app_temp}</div>
                <div>Guess you will see ${data.weather.weather.description}</div>
            </div>`
    }

    // add pictures
    for (let i = 0; i < data.pics.hits.length; i++) {
        const pic = document.createElement("img")
        pic.setAttribute("class", "cityPic")
        pic.setAttribute("id", `pic${i+1}`)
        pic.setAttribute("src", data.pics.hits[i].largeImageURL)
        picDiv.appendChild(pic)
    }

    docFrag.appendChild(weatherDiv)
    docFrag.appendChild(picDiv)
    result.appendChild(docFrag)
}
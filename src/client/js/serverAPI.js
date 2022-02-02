import axios from "axios";

export async function postInfo(url, tripInfo) {
    // const rawData = await axios.post(url, tripInfo)
    const rawData = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(tripInfo)
    })
    try {
        if (rawData.ok) {
            const projectData = await rawData.json();
            console.log('Changing UI')
            console.log(projectData)
            Client.updateResult(projectData)
        }
        else {
            Client.updateError()
        }
    }
    catch (error) {
        console.log('Error posting to: ' + url)
        console.log(error)
    }
}
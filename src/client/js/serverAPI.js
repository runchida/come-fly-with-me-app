import axios from "axios";

export async function postInfo(url, tripInfo) {
    const rawData = await axios.post(url, tripInfo)
    .then ( (response) => {
        console.log(response);
    })
    .catch ( error => {
        console.log('Error posting to: ' + url)
        console.log(error)
    })
}
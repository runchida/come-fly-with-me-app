window.addEventListener('load', () => {
    document.getElementById('travelForm').addEventListener('submit', onSubmit)
    document.getElementById('travelButton').addEventListener('click', onSubmit)
    console.log('Event listeners added')
})

export function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById('travelForm').checkValidity()) {
        const tripInfo = { location: document.getElementById('location').value, date: document.getElementById('date').value }
        console.log(tripInfo)
        Client.postInfo('/takeoff', tripInfo)
    }
    else {
        document.getElementById('result').innerHTML = 'Tell me when, tell me where!'
    }
}
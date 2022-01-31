window.addEventListener('load', () => {
    document.getElementById('travelForm').addEventListener('submit', onSubmit)
    document.getElementById('travelButton').addEventListener('click', onSubmit)
    console.log('Event listeners added')
})

export function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById('travelForm').checkValidity()) {
        const tripInfo = { location: document.getElementById('location').textContent, date: document.getElementById('date') }
        Client.postInfo('/takeoff', tripInfo)
    }
}
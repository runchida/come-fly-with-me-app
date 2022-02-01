let todayDate = getDate();
console.log(todayDate)

window.addEventListener('load', () => {
    document.getElementById('travelForm').addEventListener('submit', onSubmit)
    document.getElementById('travelButton').addEventListener('click', onSubmit)
    document.getElementById('resetButton').addEventListener('click', Client.resetResult)
    document.getElementById('date').setAttribute('min', todayDate)
    document.getElementById('endDate').setAttribute('min', todayDate)
    console.log('Event listeners added')

})

export function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById('travelForm').checkValidity()) {
        const tripInfo = {
            location: document.getElementById('location').value, date: document.getElementById('date').value,
            todayDate: document.getElementById('date').min, endDate: document.getElementById('endDate').value
        }
        console.log(tripInfo)
        Client.postInfo('/takeoff', tripInfo)
    }
    else {
        document.getElementById('result').innerHTML = 'Tell me when, tell me where!'
    }
}

function getDate() {
    var today = new Date();
    let month = today.getMonth() + 1;
    let date = 0;
    if (today.getMonth() + 1 < 10) { month = '0' + month }
    if (today.getDate() < 10) { date = '0' + today.getDate() }
    var todayDate = today.getFullYear() + '-' + month + '-' + date;
    return todayDate;
}
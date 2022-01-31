import { onSubmit } from "../src/client/js/eventListeners";
const $ = require('jquery');

describe("Form submitting function", () => {
    let location = ''
    let date = ''
    test("Test: onSubmit()", () => {
        window.document.body.innerHTML = `<body>
        <h1>Come fly with me</h1>
        <form id="travelForm">
            <label for="location">Where?</label>
            <input id="location" type="text" placeholder="Wherever" required />
            <label for="location">When?</label>
            <input id="date" type="datetime" required />
            <button id="travelButton">Let's go</button>
        </form>
        <div id="result"></div>
    </body>`
        const form = $('#travelForm');
        const button = $('#travelButton');
        form[0].addEventListener('submit', onSubmit)
        button[0].addEventListener('click', onSubmit)

        const inputs = [['abc', ''], ['', 'abc'], ['', '']]
        for (let i=0; i<inputs.length; i++) {
            const div = $('#result')
            location = inputs[i][0]
            date = inputs[i][1]
            $('#location')[0].value = location 
            $('#date')[0].value = date
            button[0].click()
            console.log(location + date)
            expect(div[0].innerHTML).toMatch("Tell me when, tell me where!")
        }
    })
})
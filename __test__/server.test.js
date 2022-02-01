const axios = require('axios')
import { onSubmit } from "../src/client/js/eventListeners";

describe("Testing the express server", () =>  {
    test("Testing API calls", () => {
        axios.get('/') 
    })
})
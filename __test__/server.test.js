import { getLocation } from "../src/server/server.js";
import 'regenerator-runtime/runtime';
const xml2js = require('xml2json')

describe("Testing the express server", () => {
    const tripInfo = { location: "london" }
    test("Testing API calls", async () => {
        const resGeo = await getLocation(tripInfo)
        try {
            () => {
                const geoJson = JSON.parse(xml2js.toJson(resGeo.data))
                const coord = { lat: geoJson.geonames.code[0].lat, lng: geoJson.geonames.code[0].lng }
                expect(coord.lat).toBeDefined()
                expect(coord.lng).toBeDefined()
            }
        }
        catch {
            (error) => {
                console.log(error)
            }
        }
    })
})
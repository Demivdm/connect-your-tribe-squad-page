// Dit importeert express uit de node_modules map
import express from 'express'

// Dit een een variabel die de standaard functies van express ophaalt
const app = express()

// Dit zorgt ervoor dat ejs als template wordt gebruikt en de html uit de map views wordt opgehaald
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Dit haalt de css op uit de public map
app.use(express.static('public'))

// Hier maak je een route voor de index en je vraagt of de code een / achter de url wilt zetten. 
app.get('/', function (request, response) {
  // Daarna geef je met een variabele aan wat de url inhoudt.
  const url = 'https://whois.fdnd.nl/api/v1/members'
  fetchJson(url).then((data) => {
    response.render('index', data)
  })
})






// Je stelt het poort nummer in. Dit is een door cyclic gekozen poort of 8000 lokaal.
app.set('port', process.env.PORT || 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // console log laat het volgende bericht in de terminal zien met het poortnummer erbij.
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// ik weet nog niet zo goed hoe alles onder deze comment werkt

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error)
}
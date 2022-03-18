import { Interface } from './modules/Interface.js'
import { CountryDB } from './modules/CountryDB.js'

const countries = await CountryDB.fetchCountries()
const countryDB = new CountryDB(countries)

const instance = new Interface(countryDB)

instance.createTable(countryDB.countries)

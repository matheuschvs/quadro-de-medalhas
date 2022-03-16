import { Interface } from './modules/Interface.js'
import { CountryDB } from './modules/CountryDB.js'

Interface.addListener()

await CountryDB.fetchCountries()
Interface.createTable(CountryDB.getAll())
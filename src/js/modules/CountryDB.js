class CountryDB {
  static countries = []

  static getAll() {
    return this.countries
  }

  static findByName(name) {
    return this.countries.filter(country =>
      country.country.toLowerCase().includes(name.toLowerCase())
    )
  }

  static async fetchCountries() {
    try {
      const response = await fetch('https://kenzie-olympics.herokuapp.com/paises')
      const data = await response.json()

      this.countries = data
    } catch (err) {
      alert('Falha ao buscar países!')
    }
  }
}

export { CountryDB }

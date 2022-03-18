class CountryDB {
  constructor(countries) {
    this._countries = countries
  }

  get countries() {
    return this._countries
  }

  findByName(name) {
    return this.countries.filter(country =>
      country.country.toLowerCase().includes(name.toLowerCase())
    )
  }

  static sortBy(data, property, order) {
    if (order === 'down') {
      return data.sort((a, b) => a[property] - b[property])
    } else {
      return data.sort((a, b) => b[property] - a[property])
    }
  }

  static async fetchCountries() {
    try {
      const response = await fetch('https://kenzie-olympics.herokuapp.com/paises')
      const data = await response.json()

      data.forEach(country => {
        country.total = country.medal_gold + country.medal_silver + country.medal_bronze
      })

      data.sort((a, b) => {
        if (a.total !== b.total) {
          return b.total - a.total
        } else {
          return b.medal_gold - a.medal_gold
        }
      })

      data.forEach((country, index) => {
        country.position = index + 1
      })

      return data
    } catch (err) {
      alert('Falha ao buscar países!')
    }
  }
}

export { CountryDB }

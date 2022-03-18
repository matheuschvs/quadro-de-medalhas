import { CountryDB } from './CountryDB.js'

class Interface {
  constructor(database) {
    this._database = database
    this._countryInput = document.getElementById('country-search')
    this._tableWrapper = document.getElementById('table-wrapper')
    this._searchButton = document.getElementById('search-box__button')
    this._orderButtons = {
      position: 'down',
      medal_gold: 'down',
      medal_silver: 'down',
      medal_bronze: 'down'
    }

    this.addListener()
  }

  createTable(tableData) {
    const table = document.createElement('table')
    const tableHead = document.createElement('thead')
    const firstRow = document.createElement('tr')
    const position = document.createElement('th')
    const country = document.createElement('th')
    const gold = document.createElement('th')
    const silver = document.createElement('th')
    const bronze = document.createElement('th')
    const total = document.createElement('th')

    const posButton = this.createButton('position', 'Posição')
    const goldButton = this.createButton('medal_gold', 'Ouro')
    const silverButton = this.createButton('medal_silver', 'Prata')
    const bronzeButton = this.createButton('medal_bronze', 'Bronze')

    country.innerText = 'País'
    total.innerText = 'Total'

    position.appendChild(posButton)
    gold.appendChild(goldButton)
    silver.appendChild(silverButton)
    bronze.appendChild(bronzeButton)

    firstRow.appendChild(position)
    firstRow.appendChild(country)
    firstRow.appendChild(gold)
    firstRow.appendChild(silver)
    firstRow.appendChild(bronze)
    firstRow.appendChild(total)

    tableHead.appendChild(firstRow)

    const tableBody = document.createElement('tbody')

    for (let i = 0; i < tableData.length; i++) {
      const tr = document.createElement('tr')
      const cPosition = document.createElement('td')
      const cName = document.createElement('td')
      const cGold = document.createElement('td')
      const cSilver = document.createElement('td')
      const cBronze = document.createElement('td')
      const cTotal = document.createElement('td')

      cPosition.innerText = `${tableData[i].position}°`
      cName.innerHTML = `<img src="${tableData[i].flag_url}" alt="Bandeira do país, ${tableData[i].country}." /> ${tableData[i].country}`
      cGold.innerText = `${tableData[i].medal_gold}`
      cSilver.innerText = `${tableData[i].medal_silver}`
      cBronze.innerText = `${tableData[i].medal_bronze}`
      cTotal.innerText = `${tableData[i].medal_gold +
        tableData[i].medal_silver + tableData[i].medal_bronze}`

      tr.appendChild(cPosition)
      tr.appendChild(cName)
      tr.appendChild(cGold)
      tr.appendChild(cSilver)
      tr.appendChild(cBronze)
      tr.appendChild(cTotal)

      tableBody.appendChild(tr)
    }

    table.appendChild(tableHead)
    table.appendChild(tableBody)
    this._tableWrapper.appendChild(table)
  }

  createButton(name, text) {
    const button = document.createElement('button')

    button.innerText = text
    button.classList.add(`arrow-${this._orderButtons[name]}`)
    button.addEventListener('click', function () {
      if (this._orderButtons[name] === 'down') {
        this._orderButtons[name] = 'up'
      } else {
        this._orderButtons[name] = 'down'
      }

      this.resetTables()
      this.createTable(CountryDB.sortBy(
        this._database.findByName(this._countryInput.value),
        name,
        this._orderButtons[name]
      ))
    }.bind(this))

    return button
  }

  addListener() {
    this._searchButton.addEventListener('click', function () {
      const name = this._countryInput.value
      const tableData = this._database.findByName(name)
      this.resetTables()
      this.createTable(tableData)
    }.bind(this))
  }

  resetTables() {
    this._tableWrapper.innerHTML = ''
  }
}

export { Interface }

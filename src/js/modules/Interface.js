import { CountryDB } from './CountryDB.js'

class Interface {
  static countryInput = document.getElementById('country-search')
  static tableWrapper = document.getElementById('table-wrapper')
  static searchButton = document.getElementById('search-box__button')

  static createTable(tableData) {
    const table = document.createElement('table')
    const tableHead = document.createElement('thead')
    const firstRow = document.createElement('tr')
    const position = document.createElement('th')
    const country = document.createElement('th')
    const gold = document.createElement('th')
    const silver = document.createElement('th')
    const bronze = document.createElement('th')
    const total = document.createElement('th')

    position.innerText = 'Posição'
    country.innerText = 'País'
    gold.innerText = 'Ouro'
    silver.innerText = 'Prata'
    bronze.innerText = 'Bronze'
    total.innerText = 'Total'

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

      cPosition.innerText = `${tableData[i].id}°`
      cName.innerHTML = `<img src="${tableData[i].flag_url}" alt="Bandeira do ${tableData[i].country}" /> ${tableData[i].country}`
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
    this.tableWrapper.appendChild(table)
  }

  static addListener() {
    this.searchButton.addEventListener('click', function () {
      const name = this.countryInput.value
      const tableData = CountryDB.findByName(name)
      this.resetTables()
      this.createTable(tableData)
    }.bind(this))
  }

  static resetTables() {
    this.tableWrapper.innerHTML = ''
  }
}

export { Interface }

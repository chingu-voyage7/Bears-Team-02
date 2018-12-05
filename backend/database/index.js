const readline = require('readline')
const seedWithCSV = require('./seed1')
const seedWithSheets = require('./seed2')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// gives the user the choice to seeding with a local csv file or using the Sheets API
function getSeedOption() {
  rl.question('Seed database with CSV file or from Sheets API? (csv/ss) ', choice => {
    rl.close()
    if (choice === 'csv') {
      seedWithCSV()
    } else if (choice === 'ss') {
      seedWithSheets()
    } else {
      console.log('Enter one of the choices dum dum. "csv" or "ss" 😀')
    }
  })
}

getSeedOption()

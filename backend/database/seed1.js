require('dotenv').config()
const parse = require('csv-parse')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const generateData = require('./generateData')
const readFile = promisify(fs.readFile)
const parseAsync = promisify(parse)

// csv file must be named data.csv
const filepath = path.join(__dirname, 'data.csv')
// parse a local csv file and seed the database
module.exports = async () => {
  const raw = await readFile(filepath)
  const parsed = await parseAsync(raw)
  generateData(parsed)
}

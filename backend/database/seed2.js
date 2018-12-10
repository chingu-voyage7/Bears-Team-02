require('dotenv').config()
const readline = require('readline')
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const generateData = require('./generateData')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// seeds the datbase from a Google Sheet
module.exports = async () => {
  authorize(getSpreadSheet)
}
// google sheets readonly scope
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// token generated to access sheets api
const TOKEN_PATH = path.join(__dirname, 'token.json')
console.log(TOKEN_PATH)
// authorize sheets api and create new token if needed
async function authorize(callback) {
  const sheetsAPI = new google.auth.OAuth2(
    process.env.GOOGLE_SHEET_ID,
    process.env.GOOGLE_SHEET_SECRET,
    process.env.GOOGLE_SHEET_REDIRECT
  )
  try {
    const token = await readFile(TOKEN_PATH)
    sheetsAPT.setCredentials(JSON.parse(token))
    callback(sheetsAPI)
  } catch (error) {
    getNewToken(sheetsAPI, callback)
  }
}

// fetches our spreadsheet and range of rows
async function getSpreadSheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  const getSheet = promisify(sheets.spreadsheets.values.get)
  try {
    const response = await getSheet({
      spreadsheetId: '1qJmXlX_Ul31d5qxtfBpsinsWlvSOk8sIqzg7ce2njGY',
      range: 'Sheet1'
    })
    if (response) {
      generateData(response.data.values)
    }
  } catch (error) {
    console.log('The API returned an error: ' + error)
  }
}

// gets and sets a new token
function getNewToken(sheetsAPI, callback) {
  const authUrl = sheetsAPI.generateAuthUrl({ access_type: 'offline', scope: SCOPES })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    sheetsAPI.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      sheetsAPI.setCredentials(token)
      try {
        writeFile(TOKEN_PATH, JSON.stringify(token))
        callback(sheetsAPI)
      } catch (error) {
        console.error(error)
      }
    })
  })
}

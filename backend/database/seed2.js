require('dotenv').config()
const bcrypt = require('bcryptjs')
const readline = require('readline')
const { google } = require('googleapis')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// allows use of promises and async/await
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// google sheets readonly scope
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

// token generated to access sheets api
const TOKEN_PATH = path.join(__dirname, 'token.json')

// used to populate database
const date = new Date().toISOString()
const userImage = 'https://s3-us-west-1.amazonaws.com/simple-blogger-react/avatar-100x100.png'
const reviewText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

// main function
async function main() {
  authorize(getSpreadSheet)
}

// authorize sheets api and create new token if needed
async function authorize(callback) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SHEET_ID,
    process.env.GOOGLE_SHEET_SECRET,
    process.env.GOOGLE_SHEET_REDIRECT
  )
  try {
    const token = await readFile(TOKEN_PATH)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  } catch (error) {
    getNewToken(oAuth2Client, callback)
  }
}

// gets and sets a new token
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      oAuth2Client.setCredentials(token)
      try {
        writeFile(TOKEN_PATH, JSON.stringify(token))
        callback(oAuth2Client)
      } catch (error) {
        console.error(error)
      }
    })
  })
}

// fetches a spreadsheet and range of rows
// id is for' the source' spreadsheet and range is entire first sheet
async function getSpreadSheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  const getSheet = promisify(sheets.spreadsheets.values.get)
  try {
    const response = await getSheet({
      spreadsheetId: '1qJmXlX_Ul31d5qxtfBpsinsWlvSOk8sIqzg7ce2njGY',
      range: 'Sheet1'
    })
    if (response) {
      const rows = response.data.values
      seedDatabase(rows)
    }
  } catch (error) {
    console.log('The API returned an error: ' + error)
  }
}

// helpers to generate and send data to prisma
async function seedDatabase(rows) {
  // create post nodes
  // trims spaces and upper case for enums
  // skip index 0, it is the title row
  const nodes = rows.map((el, index) => {
    if (index === 0) return
    const obj1 = {
      _typeName: 'Post',
      id: index.toString(),
      language: el[1].toUpperCase().trim(),
      contentType: el[3].toUpperCase().trim(),
      difficulty: el[7].toUpperCase().trim(),
      title: el[4],
      description: el[5],
      author: el[6],
      href: el[9],
      image: el[10],
      price: el[8].toUpperCase().trim(),
      createdAt: date
    }
    return obj1
  })

  // tags are a list(array) and have to be sent seperately
  // split tags on comma and trim any white space
  const lists = rows.map((el, index) => {
    if (index === 0) return
    const tags = el[2].split(',').map(tag => tag.trim())
    const obj2 = { _typeName: 'Post', id: index.toString(), tags }
    return obj2
  })

  const password = await bcrypt.hash('password', 10)
  // initial user
  const user = {
    _typeName: 'User',
    id: '100',
    name: 'Benjamin',
    email: 'ben@gmail.com',
    password: password,
    image: userImage,
    role: 'USER',
    createdAt: date
  }
  // add user to nodes
  nodes.push(user)

  // relate each post to the user
  const relations = rows.map((el, index) => {
    if (index === 0) return
    const obj3 = { _typeName: 'User', id: '100', fieldName: 'posts' }
    const obj4 = { _typeName: 'Post', id: index.toString(), fieldName: 'user' }
    return [obj3, obj4]
  })

  // only needs to be defined once
  const obj5 = { _typeName: 'User', id: '100', fieldName: 'reviews' }

  // create a review for each post
  // has random rating between 1 and 5
  for (let i = 1; i < rows.length; i++) {
    const reviewId = (i * 200).toString()
    const review = {
      _typeName: 'Review',
      id: reviewId,
      rating: Math.ceil(Math.random() * 5),
      text: reviewText,
      createdAt: date
    }
    nodes.push(review)

    // relate each review to our user
    // relate each review to its own post
    // add to relations
    const obj6 = { _typeName: 'Review', id: reviewId, fieldName: 'user' }
    const obj7 = { _typeName: 'Post', id: i.toString(), fieldName: 'reviews' }
    const obj8 = { _typeName: 'Review', id: reviewId, fieldName: 'post' }
    const arr1 = [obj5, obj6]
    const arr2 = [obj7, obj8]
    relations.push(arr1)
    relations.push(arr2)
  }

  // finalize object structure
  // slice off null value for title row
  const NODES = { valueType: 'nodes', values: nodes.slice(1) }
  const LISTS = { valueType: 'lists', values: lists.slice(1) }
  const RELATIONS = { valueType: 'relations', values: relations.slice(1) }

  // send to import endpoint
  try {
    await sendData(NODES)
    await sendData(LISTS)
    await sendData(RELATIONS)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('🌱‍  Prisma seed planted 🌱')
  }
}

async function sendData(data) {
  return await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PRISMA_TOKEN}`
    },
    url: `${process.env.PRISMA_ENDPOINT}/import`,
    data
  })
}

module.exports = main

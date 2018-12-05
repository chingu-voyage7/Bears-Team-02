const axios = require('axios')
const bcrypt = require('bcryptjs')

// Prisma Database seeding script
// Data must be in Normalized Data Format
// https://www.prisma.io/docs/prisma-cli-and-configuration/data-import-and-export-jsw9/#normalized-data-format
module.exports = async rows => {
  // use same date string for createdAt
  const date = new Date().toISOString()
  // hash password of 'password' for user
  const password = await bcrypt.hash('password', 10)
  // image for user
  const userImage = 'https://s3-us-west-1.amazonaws.com/simple-blogger-react/avatar-100x100.png'
  // lorem ipsum review text
  const reviewText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  // dummy user
  const user = {
    _typeName: 'User',
    id: '100',
    name: 'User',
    email: 'user@gmail.com',
    password: password,
    image: userImage,
    role: 'USER',
    createdAt: date
  }
  // dummy admin
  const admin = {
    _typeName: 'User',
    id: '101',
    name: 'Admin',
    email: 'admin@gmail.com',
    password: password,
    image: userImage,
    role: 'ADMIN',
    createdAt: date
  }
  // used to relate user to review
  const obj5 = { _typeName: 'User', id: '100', fieldName: 'reviews' }
  // helper function to send post request
  // token generated with `prisma token` command
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
  // create post nodes
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
  // add the user and the admin to nodes
  nodes.push(user, admin)
  // create list for post tags array
  const lists = rows.map((el, index) => {
    if (index === 0) return
    const tags = el[2].split(',').map(tag => tag.trim())
    const obj2 = { _typeName: 'Post', id: index.toString(), tags }
    return obj2
  })
  // create relations to relate user to post and vice versa
  const relations = rows.map((el, index) => {
    if (index === 0) return
    const obj3 = { _typeName: 'User', id: '100', fieldName: 'posts' }
    const obj4 = { _typeName: 'Post', id: index.toString(), fieldName: 'user' }
    return [obj3, obj4]
  })
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
    // relate each review to user
    // relate each review to a post
    const obj6 = { _typeName: 'Review', id: reviewId, fieldName: 'user' }
    const obj7 = { _typeName: 'Post', id: i.toString(), fieldName: 'reviews' }
    const obj8 = { _typeName: 'Review', id: reviewId, fieldName: 'post' }
    const arr1 = [obj5, obj6]
    const arr2 = [obj7, obj8]
    relations.push(arr1, arr2)
  }
  // finalize NDF object structure
  // slice off null value for title row
  const NODES = { valueType: 'nodes', values: nodes.slice(1) }
  const LISTS = { valueType: 'lists', values: lists.slice(1) }
  const RELATIONS = { valueType: 'relations', values: relations.slice(1) }
  // make post requests to prisma database for each valueType
  try {
    await sendData(NODES)
    await sendData(LISTS)
    await sendData(RELATIONS)
  } catch (error) {
    console.log('Error seeding database:  ', error)
  } finally {
    console.log('Database seeded successfully👍')
  }
}

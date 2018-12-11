const axios = require('axios')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')

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
    password,
    image: userImage,
    role: 'USER',
    createdAt: date
  }

  function fakeId() {
    return uuid()
      .slice(0, 10)
      .replace(/-/g, '')
  }
  // add all contributors as admins
  const us = ['ben', 'leen', 'frank', 'eric']
  function createAdmin(name) {
    return {
      _typeName: 'User',
      id: fakeId(),
      name,
      email: `${name}@gmail.com`,
      password,
      image: userImage,
      role: 'ADMIN',
      createdAt: date
    }
  }
  // used to relate user to review
  const obj5 = { _typeName: 'User', id: '100', fieldName: 'reviews' }
  // helper function to send post request
  // token generated with `prisma token` command
  async function sendData(data) {
    await axios({
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

  // create admins
  us.forEach(u => nodes.push(createAdmin(u)))

  // add the user and the admin to nodes
  nodes.push(user)
  // create list for post tags array
  const lists = rows.map((el, index) => {
    if (index === 0) return
    let tags = el[2].split(',').map(tag => tag.trim())
    // if (tags[0] === '') {
    //   tags = []
    // }
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
    const reviewId1 = fakeId()
    const reviewId2 = fakeId()
    const reviewId3 = fakeId()
    const review1 = {
      _typeName: 'Review',
      id: reviewId1,
      rating: Math.ceil(Math.random() * 5),
      text: reviewText,
      createdAt: date
    }
    const review2 = {
      _typeName: 'Review',
      id: reviewId2,
      rating: Math.ceil(Math.random() * 5),
      text: reviewText,
      createdAt: date
    }
    const review3 = {
      _typeName: 'Review',
      id: reviewId3,
      rating: Math.ceil(Math.random() * 5),
      text: reviewText,
      createdAt: date
    }
    nodes.push(review1, review2, review3)
    // relate each review to user
    // relate each review to a post
    const obj6 = { _typeName: 'Review', id: reviewId1, fieldName: 'user' }
    const obj7 = { _typeName: 'Post', id: i.toString(), fieldName: 'reviews' }
    const obj8 = { _typeName: 'Review', id: reviewId1, fieldName: 'post' }

    const obj9 = { _typeName: 'Review', id: reviewId2, fieldName: 'user' }
    const obj10 = { _typeName: 'Review', id: reviewId2, fieldName: 'post' }

    const obj11 = { _typeName: 'Review', id: reviewId3, fieldName: 'user' }
    const obj12 = { _typeName: 'Review', id: reviewId3, fieldName: 'post' }

    const arr1 = [obj5, obj6]
    const arr2 = [obj7, obj8]
    const arr3 = [obj5, obj9]
    const arr4 = [obj7, obj10]
    const arr5 = [obj5, obj11]
    const arr6 = [obj7, obj12]
    relations.push(arr1, arr2, arr3, arr4, arr5, arr6)
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

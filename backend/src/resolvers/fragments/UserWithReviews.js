module.exports = `
  fragment UserWithPosts on User {
    id
    name
    email
    role
    image
    createdAt
    reviews {
      id
      text
      rating
      createdAt
    }
  }
`

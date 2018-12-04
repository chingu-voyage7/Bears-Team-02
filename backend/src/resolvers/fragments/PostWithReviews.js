module.exports = `
  fragment PostWithReviews on Post {
    id
    language
    title
    description
    contentType
    difficulty
    price
    author
    href
    image
    tags
    createdAt
    reviews {
      id
      text
      rating
      createdAt
      user {
        id
        name
        email
        image
      }
    }
    user {
      id
      name
      email
      image
    }
  }
`

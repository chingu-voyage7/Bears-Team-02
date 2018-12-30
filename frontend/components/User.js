import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      oauthId
      role
      reviews {
        id
        post
      }
    }
  }
`

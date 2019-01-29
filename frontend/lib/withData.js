import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

const uri = 'https://the-source-heroku-344cf1b138.herokuapp.com/'

function createClient({ headers }) {
  return new ApolloClient({
    uri,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })
    },
  })
}

export default withApollo(createClient)

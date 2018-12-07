import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Page from '../components/Page'
import withData from '../lib/withData'
import '../styles/main.scss'

class MyApp extends App {
  render() {
    const { Component, apollo } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)

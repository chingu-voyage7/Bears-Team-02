import App, { Container } from 'next/app'

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {}
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }
  //   pageProps.query = ctx.query
  //   return { pageProps }
  // }
  render() {
    const { Component } = this.props

    return (
      <Container>
            <Component />
      </Container>
    )
  }
}
import React, { Component } from 'react'
import Header from './Header'

// class Page extends Component {
//   render() {
//     return <div>{this.props.children}</div>
//   }
// }
class Page extends Component {
  render() {
    return (
      <>
        <Header />
        <div>{this.props.children}</div>
      </>
    )
  }
}

export default Page

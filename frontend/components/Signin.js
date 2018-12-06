import React, { Component } from 'react'

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <form>
        <h2>Sign into your account</h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.saveToState}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.saveToState}
          />
        </label>
      </form>
    )
  }
}

export default Signin

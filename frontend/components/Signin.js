import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
      role
      image
    }
  }
`

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = async (e, signin) => {
    e.preventDefault()
    await signin({ variables: { ...this.state } })
    this.setState({ email: '', password: '' })
    Router.push('/')
  }

  render() {
    return (
      <Mutation mutation={SIGNIN_MUTATION}>
        {(signin, { data, loading, error }) => (
          <form className="signin-form" action="POST" onSubmit={e => this.handleSubmit(e, signin)}>
            <h2>Sign into your account</h2>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.saveToState}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.saveToState}
            />
            <button type="submit">Login</button>
            <a className="signup__google" href="http://localhost:7272/google">
              Sign In with Google
            </a>
            <br />
            {data && <div>{JSON.stringify(data)}</div>}
          </form>
        )}
      </Mutation>
    )
  }
}

export default Signin

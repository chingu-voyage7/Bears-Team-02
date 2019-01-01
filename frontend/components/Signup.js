import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import DisplayError from './DisplayError'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
      role
      image
      createdAt
    }
  }
`

class Signup extends Component {
  state = {
    name: '',
    password: '',
    email: ''
  }

  saveToState = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = async (e, signup) => {
    e.preventDefault()
    await signup({ variables: { ...this.state } })
    this.setState({ name: '', email: '', password: '' })
    // refetch user query
    // route to wherever we want!
    Router.push('/signin')
  }

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION}>
        {(signup, { data, loading, error }) => (
          <div className="signup-component">
            <div className="Container">
              <h2 className="signup-title">Sign Up for An Account</h2>
              <form
                className="signup-form"
                method="POST"
                onSubmit={e => this.handleSubmit(e, signup)}
              >
                <label className="signup-name-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="signup-name-input"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />

                <label className="signup-email-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="signup-email-input"
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
                <label className="signup-password-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="signup-password-input"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />

                <button className="signup-button" type="submit">
                  Sign Up
                </button>
                <a className="signup__google" href="http://localhost:7272/google">
                  Sign Up with Google
                </a>
                <br />
                <DisplayError error={error} />
              </form>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Signup

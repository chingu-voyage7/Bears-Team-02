import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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
    email: '',
  }

  saveToState = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = async (e, signup) => {
    e.preventDefault()
    await signup({ variables: { ...this.state } })
    this.setState({ name: '', email: '', password: '' })
    // refetch user query
    // route to wherever we want!
  }

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION}>
        {(signup, { data, loading, error }) => (
          <form method="POST" onSubmit={e => this.handleSubmit(e, signup)}>
            <h2>Sign Up for An Account</h2>
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

            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="name"
                value={this.state.name}
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

            <button type="submit">Sign Up!</button>
            <br />
            {data && <div>{JSON.stringify(data)}</div>}
          </form>
        )}
      </Mutation>
    )
  }
}

export default Signup

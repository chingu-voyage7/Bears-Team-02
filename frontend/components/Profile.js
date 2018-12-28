import React, { Component } from 'react'

class Profile extends Component {
  render() {
    const { id, name, image, email, password } = this.state
    return (
      <div className="profile-component">
        <div className="Container">
          <h2 className="profile-title">User Profile Setting</h2>
          <form className="profile-form" method="post" action="">
            <label htmlFor="name">Username</label>
            <input type="text" name="name" id="name" placeholder="username" unique required />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="me@email.com" />
            <label htmlFor="password">Reset Password</label>
            <input type="password" name="password" id="password" placeholder="password" />
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" id="password2" placeholder="password" />
            <label htmlFor="avatar">Profile Image</label>
            <input type="string" name="image" id="profile_image" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Profile

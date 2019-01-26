import React from 'react'
import Router from 'next/router'
import Categories from './Categories'

class Home extends React.Component {
  onPostClick = id => {
    Router.push({ pathname: '/posts' })
  }

  render() {
    return (
      <>
        <div className="home">
          <div className="home-title">
            <span className="logo_curly">&#123;</span>
            <h2 className="h2">the_source</h2>
            <span className="logo_curly">&#125;</span>
          </div>
          <button className="home-button" onClick={() => this.onPostClick()}>
            Start Search
          </button>
        </div>
        <Categories />
        {/* <LandingSearch /> */}
      </>
    )
  }
}

export default Home

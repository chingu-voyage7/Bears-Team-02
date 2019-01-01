import React from 'react'

class LandingSearch extends React.Component {
  state = {
    placeholder: false,
  }

  render() {
    return (
      <div className="landing-search-container">
        <div className="landing-search-bar">
          <select className="landing-dropdown">
            <option value="react">React</option>
            <option value="javascript">JavaScript</option>
            <option selected value="python">
              Python
            </option>
            <option value="java">Java</option>
          </select>
          <input className="landing-search-input" />
          <button className="landing-submit-button">&#x1f50d;</button>
        </div>
      </div>
    )
  }
}
export default LandingSearch

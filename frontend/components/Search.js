import React from 'react'

class Search extends React.Component {
  state = {
    search: '',
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.props.handleChange(e.target.value, this.props.client)
  }

  render() {
    return (
      <div className="search">
        <input
          className="search__bar"
          type="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Find resources"
          name="search"
        />
        <button className="search__button" type="submit">
          🔍
        </button>
      </div>
    )
  }
}

export default Search

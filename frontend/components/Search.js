import React from 'react'

const Search = () => (
  <div className="search">
    <form className="search__form" action="search">
      <input className="search__bar" type="text" placeholder="Find resources" name="search" />
      <button className="search__button" type="submit">
        🔍
      </button>
    </form>
  </div>
)
export default Search

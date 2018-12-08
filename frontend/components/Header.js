import Link from 'next/link'
import Router from 'next/router'
import Nav from './Nav'
import Search from './Search'

const Header = () => (
  <>
    <div className="bar">
      <Link href="/">
        <a>the_source</a>
      </Link>
      <Nav />
      <Search />
    </div>
  </>
)

export default Header

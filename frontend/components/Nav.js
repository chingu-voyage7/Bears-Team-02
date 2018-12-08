import Link from 'next/link'

const Nav = () => (
  <div className="navbar">
    <Link href="/about">
      <a>About Us</a>
    </Link>
    <Link href="/search">
      <a>Search</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/signin">
      <a>Signin</a>
    </Link>
  </div>
)

export default Nav

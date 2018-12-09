import Link from 'next/link'

const Nav = () => (
  <nav className="nav">
    <Link href="/signin">
      <a className="nav__item">Signin</a>
    </Link>
    <Link href="/signup">
      <a className="nav__item">Signup</a>
    </Link>
  </nav>
)

export default Nav

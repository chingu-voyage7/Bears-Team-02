import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import Nav from './Nav'
import Search from './Search'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Header = props => (
  <header className="header">
    <Link href="/">
      <a className="logo">
        <span className="logo__curly">&#123;</span>
        the_source
        <span className="logo__curly">&#125;</span>
      </a>
    </Link>
    <Search handleChange={props.handleChange} client={props.client} />
  {/*<Search />*/}
    <Nav />
  </header>
)

export default Header

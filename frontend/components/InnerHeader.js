import Link from 'next/link'
import Router, { withRouter } from 'next/router'
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

const InnerHeader = props => (
  <header className="innerheader">
    <Link href="/">
      <a className="logo">
        <span className="logo__curly">&#123;</span>
        the_source
        <span className="logo__curly">&#125;</span>
      </a>
    </Link>
    <Search client={props.client} handleChange={props.handleChange} />
    <Nav />
  </header>
)

export default InnerHeader

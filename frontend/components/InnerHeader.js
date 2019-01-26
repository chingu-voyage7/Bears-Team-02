import Link from 'next/link'
import Nav from './Nav'
import Search from './Search'

const InnerHeader = props => (
  <header className="innerheader">
    <Link href="/">
      <a className="logo">
        <span className="logo__curly">&#123;</span>
        the_source
        <span className="logo__curly">&#125;</span>
      </a>
    </Link>
    <Search
      client={props.client}
      term={props.term}
      handleChange={props.handleChange}
      handleClick={props.handleClick}
    />
    {/* <Nav /> */}
  </header>
)

export default InnerHeader

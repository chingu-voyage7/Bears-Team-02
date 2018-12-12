import React from 'react'
import { ApolloConsumer, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import InnerHeader from './InnerHeader'
import averageRating from '../lib/averageRating'

// max number of posts returned per page
const perPage = 30

// the mongoloid
const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY(
    $term: String,
    $difficulty: [Difficulty!],
    $price: [PriceRange!],
    $first: Int = ${perPage},
    $skip: Int = 0,
    $orderBy: PostOrderByInput = title_ASC
    ) {
    posts(
      where: {
        AND: [
          { difficulty_in: $difficulty },
          { price_in: $price }
          {
            OR: [
            { title_contains: $term },
            { description_contains: $term },
            { author_contains: $term }
            ]
          }

        ]

      },
      first: $first,
      skip: $skip,
      orderBy: $orderBy) {
      id
      title
      description
      language
      contentType
      tags
      image
      href
      author
      difficulty
      price
      createdAt
      reviews {
        id
        text
        rating
        createdAt
      }
    }
  }
`
// order by filters
const ORDER_BY = [
  { text: 'Alphabetical', value: 0 },
  { text: 'Highest Rating', value: 1 },
  { text: 'Most Reviewed', value: 2 },
]
// difficulty filters
const DIFFICULTY = ['EASY', 'MID', 'HARD', 'EXPERT']

// price filters
const PRICE = ['FREE', 'LOW', 'MID', 'HIGH']
const formatPriceLabel = p => {
  const i = PRICE.indexOf(p)
  if (i === 0) return 'FREE'
  if (i === 1) return '$'
  if (i === 2) return '$$'
  if (i === 3) return '$$$'
  return null
}

// stops empty array going to query
// makes default search for all filters
function getQueryValue(arr, i) {
  const params = [DIFFICULTY, PRICE]
  if (!arr.length) {
    return params[i]
  }
  return arr
}

class Posts extends React.Component {
  state = {
    loading: false,
    posts: [],
    avgs: [],
    term: '',
    price: [],
    difficulty: [],
    orderBy: 0,
  }

  // adds listener for internal route change
  componentDidMount() {
    Router.events.on('routeChangeStart', this.handleRouteChange)
    this.restoreSearchParams()
  }

  // clean up for event listeners
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouteChange)
  }

  // deep equal check on posts array
  // when posts change find the average rating and rebuild post w/Object.assign
  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.posts, this.state.posts)) {
      const avgs = this.state.posts.map(post => averageRating(post.reviews))
      const postsWithAvg = this.state.posts.map((post, i) =>
        Object.assign({}, post, { averageRating: avgs[i] }))
      this.setState({ posts: postsWithAvg })
    }
  }

  // debounce to .5s against user key input
  handleChange = debounce(async (term, client) => {
    if (!term) return this.setState({ posts: [], term })
    this.setState({ loading: true, term })
    // if no difficulty is selected act as if they all are
    const difficulty = this.state.difficulty.length ? this.state.difficulty : DIFFICULTY
    // query the prisma client directly
    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { term, difficulty },
    })
    return this.setState({ loading: false, posts: res.data.posts })
  }, 500)

  // refetch query when user changes price array
  handlePrice = async (p, client) => {
    this.setState({ loading: true })
    const { difficulty } = this.state
    let { price } = this.state

    if (price.includes(p)) {
      price = price.filter(el => el !== p)
    } else {
      price.push(p)
    }

    const queryPrice = getQueryValue(price, 1)
    const queryDifficulty = getQueryValue(difficulty, 0)

    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { term: this.state.term, price: queryPrice, difficulty: queryDifficulty },
    })

    this.setState({ loading: false, price, posts: res.data.posts })
  }

  // refetch every time user changes difficulty array
  handleDifficulty = async (d, client) => {
    this.setState({ loading: true })
    const { price } = this.state
    let { difficulty } = this.state
    // filter or replace based on pre existance
    if (difficulty.includes(d)) {
      difficulty = difficulty.filter(el => el !== d)
    } else {
      difficulty.push(d)
    }
    // check to see if none are checked
    const queryPrice = getQueryValue(price, 1)
    const queryDifficulty = getQueryValue(difficulty, 0)
    // query prisma with both search term and difficulty
    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { term: this.state.term, difficulty: queryDifficulty, price: queryPrice },
    })
    this.setState({ loading: false, difficulty, posts: res.data.posts })
  }

  // no query to prisma here, just sort what we have
  handleOrderBy = e => {
    const orderBy = Number(e.target.value)
    const { posts } = this.state
    let sortedPosts
    // simple alphabetical sort this is default for now
    if (orderBy === 0) {
      sortedPosts = posts.sort((a, b) => {
        const x = a.title.toLowerCase()
        const y = b.title.toLowerCase()
        if (x < y) return -1
        if (x > y) return 1
        return 0
      })
      // find the averages and sort from highest to lowest average
    } else if (orderBy === 1) {
      sortedPosts = posts.sort((a, b) => averageRating(b.reviews) - averageRating(a.reviews))
      // count reviews and sort from most to least
    } else {
      sortedPosts = posts.sort((a, b) => b.reviews.length - a.reviews.length)
    }
    this.setState({ posts: sortedPosts, orderBy })
  }

  // helper to render tag strings
  renderTags = tags =>
    tags.map((tag, i) => {
      if (i > 6) return null
      return (
        <span className="post__tags__item" key={tag}>
          {tag.slice(0, 10)}
        </span>
      )
    })

  // turns numeric rating to fire emojis
  renderRating = x => {
    let str = ''
    for (let i = 0; i < x; i += 1) {
      str += '🔥'
    }
    return <span>{str}</span>
  }

  // navigate to post detail route
  onPostClick = id => {
    Router.push({ pathname: '/post', query: { id } })
  }

  // stores search criteria in session storage
  handleRouteChange = () => {
    const { term, difficulty, price, orderBy } = this.state
    const params = { term, difficulty, price, orderBy }
    sessionStorage.setItem('parameters', JSON.stringify(params)) // eslint-disable-line
  }

  // restores posts using withApollo HOC and session storage
  restoreSearchParams = async () => {
    const params = JSON.parse(sessionStorage.getItem('parameters')) // eslint-disable-line
    if (!params) return

    const { term, difficulty, price, orderBy } = params
    const queryPrice = getQueryValue(price, 1)
    const queryDifficulty = getQueryValue(difficulty, 0)

    const res = await this.props.client.query({
      query: SEARCH_POSTS_QUERY,
      variables: {
        term,
        difficulty: queryDifficulty,
        price: queryPrice,
      },
    })

    const fakeEvent = { target: { value: orderBy } }
    this.handleOrderBy(fakeEvent)

    this.setState({
      term,
      difficulty,
      price,
      posts: res.data.posts,
      orderBy,
    })
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div className="posts__component">
            <InnerHeader client={client} term={this.state.term} handleChange={this.handleChange} />

            <div className="filter">
              <div className="filter__price">
                {PRICE.map(p => (
                  <span
                    key={p}
                    className="filter__price__option"
                    onClick={() => this.handlePrice(p, client)}
                    style={{ background: this.state.price.includes(p) && '#f4e0ff' }}
                  >
                    {formatPriceLabel(p)}
                  </span>
                ))}
              </div>

              <div className="filter__difficulty">
                {DIFFICULTY.map(d => (
                  <span
                    key={d}
                    className="filter__difficulty__option"
                    onClick={() => this.handleDifficulty(d, client)}
                    style={{ background: this.state.difficulty.includes(d) && '#f4e0ff' }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              <select
                className="filter__orderBy"
                value={this.state.orderBy}
                onChange={this.handleOrderBy}
              >
                {ORDER_BY.map(o => (
                  <option key={o.text} value={o.value}>
                    {o.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="posts">
              <div className="posts__message">
                {!!this.state.posts.length && !this.state.loading && (
                  <p>
                    Browsing <span>[</span>"{this.state.term}"<span>]</span>
                  </p>
                )}
              </div>

              <div className="posts__grid">
                {this.state.posts.map((post, i) => (
                  <div className="post" key={post.id} onClick={() => this.onPostClick(post.id)}>
                    <img src={post.image} width="375" height="375" />
                    <div className="post__info">
                      <div className="post__info__row">
                        <span>Title</span>
                        <span>{post.title.slice(0, 30)}</span>
                      </div>
                      <div className="post__info__row">
                        <span>Author</span>
                        <span>{post.author}</span>
                      </div>
                      <div className="post__info__row">
                        <span>Difficulty</span>
                        <span>{post.difficulty}</span>
                      </div>
                      <div className="post__info__row">
                        <span>Price</span>
                        <span>{post.price}</span>
                      </div>
                      <div className="post__info__row">
                        <span>Rating</span>
                        <span>{this.renderRating(averageRating(post.reviews))}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default withApollo(Posts)

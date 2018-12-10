import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import Header from './Header'
import averageRating from '../lib/averageRating'

const perPage = 30

const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY(
    $term: String,
    $difficulty: [Difficulty!], 
    $first: Int = ${perPage}, 
    $skip: Int = 0, 
    $orderBy: PostOrderByInput = title_ASC
    ) {
    posts(
      where: {
        AND: [
          {difficulty_in: $difficulty},
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

// temporary star rendering
function displayRating(x) {
  let str = ''
  for (let i = 0; i < x; i += 1) {
    str += '🔥'
  }
  return `${str}  (${x}/5)`
}

class Posts extends React.Component {
  state = {
    loading: false,
    posts: [],
    avgs: [],
    term: '',
    difficulty: [],
    orderBy: 0,
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
    this.setState({ loading: true, term })
    // if no difficulty is selected act as if they all are
    const difficulty = this.state.difficulty.length ? this.state.difficulty : DIFFICULTY
    // query the prisma client directly
    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { term, difficulty },
    })
    this.setState({ loading: false, posts: res.data.posts })
  }, 500)

  // refetch every time user changes difficulty array
  handleDifficulty = async (d, client) => {
    this.setState({ loading: true })
    let { difficulty } = this.state
    // filter or replace based on pre existance
    if (difficulty.includes(d)) {
      difficulty = difficulty.filter(el => el !== d)
    } else {
      difficulty.push(d)
    }
    // check to see if none are checked
    let queryDifficulty
    if (!difficulty.length) {
      queryDifficulty = DIFFICULTY
    } else {
      queryDifficulty = difficulty
    }
    // query prisma with both search term and difficulty
    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { term: this.state.term, difficulty: queryDifficulty },
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
      // count reviews not done yet
    } else {
      sortedPosts = posts.reverse()
    }
    this.setState({ posts: sortedPosts, orderBy })
  }

  renderTags = tags =>
    tags.map(tag => (
      <span className="post__tags__item" key={tag}>
        {tag}
      </span>
    ))

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <>
            <Header handleChange={this.handleChange} client={client} />
            <div className="filter">
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
              {this.state.posts.map((post, i) => (
                <div className="post" key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{displayRating(post.averageRating)}</p>
                  <p>{post.author}</p>
                  <p style={{ color: 'red', fontWeight: 'bold' }}>{post.difficulty}</p>
                  <div className="post__tags">{this.renderTags(post.tags)}</div>
                  <img src={post.image} width="100" />
                  <p>{post.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </ApolloConsumer>
    )
  }
}

export default Posts

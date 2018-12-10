import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import InnerHeader from './InnerHeader'

const perPage = 10

const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY(
    $term: String,
    $difficulty: [Difficulty!], 
    $first: Int = ${perPage}, 
    $skip: Int = 0, 
    $orderBy: PostOrderByInput = title_DESC
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
      image
      author
      difficulty
    }
  }
`

const DIFFICULTY = ['EASY', 'MID', 'HARD', 'EXPERT']

class Posts extends React.Component {
  state = {
    loading: false,
    posts: [],
    term: '',
    difficulty: [],
  }

  handleChange = debounce(async (term, client) => {
    this.setState({ loading: true, term })

    const difficulty = this.state.difficulty.length ? this.state.difficulty : DIFFICULTY

    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { term, difficulty },
    })
    this.setState({ loading: false, posts: res.data.posts })
  }, 500)

  handleDifficulty = async (d, client) => {
    this.setState({ loading: true })
    let { difficulty } = this.state

    if (difficulty.includes(d)) {
      difficulty = difficulty.filter(el => el !== d)
    } else {
      difficulty.push(d)
    }

    let queryDifficulty
    if (!difficulty.length) {
      queryDifficulty = DIFFICULTY
    } else {
      queryDifficulty = difficulty
    }

    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { term: this.state.term, difficulty: queryDifficulty },
    })

    this.setState({ loading: false, difficulty, posts: res.data.posts })
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <>
            <InnerHeader handleChange={this.handleChange} client={client} />
            {this.state.loading && <h3>Loading....Do something cool...</h3>}
            <div className="filter">
              {DIFFICULTY.map(d => (
                <span
                  key={d}
                  className="filter__option"
                  onClick={() => this.handleDifficulty(d, client)}
                  style={{ background: this.state.difficulty.includes(d) && '#f4e0ff' }}
                >
                  {d}
                </span>
              ))}
            </div>
            <div>
              {this.state.posts.map(post => (
                <div key={post.id}>
                  <h6>{post.title}</h6>
                  <p>{post.author}</p>
                  <p style={{ color: 'red', fontWeight: 'bold' }}>{post.difficulty}</p>
                  <p>{post.description}</p>
                  <img src={post.image} width="100" />
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

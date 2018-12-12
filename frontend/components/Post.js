import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import DisplayError from './DisplayError'
import InnerHeader from './InnerHeader'
import averageRating from '../lib/averageRating'

const ITEM_QUERY = gql`
  query ITEM_QUERY($id: ID!) {
    post(id: $id) {
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

class Post extends React.Component {
  displayRating = x => {
    let str = ''
    for (let i = 0; i < x; i += 1) {
      str += '🔥'
    }
    return (
      <span>
        {str} <span>{x}/5</span>
      </span>
    )
  }

  render() {
    return (
      <Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <DisplayError error={error} />

          return (
            <>
              <InnerHeader />
              <div className="post__component" style={{ textDecoration: 'none' }}>
                <a href={data.post.href} className="post__href" target="_blank">
                  <div className="post__image">
                    <img src={data.post.image} />
                  </div>
                  <div className="post__detail" style={{ textDecoration: 'none' }}>
                    <h2 className="post__title">{data.post.title}</h2>
                    <p className="post__description">{data.post.description}</p>
                    <p className="post__author">Author: {data.post.author}</p>
                    <p>Language: {data.post.language}</p>
                    <p>Content Type: {data.post.contentType}</p>
                    <p>
                      Tags:
                      {data.post.tags.map((tag, i) => (
                        <p key={`${tag}-${i}`}>{`${tag}, `}</p>
                      ))}
                    </p>
                    <p>Difficulty: {data.post.difficulty}</p>
                    <p>{this.displayRating(averageRating(data.post.reviews))}</p>
                    <p>{data.post.price}</p>
                  </div>
                </a>
              </div>
            </>
          )
        }}
      </Query>
    )
  }
}

export default Post

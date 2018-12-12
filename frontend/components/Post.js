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

  renderTags = tags => tags.map(tag => <span key={tag}>{tag}</span>)

  render() {
    return (
      <Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <DisplayError error={error} />
          const {
            image,
            title,
            description,
            author,
            language,
            href,
            contentType,
            tags,
            difficulty,
            reviews,
            price,
          } = data.post
          return (
            <>
              <InnerHeader />
              <div className="post__component">
                <a href={href} className="post__href" target="_blank">
                  <div className="post__image">
                    <img src={image} />
                  </div>
                  <div className="post__detail">
                    <h2 className="post__title">{title}</h2>
                    <p className="post__description">{description}</p>
                    <p className="post__author">Author: {author}</p>
                    <p>Language: {language}</p>
                    <p>Content Type: {contentType}</p>
                    <div className="post__tags">{this.renderTags(tags)}</div>

                    <p>Difficulty: {difficulty}</p>
                    <p>{this.displayRating(averageRating(reviews))}</p>
                    <p>{price}</p>
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

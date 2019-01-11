import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import StarRatingComponent from 'react-star-rating-component'
import DisplayError from './DisplayError'
import averageRating from '../lib/averageRating'
import formatPrice from '../lib/formatPrice'

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
  // displayRating = x => {
  //   let str = ''
  //   for (let i = 0; i < x; i += 1) {
  //     str += '🔥'
  //   }
  //   return (
  //     <span>
  //       {str} <span>{x}/5</span>
  //     </span>
  //   )
  // }

  // navigate to review route
  onReviewClick = (e, id) => {
    e.preventDefault()
    Router.push({ pathname: '/review', query: { id } })
    // console.log('id', id)
  }

  renderTags = tags => tags.map(tag => <span key={tag}>{tag}</span>)

  render() {
    return (
      <Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <DisplayError error={error} />
          const {
            id,
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
            price
          } = data.post
          return (
            <>
              <div className="post-wrapper">
                <button
                  className="review-button"
                  type="submit"
                  onClick={e => this.onReviewClick(e, id)}
                >
                  Write a Review
                </button>
                <div className="post-item">
                  <img src={image} className="post-image" />
                  <div className="post-info">
                    <p>{title}</p>
                    <div className="wrap">
                      <StarRatingComponent
                        className="post_info_rating"
                        name="rating"
                        value={averageRating(reviews)}
                        emptyStarColor="#eee"
                      />

                      <p>{formatPrice(price)}</p>
                      <p>{difficulty}</p>
                    </div>
                    <div className="detail-wrap">
                      <h2>Author</h2>
                      <p>{author}</p>
                      <h2>Description</h2>
                      <p>{description}</p>
                      <h2>Content Type</h2>
                      <p>{contentType}</p>
                    </div>
                    <div className="post-tags">{this.renderTags(tags)}</div>
                  </div>
                </div>
              </div>
              <div className="display-reviews">
                <h2>Reviews</h2>
                console.log('post', post)
                {/* <p>{post.map(review, i)}</p> */}
              </div>
            </>
          )
        }}
      </Query>
    )
  }
}

export default Post

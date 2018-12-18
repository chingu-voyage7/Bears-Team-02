import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import StarRatingComponent from 'react-star-rating-component'
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
            price,
          } = data.post
          return (
            <>
              <InnerHeader />
              <div className="postReview">
                <button
                  className="postReview__button"
                  type="submit"
                  onClick={e => this.onReviewClick(e, id)}
                >
                  ✏️ Write a Review
                </button>
              </div>
              <div className="post__component">
                <a href={href} className="post__href" target="_blank">
                  <div className="post__image">
                    <img src={image} />
                  </div>
                  <div className="post__detail">
                    <h2 className="post__title">{title}</h2>
                    <StarRatingComponent
                      className="post__info__rating"
                      name="rating"
                      value={averageRating(reviews)}
                      emptyStarColor="#eee"
                    />
                    <p>{price}</p>
                    <p>{difficulty} </p>
                    <p className="post__author">{author}</p>
                    {/* <p className="desc">Description</p> */}
                    <p className="post__description">{description}</p>
                    <p>Content Type: {contentType}</p>

                    <div className="post__tags">{this.renderTags(tags)}</div>
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

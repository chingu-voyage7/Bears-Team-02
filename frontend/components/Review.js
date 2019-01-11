import { Query, Mutation } from 'react-apollo'
import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import StarRatingComponent from 'react-star-rating-component'
import DisplayError from './DisplayError'

const ITEM_QUERY = gql`
  query ITEM_QUERY($id: ID!) {
    post(id: $id) {
      id
      title
    }
  }
`
const CREATE_REVIEW_MUTATION = gql`
  mutation CREATE_REVIEW_MUTATION($data: ReviewCreateWithoutUserInput!) {
    createReview(data: $data) {
      id
      rating
      text
    }
  }
`

class Review extends React.Component {
  state = {
    text: '',
    rating: 0
  }

  onStarClick = (n, p, name) => {
    this.setState({ [name]: n })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmitClick = async (e, createReview) => {
    e.preventDefault()

    const res = await createReview({
      variables: {
        data: {
          text: this.state.text,
          rating: this.state.rating,
          post: { connect: { id: this.props.id } }
        }
      }
    })
    // console.log('res.data', res.data)
    Router.push({ pathname: '/post', query: { id: this.props.id } })
  }

  render() {
    return (
      <Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <DisplayError error={error} />
          const { id, title } = data.post
          return (
            <>
              <div className="review-component">
                <div className="starRating-component">
                  <h2 className="review-title">{data.post.title}</h2>
                  <Mutation mutation={CREATE_REVIEW_MUTATION}>
                    {createReview => (
                      <form
                        method="Post"
                        className="review-form"
                        onSubmit={e => this.onSubmitClick(e, createReview)}
                      >
                        <StarRatingComponent
                          name="rating"
                          starCount={5}
                          value={this.state.rating}
                          onStarClick={this.onStarClick}
                          starColor="#FFE100"
                          emptyStarColor="#D2D2D2"
                          editing={true}
                        />
                        <textarea
                          name="text"
                          className="review"
                          id="review"
                          cols="30"
                          rows="10"
                          placeholder="Write your review"
                          onChange={this.onChange}
                        />
                        <button className="submit-review-btn" type="submit">
                          Submit
                        </button>
                      </form>
                    )}
                  </Mutation>
                </div>
              </div>
            </>
          )
        }}
      </Query>
    )
  }
}

export default Review

import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
// import StarRatingComponent from 'react-star-rating-component'
import DisplayError from './DisplayError'
import InnerHeader from './InnerHeader'

const ITEM_QUERY = gql`
  query ITEM_QUERY($id: ID!) {
    post(id: $id) {
      id
      title
    }
  }
`
// const CREATE_REVIEW_MUTATION = gql`
//   mutation CREATE_REVIEW_MUTATION(
//     $id: ID!
//     $rating: Int!
//     $text: String
//     $user: User!
//     $post: Post!
//   ) {
//     createReview(id: $id, rating: $rating, text: $text, user: $user, post: $post) {
//       id
//       rating
//       text
//       user
//       post
//     }
//   }
// `

class Review extends React.Component {
  state = {
    text: '',
  }

  render() {
    return (
      <Query query={ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <DisplayError error={error} />
          const { id, title } = data.post
          return (
            // <Mutation mutataion={CREATE_REVIEW_MUTATION}>
            <>
              <InnerHeader />
              <div className="review__component">
                {/* <div className="starRating__component">
                  <h2>Rating from state: {this.props.rating}</h2>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </div> */}
                <h2 className="review__title">{data.post.title}</h2>
                <form clasName="review__form">
                  <textarea
                    className="review"
                    id="review"
                    cols="30"
                    rows="10"
                    placeholder="Write your review"
                  />
                </form>
              </div>
            </>
            // </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default Review

import React from 'react'
import Router from 'next/router'
import StarRatingComponent from 'react-star-rating-component'
import formatPrice from '../lib/formatPrice'
import averageRating from '../lib/averageRating'

export default class Posts extends React.Component {
  onPostClick = id => {
    Router.push({ pathname: '/post', query: { id } })
  }

  renderTags = tags =>
    tags.map((tag, i) => {
      if (i > 6) return null
      return (
        <span className="post__info__tag" key={tag}>
          {tag.slice(0, 10)}
        </span>
      )
    })

  render() {
    const {
      props: { loading, posts, term }
    } = this

    return (
      <div className="posts">
        <div className="posts__message">
          {!!posts.length && !loading && (
            <p>
              Browsing <span>[</span>"{term}"<span>]</span>
            </p>
          )}
        </div>
        <div className="posts__grid">
          {posts.map((post, i) => (
            <div className="post" key={post.id}>
              <img
                src={post.image}
                width="100"
                height="100"
                onClick={() => this.onPostClick(post.id)}
              />
              <div className="post__info">
                <p className="post__info__title" onClick={() => this.onPostClick(post.id)}>
                  {post.title}
                </p>
                <div className="post__info__middle">
                  <StarRatingComponent
                    className="post__info__rating"
                    name="rating"
                    value={averageRating(post.reviews)}
                    emptyStarColor="#eee"
                  />
                  <p className="post__info__author">{post.author}</p>
                </div>
                <div className="post__info__tags">{this.renderTags(post.tags)}</div>
              </div>
              <div className="post__details">
                <div className="post__details__row">
                  <span>Language</span>
                  <span>
                    <b>[</b> {post.language} <b>]</b>
                  </span>
                </div>
                <div className="post__details__row">
                  <span>Difficulty</span>
                  <span>
                    <b>[</b> {post.difficulty} <b>]</b>
                  </span>
                </div>
                <div className="post__details__row">
                  <span>Price</span>
                  <span>
                    <b>[</b> {formatPrice(post.price)} <b>]</b>
                  </span>
                </div>
                <div className="post__details__row">
                  <span>Content</span>
                  <span>
                    <b>[</b> {post.contentType} <b>]</b>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

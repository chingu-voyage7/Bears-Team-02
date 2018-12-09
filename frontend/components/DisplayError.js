import React from 'react'

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((err, i) => (
      <div key={i}>
        <p data-test="graphql-error">
          <strong>Error</strong>
          {err.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ))
  }
  return (
    <div>
      <p data-test="graphql-error">
        <strong>Error</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  )
}

export default DisplayError

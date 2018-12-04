const { rule, shield, and, or, not } = require('graphql-shield')

// Permissions System - not impletemented yet

// USER role
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return !!ctx.req.user
})

// ADMIN role
const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.req.user.role === 'ADMIN'
})

// map each resolver to combination of roles
const permissions = shield(
  {
    Query: {},
    Mutation: {}
  },
  {
    fallbackError: '🛡 Authorization Denied 🛡'
  }
)

module.exports = { permissions }

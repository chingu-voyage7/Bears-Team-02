const jwt = require('jsonwebtoken')

const permissions = ['USER', 'ADMIN']

const isAuthenticated = (root, args, ctx, info) => {
  if (!ctx.userId) {
    return new Error('🛡 Not Authorized. You must be signed in. 🛡')
  }
  if (!permissions.includes(ctx.user.role)) {
    return new Error('🛡 Not Authorized. You must be signed in. 🛡')
  }
}

const isAdmin = (root, args, ctx, info) => {
  if (!ctx.userId) {
    return new Error('🛡 Not Authorized. You must be signed in. 🛡')
  }
  if (ctx.user.role !== 'ADMIN') {
    return new Error('🛡 Not Authorized. You must be ADMIN. 🛡')
  }
}

const signToken = userId => jwt.sign({ userId }, process.env.JWT_SECRET)

const createCookie = (res, token) => {
  res.cookie(process.env.COOKIE, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
}

module.exports = {
  isAuthenticated,
  isAdmin,
  signToken,
  createCookie
}

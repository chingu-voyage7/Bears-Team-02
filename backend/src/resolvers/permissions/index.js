const jwt = require('jsonwebtoken')

const permissions = ['USER', 'ADMIN']

const isAuthenticated = (root, args, ctx, info) => {
  if (!permissions.includes(ctx.user.role)) {
    return new Error('🛡 Not Authorized. You must be signed in. 🛡')
  }
}

const isAdmin = (root, args, ctx, info) => {
  if (ctx.user.role !== 'ADMIN') {
    return new Error('🛡 Not Authorized. You must be ADMIN. 🛡')
  }
}

function createCookie(ctx, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET)
  ctx.res.cookie(process.env.COOKIE, token, {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
}

module.exports = {
  isAuthenticated,
  isAdmin,
  createCookie
}

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function createCookie(ctx, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET)
  ctx.res.cookie(process.env.COOKIE, token, {
    httpOnly: false,
    path: 'graphql',
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
}

module.exports = {
  signup: async (_, args, ctx, info) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({
      name: args.name,
      email: args.email.toLowerCase(),
      password
    })
    createCookie(ctx, user.id)
    return user
  },

  signin: async (_, args, ctx, info) => {
    const user = await ctx.prisma.user({ email: args.email.toLowerCase() })
    if (!user) {
      throw new Error(`No User for email: ${args.email}`)
    }
    const isValid = await bcrypt.compare(args.password, user.password)
    if (!isValid) {
      throw new Error('Password is not valid')
    }
    createCookie(ctx, user.id)
    return user
  },

  signout: async (_, args, ctx, info) => {
    ctx.res.clearCookie(process.env.COOKIE)
    return { message: 'User signed out' }
  },

  createPost: async (_, args, ctx, info) => {
    const post = await ctx.prisma.createPost({ ...args.data })
    return post
  }
}

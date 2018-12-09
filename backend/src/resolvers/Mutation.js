const bcrypt = require('bcryptjs')
const { combineResolvers } = require('graphql-resolvers')
const { isAdmin, isAuthenticated, createCookie, signToken } = require('./permissions')

const createPost = async (_, args, ctx, info) => {
  const data = Object.assign({}, args.data, { user: { connect: { id: ctx.userId } } })
  return await ctx.prisma.createPost({ ...data })
}

function validateSignup(args) {
  if (!args.email) throw new Error('Error: Email is required!')
  if (!args.name) throw new Error('Error: Name is required!')
  if (!args.password) throw new Error('Error: Password is required!')
}

module.exports = {
  signup: async (_, args, ctx, info) => {
    validateSignup(args)
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({
      name: args.name,
      email: args.email.toLowerCase(),
      password
    })
    createCookie(ctx.res, signToken(user.id))
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
    createCookie(ctx.res, signToken(user.id))
    return user
  },

  signout: async (_, args, ctx, info) => {
    ctx.res.clearCookie(process.env.COOKIE)
    return { message: 'User signed out' }
  },

  createPost,

  isAdminCreatePost: combineResolvers(isAdmin, createPost),

  createReview: combineResolvers(isAuthenticated, async (_, args, ctx, info) => {
    const data = Object.assign({}, args.data, { user: { connect: { id: ctx.userId } } })
    return await ctx.prisma.createReview({ ...data })
  })
}

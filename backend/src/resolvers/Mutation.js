const bcrypt = require('bcryptjs')
const { combineResolvers } = require('graphql-resolvers')
const { isAdmin, isAuthenticated, createCookie } = require('./permissions')

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
    const post = await ctx.prisma.createPost({
      ...args.data,
      user: { connect: { id: ctx.userId } }
    })
    return post
  }

  // example of permission system
  // createPost: combineResolvers(isAdmin, async (_, args, ctx, info) => {
  //   const post = await ctx.prisma.createPost({ ...args.data, user: { connect: { id: ctx.userId } } })
  //   return post
  // })
}

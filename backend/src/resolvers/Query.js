const PostWithReviews = require('./fragments/PostWithReviews')
const UserWithReviews = require('./fragments/UserWithReviews')

module.exports = {
  me: async (_, args, ctx, info) => {
    if (!ctx.user) return null
    return ctx.prisma.user({ id: ctx.userId }).$fragment(UserWithReviews)
  },

  post: async (_, args, ctx, info) =>
    await ctx.prisma.post({ id: args.id }).$fragment(PostWithReviews),

  posts: async (_, args, ctx, info) =>
    await ctx.prisma.posts({ ...args }).$fragment(PostWithReviews),

  postsCount: async (_, args, ctx, info) => {
    const count = await ctx.prisma
      .postsConnection({ ...args })
      .aggregate()
      .count()
    return { count }
  }
}

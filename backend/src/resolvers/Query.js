const PostWithReviews = require('./fragments/PostWithReviews')

module.exports = {
  posts: async (_, args, ctx, info) => {
    const posts = await ctx.prisma.posts({ ...args }).$fragment(PostWithReviews)
    return posts
  }
}

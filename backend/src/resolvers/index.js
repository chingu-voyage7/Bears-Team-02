module.exports = {
  Query: {
    users: async (_, args, ctx, info) => {
      return ctx.prisma.users()
    }
  }
}

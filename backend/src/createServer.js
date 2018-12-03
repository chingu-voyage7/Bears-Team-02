const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')
const { permissions } = require('./middleware/permissions')

function createServer() {
  return new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    middlewares: [permissions],
    context: req => ({
      ...req,
      prisma
    })
  })
}

module.exports = createServer

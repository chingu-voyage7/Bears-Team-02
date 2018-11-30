const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')

function createServer() {
  return new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
      ...req,
      prisma
    })
  })
}

module.exports = createServer

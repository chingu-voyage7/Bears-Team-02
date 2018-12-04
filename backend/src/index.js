require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')
const isUserSignedIn = require('./middleware/isUserSignedIn')
const addUserToRequest = require('./middleware/addUserToRequest')

const path = '/graphql'
const typeDefs = importSchema('./src/schema.graphql')

const app = express()
app.use(cookieParser())
app.use(isUserSignedIn)
app.use(addUserToRequest)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      user: req.user,
      userId: req.userId,
      prisma,
      res
    }
  },
  cors: {
    origin: process.env.FRONTEND_DEV,
    credentials: 'include'
  },
  debug: process.env.DEBUG
})

server.applyMiddleware({ app, path })

app.listen({ port: process.env.PORT }, () =>
  console.log(`Apollo Server > > > http://localhost:${process.env.PORT}${server.graphqlPath} < < <`)
)

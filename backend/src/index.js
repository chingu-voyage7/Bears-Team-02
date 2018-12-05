require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')
const isUserSignedIn = require('./middleware/isUserSignedIn')
const addUserToRequest = require('./middleware/addUserToRequest')
const { googleOauth, googleCallback, googleRedirect, googleScope } = require('./services/passport')

const path = '/graphql'
const typeDefs = importSchema('./src/schema.graphql')
const cors = {
  origin: process.env.FRONTEND_DEV,
  credentials: true
}

const app = express()
app.use(cookieParser())
app.use(isUserSignedIn)
app.use(addUserToRequest)

passport.use(googleOauth)
app.use(passport.initialize())
app.get('/google', googleScope)
app.get('/google/callback', googleCallback, googleRedirect)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    user: req.user,
    userId: req.userId,
    prisma,
    res
  }),
  debug: process.env.DEBUG
})

server.applyMiddleware({ app, path, server, cors })

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀  Apollo Server up at http://localhost:${process.env.PORT}${server.graphqlPath}`)
)

require('dotenv').config()
const server = require('./createServer')()

server.start({ port: process.env.PORT }, () =>
  console.log(`🧘 Graphql Yoga Server FINALLY up on port - ${process.env.PORT}`)
)

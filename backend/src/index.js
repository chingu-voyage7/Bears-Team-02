require('dotenv').config()
const server = require('./createServer')()
const cookieParser = require('cookie-parser')
const isUserSignedIn = require('./middleware/isUserSignedIn')
const addUserToRequest = require('./middleware/addUserToRequest')

server.express.use(cookieParser())
server.express.use(isUserSignedIn)
server.express.use(addUserToRequest)

server.start(
  {
    port: process.env.PORT,
    cors: {
      origin: process.env.FRONTEND_DEV,
      credentials: true
    },
    debug: process.env.DEBUG
  },
  ({ port }) => console.log(`🧘 Graphql Yoga Server Port:${port}`)
)

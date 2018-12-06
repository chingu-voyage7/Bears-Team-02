const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const { prisma } = require('../generated')
const uuid = require('uuid/v4')
const bcrypt = require('bcryptjs')
const { signToken, createCookie } = require('../resolvers/permissions')

let token
const frontend = process.env.NODE_ENV !== 'production' ? process.env.FRONTEND_DEV : ''
const backend = process.env.NODE_ENV !== 'production' ? process.env.BACKEND_DEV : ''

const googleOauth = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${backend}/google/callback`,
    passRequestToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    // 1. Query googleId for user
    const oauthId = profile.id
    const users = await prisma.users({ where: { oauthId } })
    // 2. If no user, create user
    if (!users[0]) {
      // 3. Generate temp password
      const password = uuid()
        .slice(0, 10)
        .replace(/-/g, '')
      const hashedPassword = await bcrypt.hash(password, 10)
      // 4. Create new user
      const newUser = await prisma.createUser({
        oauthId,
        name: profile.displayName,
        password: hashedPassword,
        email: profile.emails[0].value.toLowerCase(),
        image: profile.photos[0].value,
        role: 'USER'
      })
      // 5. Generate new token
      token = signToken(newUser.id)
      // 6. Call done
      return done(null, {})
    } else {
      // 7. Refresh token for existing user
      token = signToken(users[0].id)
      return done(null, {})
    }
  }
)

const googleScope = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
})

const googleCallback = passport.authenticate('google', {
  failureRedirect: frontend,
  session: false
})

// Generate cookie on success redirect
const googleRedirect = (req, res) => {
  createCookie(res, token)
  res.redirect(frontend)
}

module.exports = {
  googleOauth,
  googleScope,
  googleCallback,
  googleRedirect
}

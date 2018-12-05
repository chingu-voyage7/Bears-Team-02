const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const { prisma } = require('../generated')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const bcrypt = require('bcryptjs')

let token

const googleOauth = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `http://localhost:7272/google/callback`,
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
      token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET)
      // 6. Call done
      return done(null, {})
    } else {
      // 7. Refresh token for existing user
      token = jwt.sign({ userId: users[0].id }, process.env.JWT_SECRET)
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
  failureRedirect: process.env.FRONTEND_DEV,
  session: false
})

// Generate cookie on success redirect
const googleRedirect = (req, res) => {
  res.cookie(process.env.COOKIE, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
  res.redirect(process.env.FRONTEND_DEV)
}

module.exports = {
  googleOauth,
  googleScope,
  googleCallback,
  googleRedirect
}

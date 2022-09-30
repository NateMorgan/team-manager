import { Router } from 'express'
import passport from 'passport'

const router = Router()

// Google OAuth login route
router.post("/google", passport.authenticate("google-one-tap", {
  failureRedirect: "/",
  successRedirect: "/profile",
}))

// OAuth logout route
router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) return next(err)
    res.redirect('/')
  })
})

export {
  router
}
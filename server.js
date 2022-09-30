import "dotenv/config.js"
import './config/passport.js'
import createError from 'http-errors'
import session from 'express-session'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import validator from 'validator';
import methodOverride from 'method-override'
import { passDataToView } from './middleware/middleware.js'
import passport from "passport"

// import routers
import { router as authRouter } from './routes/auth.js'
import { router as indexRouter } from './routes/index.js'
import { router as profileRouter } from './routes/profile.js'
import { router as teamRouter } from './routes/team.js'

// set up app
import "./config/database.js"
const app = express()

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
    }
  })
)
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)
app.use(methodOverride('_method'))

app.use(passport.initialize())
app.use(passport.session())

app.use(passDataToView)
// mounted routers
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/team', teamRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export {
  app
}

import { Router } from 'express'
import * as teamCtrl from '../controlers/teams.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET users listing. */
router.get('/', teamCtrl.index)
router.get('/new', teamCtrl.new)

router.post('/', isLoggedIn, teamCtrl.create)

export {
  router
}
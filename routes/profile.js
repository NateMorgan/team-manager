import { Router } from 'express'
import * as profileCtrl from '../controlers/profile.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET users listing. */
router.get('/', isLoggedIn, profileCtrl.show)

export {
  router
}

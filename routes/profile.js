import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET users listing. */
router.get('/', isLoggedIn, profileCtrl.show)
router.get('/:id', profileCtrl.show)
router.get('/:id/edit', isLoggedIn, profileCtrl.edit)

router.put('/:id', isLoggedIn, profileCtrl.update)

export {
  router
}

import { Router } from 'express'
import * as profileCtrl from '../controlers/profile.js'

const router = Router()

/* GET users listing. */
router.get('/', profileCtrl.show)

export {
  router
}

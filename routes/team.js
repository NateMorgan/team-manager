import { Router } from 'express'
import * as teamCtrl from '../controlers/team.js'

const router = Router()

/* GET users listing. */
router.get('/', teamCtrl.index)

export {
  router
}

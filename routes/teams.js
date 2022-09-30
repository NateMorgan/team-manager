import { Router } from 'express'
import * as teamCtrl from '../controlers/teams.js'

const router = Router()

/* GET users listing. */
router.get('/', teamCtrl.index)
router.get('/new', teamCtrl.new)

router.post('/', teamCtrl.create)

export {
  router
}

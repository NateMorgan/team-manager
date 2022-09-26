import { Router } from 'express'
import * as teamCtr from '../controlers/team.js'

const router = Router()

/* GET users listing. */
router.get('/', teamCtr.index)

export {
  router
}

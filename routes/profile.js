import { Router } from 'express'
import * as playerCtr from '../controlers/profile.js'

const router = Router()

/* GET users listing. */
router.get('/', playerCtr.index)

export {
  router
}

import { Router } from 'express'
import * as announceCtrl from "../controllers/announcements.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET home page. */
router.get('/', isLoggedIn, announceCtrl.index)
router.get('/new', isLoggedIn, announceCtrl.new)
router.get('/:id', isLoggedIn, announceCtrl.show)
router.post('/', isLoggedIn, announceCtrl.create)

router.delete('/:id', announceCtrl.delete)

export { 
  router
}

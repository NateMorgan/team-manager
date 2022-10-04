import { Router } from 'express'
import * as announceCtrl from "../controllers/announcements.js"

const router = Router()

/* GET home page. */
router.get('/', announceCtrl.index)
router.get('/new', announceCtrl.new)
router.post('/', announceCtrl.create)

router.delete('/:id', announceCtrl.delete)

export { 
  router
}

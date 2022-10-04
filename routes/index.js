import { Router } from 'express'
import * as announceCtrl from "../controllers/announcements.js"

const router = Router()

/* GET home page. */
router.get('/', announceCtrl.index)
router.get('/new', announceCtrl.new)
router.post('/', announceCtrl.create)

export { 
  router
}

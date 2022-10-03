import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET users listing. */
router.get('/', gamesCtrl.index)
router.get('/new', gamesCtrl.new)

router.post('/', gamesCtrl.create)


export {
  router
}

import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET users listing. */
router.get('/', gamesCtrl.index)
router.get('/new', isLoggedIn, gamesCtrl.new)
router.get('/:id', gamesCtrl.show)
router.get('/:id/comment/new', isLoggedIn, gamesCtrl.newComment)
router.get('/:id/edit', isLoggedIn, gamesCtrl.edit)


router.post('/', isLoggedIn, gamesCtrl.create)
router.post('/:id', isLoggedIn, gamesCtrl.createComment)


router.patch('/:id', isLoggedIn, gamesCtrl.update)

router.delete('/:id', isLoggedIn, gamesCtrl.delete)

export {
  router
}

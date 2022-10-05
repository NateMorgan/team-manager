import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET users listing. */
router.get('/', gamesCtrl.index)
router.get('/new', gamesCtrl.new)
router.get('/:id', gamesCtrl.show)
router.get('/:id/comment/new', gamesCtrl.newComment)
router.get('/:id/edit', gamesCtrl.edit)


router.post('/', gamesCtrl.create)
router.post('/:id', gamesCtrl.createComment)


router.patch('/:id', gamesCtrl.update)

router.delete('/:id', gamesCtrl.delete)

export {
  router
}

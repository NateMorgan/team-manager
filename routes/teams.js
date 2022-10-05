import { Router } from 'express'
import * as teamCtrl from '../controllers/teams.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

/* GET users listing. */
router.get('/', teamCtrl.index)
router.get('/new', isLoggedIn, teamCtrl.new)
router.get('/:id', teamCtrl.show)
router.get('/:id/edit', isLoggedIn, teamCtrl.edit)

router.post('/', isLoggedIn, teamCtrl.create)

router.patch('/:teamid/:playerid/join', isLoggedIn, teamCtrl.joinTeam)
router.patch('/:teamid/:playerid/leave', isLoggedIn, teamCtrl.leaveTeam)
router.delete('/:id', isLoggedIn, teamCtrl.delete)

export {
  router
}

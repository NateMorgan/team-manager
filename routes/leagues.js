import { Router } from "express"
import * as leagueCtrl from "../controllers/leagues.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/',leagueCtrl.index)
router.get('/new', isLoggedIn, leagueCtrl.new)
router.get('/:id', leagueCtrl.show)
router.get('/:id/edit', isLoggedIn, leagueCtrl.edit)

router.post('/', isLoggedIn, leagueCtrl.create)

router.put('/:id', isLoggedIn, leagueCtrl.save)
router.put('/:id/edit', isLoggedIn, leagueCtrl.update)
router.patch('/:leagueid/:teamid/remove', isLoggedIn, leagueCtrl.removeTeam)

router.delete('/:id', isLoggedIn, leagueCtrl.delete)

export {
  router
}
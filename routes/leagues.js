import { Router } from "express"
import * as leagueCtrl from "../controllers/leagues.js"

const router = Router()

router.get('/',leagueCtrl.index)
router.get('/new',leagueCtrl.new)
router.get('/:id', leagueCtrl.show)
router.get('/:id/edit',leagueCtrl.edit)

router.post('/',leagueCtrl.create)

router.put('/:id', leagueCtrl.save)
router.put('/:id/edit', leagueCtrl.update)
router.patch('/:leagueid/:teamid/remove', leagueCtrl.removeTeam)

router.delete('/:id', leagueCtrl.delete)

export {
  router
}
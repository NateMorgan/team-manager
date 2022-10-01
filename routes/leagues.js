import { Router } from "express"
import * as leagueCtrl from "../controlers/leagues.js"

const router = Router()

router.get('/',leagueCtrl.index)
router.get('/new',leagueCtrl.new)


router.post('/',leagueCtrl.create)


export {
  router
}
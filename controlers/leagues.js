import { isLoggedIn } from "../middleware/middleware.js"
import { League } from "../models/league.js"

function index(req,res){
  League.find({})
  .populate("teams")
  .populate("coordinator")
  .then((leagues) => {
    res.render('leagues/index',{
      leagues
    })
  })
}

function newLeague(req,res){
  res.render('leagues/new')
}

function create(req,res){
  req.body.coordinator = req.user.playerProfile._id
  League.create(req.body)
  .then(league => {
    res.redirect('/leagues')
  })
}

export{
  index,
  newLeague as new,
  create,
}
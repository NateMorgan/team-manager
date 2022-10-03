import { isLoggedIn } from "../middleware/middleware.js"
import { Game } from "../models/game.js"
import { Team } from "../models/team.js"

function index(req,res){
  Game.find({})
  .populate("homeTeam")
  .populate("awayTeam")
  .then(games =>{
    res.render('games/index',{
      games
    })
  })
}

function newGame(req,res){
  Team.find({})
  .then(teams =>{
    res.render('games/new',{
      teams
    })
  })
}

function create(req,res){
  req.body.score = ""
  console.log(req.body)
  Game.create(req.body)
  .then(game=>{
    res.redirect('/games')
  })
}

function deleteGame(req,res){
  Game.findById(req.params.id)
  .then(game =>{
    game.delete()
    res.redirect('/games')
  })
}

export{
  index,
  newGame as new,
  create,
  deleteGame as delete,
}
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
  Game.create(req.body)
  .then(game=>{
    Team.updateMany({_id: {$in:[game.homeTeam,game.awayTeam]}},{$addToSet: {games:game._id}})
    .then(()=>{
      res.redirect('/games')
    })
  })
}

function deleteGame(req,res){
  Game.findById(req.params.id)
  .then(game =>{
    Team.updateMany({_id: {$in:[game.homeTeam,game.awayTeam]}},{$pull: {games:game._id}})
    .then(()=>{
      game.delete()
      res.redirect('/games')
    })
  })
}

function edit(req,res){
  Game.findById(req.params.id)
  .populate("homeTeam")
  .populate("awayTeam")
  .then(game =>{
    res.render('games/edit',{
      game
    })
  })
}

function show(req,res){
  Game.findById(req.params.id)
  .populate("homeTeam")
  .populate("awayTeam")
  .populate({
    path:"comments",
    select:"author",
    populate: {
      path:"author",
      select:"name"
    }
  })
  .then(game=>{
    res.render('games/show',{
      game
    })
  })
}

function update(req,res){
  Game.findById(req.params.id)
  .then(game=>{
    game.score = `${req.body.away} - ${req.body.home}`
    game.save()
    .then(()=>{
      res.redirect(`/games/${game._id}`)
    })
  })
}

function newComment(req,res){
  Game.findById(req.params.id)
  .populate("homeTeam")
  .populate("awayTeam")
  .then(game=>{
    res.render('games/comments/new',{
      game
    })
  })
}

function createComment(req,res){
  req.body.author = req.user.playerProfile._id
  Game.findById(req.params.id)
  .then(game=>{
    game.comments.push(req.body)
    game.save()
    .then(()=>{
      res.redirect(`/games/${game._id}`)
    })
  })
}

export{
  index,
  newGame as new,
  create,
  deleteGame as delete,
  edit,
  update,
  show,
  newComment,
  createComment,
}
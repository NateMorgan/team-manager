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
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function newGame(req,res){
  Team.find({})
  .then(teams =>{
    res.render('games/new',{
      teams
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function create(req,res){
  req.body.score = ""
  req.body.creator = req.user.playerProfile._id
  Game.create(req.body)
  .then(game=>{
    Team.updateMany({_id: {$in:[game.homeTeam,game.awayTeam]}},{$addToSet: {games:game._id}})
    .then(()=>{
      res.redirect('/games')
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function deleteGame(req,res){
  Game.findById(req.params.id)
  .then(game =>{
    if (!req.user.playerProfile._id.equals(game.creator)){
      res.redirect('/games')
    }
    Team.updateMany({_id: {$in:[game.homeTeam,game.awayTeam]}},{$pull: {games:game._id}})
    .then(()=>{
      game.delete()
      res.redirect('/games')
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
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
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
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
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function update(req,res){
  Game.findById(req.params.id)
  .then(game=>{
    if (!req.user.playerProfile._id.equals(game.creator)){
      res.redirect('/games')
    }
    game.score = `${req.body.away} - ${req.body.home}`
    game.save()
    .then(()=>{
      res.redirect(`/games/${game._id}`)
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
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
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
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
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
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
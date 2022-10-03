import { isLoggedIn } from "../middleware/middleware.js"
import { League } from "../models/league.js"
import { Team } from "../models/team.js"

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
  Team.find({})
  .then(teams =>{
    res.render('leagues/new', {
      teams
    })
  })
}

function create(req,res){
  req.body.coordinator = req.user.playerProfile._id
  League.create(req.body)
  .then(league => {
    res.redirect(`/leagues/${league._id}/edit`)
  })
}

function deleteLeague(req,res){
  League.findById(req.params.id)
  .then(league =>{
    if (req.user.playerProfile._id.equals(league.coordinator._id)){
      league.delete()
      .then(() =>{
        res.redirect('/leagues')
      })
    }
  })
}

function edit(req,res){
  League.findById(req.params.id)
  .populate("teams")
  .then(league =>{
    if (req.user.playerProfile._id.equals(league.coordinator._id)){
      Team.find( {_id: {$nin: league.teams}})
      .then(teams =>{
        res.render(`leagues/edit`,{
          league,
          teams
        })
      })
    }
  })
}

function update(req,res){
  League.findById(req.params.id)
  .populate("teams")
  .then(league =>{
    if (req.user.playerProfile._id.equals(league.coordinator._id)){
      if (league.teams.indexOf(req.body.teams) < 0){
        league.teams.push(req.body.teams)
        league.save()
      }
      Team.find( {_id: {$nin: league.teams}})
      .then(teams =>{
        res.redirect(`/leagues/${req.params.id}/edit`)
      })
    }
  })
}

function save(req,res){
  console.log(req.body)
  League.findById(req.params.id)
  .populate("teams")
  .then(league =>{
    console.log(league)
    if (req.user.playerProfile._id.equals(league.coordinator._id)){
      league.name = req.body.name
      league.description = req.body.description
      league.save()
      .then(()=>{
        res.redirect('/leagues')
      })
    }
  })
}

function show(req,res){
  League.findById(req.params.id)
  .populate("teams")
  .then(league =>{
    res.render('leagues/show',{
      league
    })
  })
}

function removeTeam(req,res){
  console.log("I'm here")
  League.findById(req.params.leagueid)
  .populate("teams")
  .then(league =>{
    league.teams.splice(league.teams.indexOf(req.params.teamid),1)
    league.save()
    .then(()=>{
      res.redirect(`/leagues/${req.params.leagueid}/edit`)
    })
  })
}

export{
  index,
  newLeague as new,
  create,
  deleteLeague as delete,
  edit,
  update,
  show,
  removeTeam,
  save,
}
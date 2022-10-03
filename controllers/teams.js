import { Team } from "../models/team.js"
import { Profile } from "../models/profile.js"

function index(req,res){
  Team.find()
  .populate('captain')
  .populate('players')
  .then(teams =>{
    console.log(teams)
    res.render('teams/index',{
      teams
    })
  })
}

function newTeam(req,res){
  res.render('teams/new')
}

function create(req,res){
  req.body.captain = req.user.playerProfile._id
  Team.create(req.body)
  .then(team => {
    Profile.findById(req.user.playerProfile._id)
    .then(profile => {
      profile.teams.push(team._id)
      profile.save()
      res.redirect('/teams')
    })
  })
}

function joinTeam(req,res){
  Team.findById(req.params.teamid)
  .then(team =>{
    team.players.push(req.params.playerid)
    team.save()
    .then(()=>{
      res.redirect('/teams')
    })
  })
}

function leaveTeam(req,res){
  Team.findById(req.params.teamid)
  .then(team =>{
    team.players.splice(team.players.indexOf(req.params.playerid),1)
    team.save()
    .then(()=>{
      res.redirect(`/teams/${req.params.teamid}`)
    })
  })
}

function deleteTeam(req,res){
  Team.findById(req.params.id)
  .then(team =>{
    if (req.user.playerProfile._id.equals(team.captain._id)){
      team.delete()
      .then(() =>{
        res.redirect('/teams')
      })
    }
  })
}

function show(req,res){
  Team.findById(req.params.id)
  .populate("captain")
  .populate("players")
  .then(team =>{
    res.render('teams/show',{
      team
    })
  })
}

function edit(req,res){
  Team.findById(req.params.id)
  .populate("captain")
  .populate("players")
  .then(team =>{
    res.render('teams/edit',{
      team
    })
  })
}

export {
  index,
  newTeam as new,
  create,
  joinTeam,
  leaveTeam,
  deleteTeam as delete,
  show,
  edit,
}
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

export {
  index,
  newTeam as new,
  create,
}
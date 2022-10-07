import { Team } from "../models/team.js"
import { Profile } from "../models/profile.js"
import { Game } from "../models/game.js"
import { Announcement } from "../models/announcement.js"

function index(req,res){
  Team.find()
  .populate('captain')
  .populate('players')
  .then(teams =>{
    res.render('teams/index',{
      teams
    })
  })
}

function newTeam(req,res){
  res.render('teams/new')
}

function create(req,res){
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
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
  .catch(err=>{
    console.log(err)
    res.redirect('/teams/new')
  })
}

function joinTeam(req,res){
  Team.findById(req.params.teamid)
  .then(team =>{
    team.players.push(req.params.playerid)
    team.save()
    .then(()=>{
      req.user.playerProfile.teams.push(team)
      req.user.playerProfile.save()
      .then(()=>{
        res.redirect('/teams')
      })
    })
  })
}

function leaveTeam(req,res){
  Team.findById(req.params.teamid)
  .then(team =>{
    team.players.splice(team.players.indexOf(req.params.playerid),1)
    team.save()
    .then(()=>{
      req.user.playerProfile.teams.splice(req.user.playerProfile.teams.indexOf(team),1)
      req.user.playerProfile.save()
      .then(()=>{
        res.redirect(`/teams/${req.params.teamid}`)
      })
    })
  })
}

function deleteTeam(req,res){
  Team.findById(req.params.id)
  .then(team =>{
    if (req.user.playerProfile._id.equals(team.captain._id)){
      Announcement.deleteMany({forTeam:{$eq: team._id}})
      .then(deletedAnnounces =>{
        Game.find({ $or: [ {awayTeam:{$eq: team._id}} , {homeTeam:{$eq: team._id}}]})
        .then(deletedGames =>{
          Game.deleteMany( { $or: [ {awayTeam:{$eq: team._id}} , {homeTeam:{$eq: team._id}}]})
          .then(shit =>{
            Team.updateMany( {$pull: {games: { $in:deletedGames}}})
            .then( pulledStuff =>{
              Profile.updateMany( {$pull: {teams: team._id}})
              .then(deletedProfiles =>{
                team.delete()
                .then(() =>{
                  res.redirect('/teams')
                })
              })
            })
          })
        })
      })
    }
  })
}

function show(req,res){
  Team.findById(req.params.id)
  .populate("captain")
  .populate("players")
  .then(team =>{
    Game.find({_id:{$in:team.games}})
    .populate("awayTeam")
    .populate("homeTeam")
    .then(games=>{
      let upcomingGames =[]
      let pastGames = []
      games.forEach(game => {
        if (game.score === ""){
          upcomingGames.push(game)
        } else {
          pastGames.push(game)
        }
      });
      res.render('teams/show',{
        team,
        pastGames,
        upcomingGames
      })
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
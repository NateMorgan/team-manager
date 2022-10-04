import { Announcement } from "../models/announcement.js"
import { Team } from "../models/team.js"

function index(req,res){
  Announcement.find({})
  .populate("author")
  .populate("forTeam")
  .then(announcements =>{
    res.render('index', { 
      announcements
    })
  })
}

function newAnnounce(req,res){
  Team.find({})
  .then(teams=>{
    res.render('new',{
      teams
    })
  })
}

function create(req,res){
  req.body.author = req.user.playerProfile._id
  Announcement.create(req.body)
  .then(()=>{
    res.redirect('/')
  })
}

function deleteAnnounce(req,res){
  Announcement.findById(req.params.id)
  .then(announce =>{
    announce.delete()
    .then(()=>{
      res.redirect('/')
    })
  })
}

export{
  index,
  newAnnounce as new,
  create,
  deleteAnnounce as delete,
}
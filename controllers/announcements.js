import { Announcement } from "../models/announcement.js"
import { Team } from "../models/team.js"

function index(req,res){
  Announcement.find({})
  .populate("author")
  .populate("forTeam")
  .then(announcements =>{
    res.render('announcements/index', { 
      announcements
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function newAnnounce(req,res){
  Team.find({})
  .then(teams=>{
    res.render('announcements/new',{
      teams
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function create(req,res){
  req.body.author = req.user.playerProfile._id
  Announcement.create(req.body)
  .then(()=>{
    res.redirect('/announcements')
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function deleteAnnounce(req,res){
  Announcement.findById(req.params.id)
  .then(announce =>{
    if (req.user.playerProfile._id.equals(announce.author._id)){
      announce.delete()
      .then(()=>{
        res.redirect('/announcements')
      })
    }
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

function show(req,res){
  Announcement.findById(req.params.id)
  .populate("author")
  .populate("forTeam")
  .then(announce=>{
    res.render('announcements/show',{
      announce
    })
  })
  .catch(err=>{
    console.log(err)
    res.redirect('/error')
  })
}

export{
  index,
  newAnnounce as new,
  create,
  deleteAnnounce as delete,
  show,
}
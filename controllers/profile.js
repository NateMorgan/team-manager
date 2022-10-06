import { isLoggedIn } from "../middleware/middleware.js"
import { Profile } from "../models/profile.js"

function show(req,res){
  const thisId = req.params.id !== undefined ? req.params.id:req.user.playerProfile._id 
  Profile.findById(thisId)
  .populate('teams')
  .then ( profile =>{
    res.render('profile/show',{
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res){
  Profile.findById(req.params.id)
  .then(profile =>{
    res.render('profile/edit',{
      profile
    })
  })
}

function update(req, res){
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Profile.findById(req.params.id)
  .then(profile =>{
    if (profile._id.equals(req.user.playerProfile._id)){
      profile.updateOne(req.body)
      .then(()=>{
        res.redirect(`/profile/${profile._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`/`)
      })
    } else {
    throw new Error('🚫 Not authorized 🚫')
  }
  })
  .catch(err=>{
    console.log(err)
    res.redirect(`/profile/${req.params.id}/edit`)
  })
}

export {
  show,
  edit,
  update,
}
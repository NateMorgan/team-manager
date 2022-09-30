import { Profile } from "../models/profile.js"

function show(req,res){
  Profile.findById(req.user.playerProfile._id)
  .populate('teams')
  .then ( profile =>{
    console.log(profile)
    res.render('profile/show',{
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  show,
}
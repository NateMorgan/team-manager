import { isLoggedIn } from "../middleware/middleware.js"
import { Profile } from "../models/profile.js"

function show(req,res){
  const thisId = req.params.id !== undefined ? req.params.id:req.user.playerProfile._id 
  console.log(thisId)
  Profile.findById(thisId)
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
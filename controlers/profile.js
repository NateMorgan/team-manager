import { Profile } from "../models/profile.js"

function show(req,res){
  Profile.find()
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

export {
  show,
}
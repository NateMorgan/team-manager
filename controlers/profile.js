import { Profile } from "../models/profile.js"

function index(req,res){
  // Player.findById()
  // .then ( profile =>{
    res.render('profile/index')
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect('/')
  // })
}

export {
  index,
}
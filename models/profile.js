import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  teams: [String],
  userProfile: {type: Schema.Types.ObjectId, ref: "User"}
},{
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export{
  Profile
}
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  email: String,
  phoneNum: String,
  showSettings: [Boolean],
  preferredPositions: [String],
  unreadAnnounce: [{type: Schema.Types.ObjectId, ref: "Announcement"}],
  teams: [{type: Schema.Types.ObjectId, ref: "Team"}],
  userProfile: {type: Schema.Types.ObjectId, ref: "User"}
},{
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export{
  Profile
}
import mongoose from "mongoose"

const Schema = mongoose.Schema

const announceSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Profile"},
  message: String,
  forTeam: {
    type: Schema.Types.ObjectId, 
    ref: "Team"}
})

const Announcement = mongoose.model("Announcement", announceSchema)

export{
  Announcement
}
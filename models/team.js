import mongoose from "mongoose"

const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: String,
  captain: {
    type: Schema.Types.ObjectId,
    ref: "Profile"},
  players: [{
    type: Schema.Types.ObjectId,
    ref: "Profile"}],
  games:[{
    type: Schema.Types.ObjectId,
    ref: "Game"}]
})

const Team = mongoose.model("Team", teamSchema)

export{
  Team
}
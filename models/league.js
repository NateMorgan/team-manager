import mongoose from "mongoose"

const Schema = mongoose.Schema

const leagueSchema = new Schema({
  name: {
    type: String,
    required: true},
  description: String,
  coordinator: {
    type:   Schema.Types.ObjectId,
    ref: "Profile"},
  teams:[{
    type: Schema.Types.ObjectId,
    ref: "Team"}]
})

const League = mongoose.model("League", leagueSchema)

export{
  League
}
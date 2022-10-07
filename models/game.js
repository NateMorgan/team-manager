import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
  commentText: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Profile"}
},{
  timestamps: true
})


const gameSchema = new Schema({
  homeTeam:{
    type: Schema.Types.ObjectId,
    ref: "Team"},
  awayTeam:{
    type: Schema.Types.ObjectId,
    ref: "Team"},
  creator:{
    type: Schema.Types.ObjectId,
    ref: "Profile"},
  time: Date,
  score: String,
  comments: [commentSchema]
})

const Game = mongoose.model("Game", gameSchema)

export{
  Game
}
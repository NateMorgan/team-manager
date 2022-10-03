import mongoose from "mongoose"

const Schema = mongoose.Schema

const gameSchema = new Schema({
  homeTeam:{
    type: Schema.Types.ObjectId,
    ref: "Team"},
  awayTeam:{
    type: Schema.Types.ObjectId,
    ref: "Team"},
  time: Date,
  score: String
})

const Game = mongoose.model("Game", gameSchema)

export{
  Game
}
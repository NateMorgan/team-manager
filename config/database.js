import mongoose from "mongoose"

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('connected',ele => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})
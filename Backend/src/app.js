const express = require("express")
const app = express()
const connectToDb = require("./db/db")
const cookies = require("cookie-parser") 
const authRoute = require("../src/routes/auth.route")
const postRoute = require("./routes/post.route")
const cors = require('cors')
connectToDb()

app.use(express.json())
app.use(cookies())
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true   
}))
app.use("/auth",authRoute)
app.use("/posts",postRoute)


module.exports = app
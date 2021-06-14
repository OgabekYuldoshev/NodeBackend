require('dotenv').config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const userRoute = require("./src/routes/user")
const postRoute = require("./src/routes/post")
const categoryRoute = require("./src/routes/category")



const app = express()

// DB Connecting
require("./models/index")

// MiddleWare
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(express.json())


// Routes
app.use("/api", userRoute)
app.use("/api/post", postRoute)
app.use("/api/category", categoryRoute)





app.listen(process.env.PORT || "8000", ()=>console.log("Server Running..."))
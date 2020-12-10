const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

require("dotenv").config()
require("./firebase/initializeFirebase")
var apiRouter = require("./routes/api")

const app = express()
const port = process.env.PORT || 5000

// Secure by setting http headers
app.use(helmet())

// Limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api", apiRouter)

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  console.log("We are in Production environment...")
  // set a static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

module.exports = app

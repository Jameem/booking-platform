const firebase = require("firebase")
const admin = require("firebase-admin")

const serviceAccount = require("./serviceAccountKey.json")

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://construyo-coding-challenge.firebaseio.com",
})

const db = admin.database()

module.exports = { admin, db }

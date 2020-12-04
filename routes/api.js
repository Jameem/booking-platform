const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")

router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to Booking Platform API v1!",
  })
)

router.get("/orders", orderController.getOrders)
router.post("/orders", orderController.createOrder)

module.exports = router

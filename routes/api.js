const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")

// @route  Get api/
// @desc   To verify the api server is running
router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to Booking Platform API v1!",
  })
)

// @route  GET api/orders
// @desc   Get list of all orders
// @access Public
router.get("/orders", orderController.getOrders)

// @route  GET api/orders/id
// @desc   Get one order
// @access Public
router.get("/orders/:id", orderController.getOneOrder)

// @route  POST api/orders
// @desc   Create a new order
// @access Public
router.post("/orders", orderController.createOrder)

// @route  PUT api/orders/id
// @desc   Updates an order
// @access Public
router.put("/orders/:id", orderController.updateOrder)

// @route  DELETE api/orders/id
// @desc   Deletes an order
// @access Public
router.delete("/orders/:id", orderController.deleteOrder)

module.exports = router

const { check, validationResult } = require("express-validator")

const { db } = require("../firebase/initializeFirebase")

// @desc   Gets the list of all Orders
exports.getOrders = async (req, res) => {
  let orders = []

  // Fetching orders
  await db.ref("orders").once("value", (snapshot) => {
    // Refactoring the fetched objects to array
    snapshot.forEach(function (item) {
      let itemVal = item.val()
      itemVal.id = item.key
      orders.push(itemVal)
    })
  })

  return res.status(200).send({
    orders,
    success: true,
    message: "Orders fetched successfully.",
  })
}

// @desc   Gets one order with provided id
exports.getOneOrder = async (req, res) => {
  try {
    const { id } = req.params

    const order = await db.ref("orders/" + id).once("value", (snapshot) => {
      return snapshot.val()
    })

    if (!order.val()) throw new Error("Order not found!")

    return res.status(200).send({
      order,
      success: true,
      message: "Order fetched successfully.",
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({
      success: false,
      message: "Failed to fetch order.",
      error,
    })
  }
}

// @desc   Create a new Order
exports.createOrder = async (req, res) => {
  try {
    // Validates the body with the validate middleware
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: "Input validation failed.",
        errors: errors.array(),
      })
    }

    const inputParams = req.body

    // Refactoring the input data
    const newOrder = {
      title: inputParams.title,
      bookingDate: inputParams.bookingDate,
      address: {
        city: inputParams.city,
        country: inputParams.country,
        zip: inputParams.zip,
        street: inputParams.street,
      },
      customer: {
        email: inputParams.email,
        name: inputParams.name,
        phone: inputParams.phone,
      },
    }

    const order = await db.ref("orders").push(newOrder)

    return res.status(201).send({
      success: true,
      message: "Order created successfully.",
      order,
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({
      success: false,
      message: "Failed to create order.",
      error,
    })
  }
}

// @desc   Update an Order with provided id
exports.updateOrder = async (req, res) => {
  try {
    // Validates the body with the validate middleware
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        message: "Input validation failed.",
        errors: errors.array(),
      })
    }

    const { id } = req.params
    const inputParams = req.body

    // Refactoring the input data
    const newOrder = {
      title: inputParams.title,
      bookingDate: inputParams.bookingDate,
      address: {
        city: inputParams.city,
        country: inputParams.country,
        zip: inputParams.zip,
        street: inputParams.street,
      },
      customer: {
        email: inputParams.email,
        name: inputParams.name,
        phone: inputParams.phone,
      },
    }

    await db.ref("orders/" + id).update(newOrder, (error) => {
      if (error) {
        throw error
      }

      return res.status(200).send({
        success: true,
        message: "Order updated successfully.",
      })
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({
      success: false,
      message: "Failed to update order.",
      error,
    })
  }
}

// @desc   Delete an Order with provided id
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params

    await db.ref("orders/" + id).remove()

    return res.status(200).send({
      success: true,
      message: "Order deleted successfully.",
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({
      success: false,
      message: "Failed to delete order.",
      error,
    })
  }
}

exports.validate = (method) => {
  switch (method) {
    case "createOrder":
      return [
        check("title").not().isEmpty().withMessage("Title cannot be empty!"),
        check("bookingDate")
          .not()
          .isEmpty()
          .withMessage("Please provide a date!"),
        check("email")
          .not()
          .isEmpty()
          .withMessage("Email cannot be empty!")
          .isEmail()
          .withMessage("Please provide a valid email!"),
      ]

    case "updateOrder":
      return [
        check("title").not().isEmpty().withMessage("Title cannot be empty!"),
        check("bookingDate")
          .not()
          .isEmpty()
          .withMessage("Please provide a date!"),
      ]

    default:
      break
  }
}

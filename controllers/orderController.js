const { db } = require("../firebase/initializeFirebase")

// @desc   Gets the list of all Orders
exports.getOrders = async (req, res) => {
  const orders = await db.ref("orders").once("value", (snapshot) => {
    return snapshot.val()
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
    const newOrder = req.body

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
    const { id } = req.params
    const params = req.body

    await db.ref("orders/" + id).update(params, (error) => {
      if (error) {
        throw error
      }

      return res.status(201).send({
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

    return res.status(201).send({
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

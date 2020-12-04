const { db } = require("../firebase/initializeFirebase")

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

exports.createOrder = async (req, res) => {
  const newOrder = req.body

  const order = await db.ref("orders").push(newOrder)

  return res.status(201).send({
    success: true,
    message: "Order created successfully.",
    order,
  })
}

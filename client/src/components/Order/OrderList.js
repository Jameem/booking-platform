import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import VisibilityIcon from "@material-ui/icons/Visibility"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import EditIcon from "@material-ui/icons/Edit"

import "./Order.css"

function OrderList() {
  const [orders, setOrders] = useState([])

  useEffect(async () => {
    // Fetching the orders
    const results = await axios.get(`/api/orders`)
    setOrders(results.data.orders)
  }, [])

  return (
    <div className="order">
      <div className="order__header">
        <h3>Orders</h3>
        <p>Active orders are listed here.</p>
      </div>

      <div className="order__table">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Booking Date</th>
              <th>Address</th>
              <th>Customer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              ({ id, title, bookingDate, address, customer }, index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{moment(bookingDate).format("DD.MM.YYYY")}</td>
                  <td>{address?.street}</td>
                  <td>{customer?.name}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Link to={`/orders/${id}/view`}>
                        <VisibilityIcon style={{ fontSize: "medium" }} />
                      </Link>
                      <Link to={`/orders/${id}/edit`}>
                        <EditIcon style={{ fontSize: "medium" }} />
                      </Link>
                      <Link to={`/orders/${id}/delete`}>
                        <DeleteOutlineIcon style={{ fontSize: "medium" }} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderList

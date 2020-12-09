import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import { useHistory } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import swal from "sweetalert"

import VisibilityIcon from "@material-ui/icons/Visibility"
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline"
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined"
import EditIcon from "@material-ui/icons/Edit"

import "./Order.css"

function OrderList() {
  const history = useHistory()
  const [orders, setOrders] = useState([])
  const { addToast } = useToasts()

  useEffect(async () => {
    // Fetching the orders
    const results = await axios.get(`/api/orders`)
    setOrders(results.data.orders)
  }, [])

  const handleDelete = (event) => {
    // Fetching the id from the element
    const id = event.target.id

    // Confirm the action
    swal({
      title: "Are you sure ?",
      text: "You may not be able to revert the action!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirmation) => {
      if (confirmation) {
        // Deleting the Order
        await axios
          .delete(`/api/orders/${id}`)
          .then((result) => {
            // Removing the order from the state
            var newOrders = orders.filter((el) => el.id != id)

            setOrders(newOrders)

            // Communicating the success to the user
            addToast("Order deleted successfully.", {
              appearance: "success",
              autoDismiss: true,
            })
          })
          .catch((error) => {
            // Communicating the error to the user
            addToast("Uh-oh, failed to delete!", {
              appearance: "error",
              autoDismiss: false,
            })
          })
      }
    })
  }

  return (
    <div className="order">
      <div className="order__header">
        <div>
          <h4>Orders</h4>
          <p>Active orders are listed here.</p>
        </div>
        <a onClick={() => history.goBack()} className="btn" title="Go Back">
          <KeyboardBackspaceOutlinedIcon />
        </a>
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
                  <td>{moment.unix(bookingDate).format("DD.MM.YYYY")}</td>
                  <td>{address?.street}</td>
                  <td>{customer?.name}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Link to={`/order/view/${id}`}>
                        <VisibilityIcon
                          style={{ fontSize: "medium", color: "#3c3a3a" }}
                        />
                      </Link>
                      <Link to={`/order/edit/${id}`}>
                        <EditIcon
                          style={{ fontSize: "medium", color: "#3c3a3a" }}
                        />
                      </Link>
                      <a>
                        <DeleteOutlineIcon
                          onClick={handleDelete}
                          id={id}
                          style={{
                            fontSize: "medium",
                            color: "#3c3a3a",
                            cursor: "pointer",
                          }}
                        />
                      </a>
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

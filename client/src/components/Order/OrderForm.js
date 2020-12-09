import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import axios from "axios"
import moment from "moment"
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined"

import "bootstrap/dist/css/bootstrap.css"
import "./Order.css"
import Header from "../Header/Header"

function OrderForm({ mode, match }) {
  const id = match?.params?.id
  const history = useHistory()
  const { addToast } = useToasts()

  const [formData, setFormData] = useState({})

  useEffect(async () => {
    // Fetching the order details if in edit or view mode
    if (mode !== "create") {
      const result = await axios.get(`/api/orders/${id}`)

      // Setting the initial values
      setFormData({
        title: result?.data?.order?.title,
        bookingDate: moment
          .unix(result?.data?.order?.bookingDate)
          .format("YYYY-MM-DD"),
        city: result?.data?.order?.address?.city,
        country: result?.data?.order?.address?.country,
        street: result?.data?.order?.address?.street,
        zip: result?.data?.order?.address?.zip,
        email: result?.data?.order?.customer?.email,
        name: result?.data?.order?.customer?.name,
        phone: result?.data?.order?.customer?.phone,
      })
    }
  }, [])

  const handleChange = (event) => {
    // Setting the form data
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Formatting the date to unix timestamp
    formData.bookingDate = moment(formData.bookingDate).unix()

    // Dynamically changing the api method according to the mode
    let url = "/api/orders/"
    let method = "post"
    if (mode == "edit") {
      url = url + id
      method = "put"
    }

    const results = await axios({
      method,
      url,
      data: formData,
    }).catch((error) => {
      // Communicating the error to the user
      addToast(error?.response?.data?.message, {
        appearance: "error",
        autoDismiss: false,
      })
    })

    if (results) {
      // Communicating the success to the user
      addToast("Order placed successfully.", {
        appearance: "success",
        autoDismiss: true,
      })
      // Redirecting to the orders list
      history.push("/")
    }
  }

  return (
    <>
      <Header />
      <div className="order">
        <div className="order__header">
          <h4>Create Order</h4>
          <a onClick={() => history.goBack()} className="btn" title="Go Back">
            <KeyboardBackspaceOutlinedIcon />
          </a>
        </div>

        <div className="order__form">
          <form onSubmit={handleSubmit}>
            <fieldset disabled={mode == "view"}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6 mb-2">
                    <small>Title</small>
                    <input
                      name="title"
                      placeholder="title"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formData?.title}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <small>Booking Date</small>
                    <input
                      name="bookingDate"
                      className="form-control"
                      type="date"
                      onChange={handleChange}
                      value={formData?.bookingDate}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <p className="col-md-12 order__formSectionHeader">Address</p>
                  <div className="col-md-6 mb-3">
                    <small>Street</small>
                    <input
                      name="street"
                      placeholder="street"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formData?.street}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <small>City</small>
                    <input
                      name="city"
                      placeholder="city"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formData?.city}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <small>Zip</small>
                    <input
                      name="zip"
                      placeholder="zip"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formData?.zip}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <small>Country</small>
                    <input
                      name="country"
                      placeholder="country"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={formData?.country}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <p className="col-md-12 order__formSectionHeader">
                  Customer Information
                </p>
                <div className="col-md-6 mb-3">
                  <small>Name</small>
                  <input
                    name="name"
                    placeholder="name"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    required
                    value={formData?.name}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <small>Email</small>
                  <input
                    name="email"
                    placeholder="email"
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    required
                    value={formData?.email}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <small>Phone</small>
                  <input
                    name="phone"
                    placeholder="phone"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={formData?.phone}
                  />
                </div>
              </div>

              <div className={mode == "view" ? "invisible" : ""}>
                <button className="btn btn-success" type="submit">
                  Place Order
                </button>

                <button className="btn btn-dark ml-1" type="reset">
                  Reset
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}

export default OrderForm

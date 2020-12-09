import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"

import "./App.css"
import Login from "./components/Login/Login"
import Header from "./components/Header/Header"
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase"
import OrderList from "./components/Order/OrderList"
import OrderForm from "./components/Order/OrderForm"

function App() {
  const [{ user }, dispatch] = useStateValue()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })

    return () => {
      // Cleanup goes here
      unsubscribe()
    }
  }, [])

  return (
    <ToastProvider>
      <Router>
        <div className="app">
          {!token && window.location.pathname != "/login" && (
            <Redirect to="/login" />
          )}

          {/* Login route */}
          <Route path="/login">
            <Login />
          </Route>

          {/* Root route listing all the orders*/}
          <Route path="/" exact>
            {/* Header for the content pages*/}
            <Header />
            <OrderList />
          </Route>

          {/* Route for editing an order*/}
          <Route
            path="/order/edit/:id"
            exact
            render={(props) => <OrderForm {...props} mode="edit" />}
          ></Route>

          {/* Route for viewing an order*/}
          <Route
            path="/order/view/:id"
            exact
            render={(props) => <OrderForm {...props} mode="view" />}
          ></Route>

          {/* Route for creating an order*/}
          <Route path="/order/create" exact>
            <OrderForm mode="create" />
          </Route>
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App

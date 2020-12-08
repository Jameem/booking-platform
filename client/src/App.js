import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"
import Login from "./components/Login/Login"
import Header from "./components/Header/Header"
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase"
import Order from "./components/Order/Order"

function App() {
  const [{ user }, dispatch] = useStateValue()

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
    <Router>
      <div className="app">
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Header />
          <Order />
        </Route>
      </div>
    </Router>
  )
}

export default App

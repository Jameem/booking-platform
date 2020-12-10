import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./Login.css"
import { auth } from "../../firebase"
import { useStateValue } from "../../StateProvider"

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [{ user }, dispatch] = useStateValue()

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) history.push("/")
  }, [])

  // Handle login functionality
  const login = (e) => {
    e.preventDefault()

    // Sign in using firebase auth
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/")
      })
      .catch((e) => alert(e.message))
  }

  // Handle register functionality
  const register = (e) => {
    e.preventDefault()

    // Sign up using firebase auth
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/")
      })
      .catch((e) => alert(e.message))
  }

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src="logo.png" alt="" />
      </Link>

      <div className="login__container">
        <h4>Sign In</h4>
        <form>
          <small>E-mail</small>
          <input
            className="form-control"
            type="email"
            value={email}
            required={true}
            onChange={(event) => setEmail(event.target.value)}
          />
          <small>Password</small>
          <input
            className="form-control"
            type="password"
            value={password}
            required={true}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="login__signInButton" onClick={login}>
            Sign In
          </button>
        </form>
        <button
          type="submit"
          className="login__registerButton"
          onClick={register}
        >
          Create new Account
        </button>
      </div>
    </div>
  )
}

export default Login

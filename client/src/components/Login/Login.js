import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"

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

  const login = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/")
      })
      .catch((e) => alert(e.message))
  }

  const register = (e) => {
    e.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/")
      })
      .catch((e) => alert(e.message))
  }

  return (
    <div className="login">
      <Link to="/"></Link>
      <img className="login__logo" src="logo.png" alt="" />
      <Link />

      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            required={true}
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          <input
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

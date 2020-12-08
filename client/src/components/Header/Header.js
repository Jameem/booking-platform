import React from "react"
import "./Header.css"
import { Link, useHistory } from "react-router-dom"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import { useStateValue } from "../../StateProvider"
import { auth } from "../../firebase"

function Header() {
  const history = useHistory()
  const [{ basket, user }] = useStateValue()

  const login = () => {
    if (user) {
      auth.signOut()
    }
  }

  return (
    <nav className="header">
      <Link to="/">
        <img className="header__logo" src="logo.png" alt="logo" />
      </Link>

      <div className="header__nav">
        <AccountCircleIcon />
        <Link to="/login" className="header__link">
          <div onClick={login} className="header__option">
            <span className="header__optionLineOne">{user?.email}</span>
            <span className="header__optionLineTwo">Sign Out</span>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Header

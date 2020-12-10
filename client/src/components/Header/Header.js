import React from "react"
import "./Header.css"
import { Link, useHistory } from "react-router-dom"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import { useStateValue } from "../../StateProvider"
import { auth } from "../../firebase"

function Header() {
  const [{ user }, dispatch] = useStateValue()

  // Handle the signout
  const signOut = () => {
    if (user) auth.signOut()
  }

  return (
    <nav className="header">
      <Link to="/">
        <img className="header__logo" src="/logo.png" alt="logo" />
      </Link>

      <div className="header__nav">
        <div className="header__navItem">
          <AddCircleIcon />
          <Link to="/order/create" className="header__link">
            <div className="header__option">
              <span className="header__optionLineTwo">Create an Order</span>
            </div>
          </Link>
        </div>
        <div className="header__navItem">
          <AccountCircleIcon />
          <Link to="/login" className="header__link">
            <div onClick={signOut} className="header__option">
              <span className="header__optionLineOne">{user?.email}</span>
              <span className="header__optionLineTwo">Sign Out</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header

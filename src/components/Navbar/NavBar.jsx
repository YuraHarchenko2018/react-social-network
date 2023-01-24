import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './NavBar.module.css'

function NavBar() {
  const handleActiveLink = ({ isActive }) => (isActive ? s.active : s.navWrapper)

  return (
    <nav className={s.nav}>
      <NavLink className={handleActiveLink} to="/profile">
        <div className={s.item}>Profile</div>
      </NavLink>
      <NavLink className={handleActiveLink} to="/dialogs">
        <div className={s.item}>Messages</div>
      </NavLink>
      <NavLink className={handleActiveLink} to="/friends">
        <div className={s.item}>Friends</div>
      </NavLink>
      <NavLink className={handleActiveLink} to="/users">
        <div className={s.item}>Users</div>
      </NavLink>
      <NavLink className={handleActiveLink} to="/news">
        <div className={s.item}>News</div>
      </NavLink>
    </nav>
  )
}

export default NavBar

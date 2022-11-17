import React from "react"
import { useNavigate } from "react-router-dom"

import s from "./Header.module.css"


const Header = (props) => {
  let navigate = useNavigate();

  const loginBtnClick = () => navigate('/login')
  const signUpBtnClick = () => navigate('/sign-up')
  const logoutBtnClick = () => props.logout()

  return (
      <header className={s.header}>
        <div className={s.avatarLogoWrapper}>
          <img alt="#" src={props.authUserProfileImgLink} />
        </div>
        <div className={s.loginBtnWrapper}>
          {
            props.isLoginIn ? (
              <button onClick={logoutBtnClick} className={s.logoutBtn}>Logout</button>
            ) : (
              <>
                <button onClick={loginBtnClick} className={s.loginBtn}>Login</button>
                <button onClick={signUpBtnClick} className={s.signUpBtn}>Sign Up</button>
              </>
            )
          }
        </div>
      </header>
  )
}

export default Header
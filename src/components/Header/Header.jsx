import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProfileAvatar from "../../assets/default-avatar.webp"

import s from "./Header.module.css"


const Header = (props) => {
  let navigate = useNavigate();

  const loginBtnClick = () => navigate('/login')
  const signUpBtnClick = () => navigate('/sign-up')
  const logoutBtnClick = () => props.logout()

  const [profileAva, setProfileAva] = useState(null)

  useEffect(() => {
    const avatar = props.authUserProfileImgLink
    fetch(avatar).then(() => setProfileAva(avatar)).catch(() => setProfileAva(null))
  }, [props.authUserProfileImgLink, setProfileAva])


  return (
    <header className={s.header}>
      <div className={s.avatarLogoWrapper}>
        <img alt="#" src={profileAva ?? ProfileAvatar} />
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
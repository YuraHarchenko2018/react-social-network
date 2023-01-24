import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/reducers/auth'
import { serverLink } from '../../constants/common'
import s from './Header.module.css'

function Header({ isLoginIn, authUserProfileImgLink }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginBtnClick = () => navigate('/login')
  const signUpBtnClick = () => navigate('/sign-up')
  const logoutBtnClick = () => dispatch(logout())

  const profileAvatar = isLoginIn ? serverLink + authUserProfileImgLink : authUserProfileImgLink

  return (
    <header className={s.header}>
      <div className={s.avatarLogoWrapper}>
        <img alt="#" src={profileAvatar} />
      </div>
      <div className={s.loginBtnWrapper}>
        {
          isLoginIn ? (
            <button type="button" onClick={logoutBtnClick} className={s.logoutBtn}>Logout</button>
          ) : (
            <>
              <button type="button" onClick={loginBtnClick} className={s.loginBtn}>Login</button>
              <button type="button" onClick={signUpBtnClick} className={s.signUpBtn}>Sign Up</button>
            </>
          )
        }
      </div>
    </header>
  )
}

export default Header

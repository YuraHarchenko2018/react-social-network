import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from '../../common/ReduxForms/Login/LoginForm'
import useRootRedirect from '../../../hooks/useRootRedirect'
import { login, setIsLoginErrorOccur } from '../../../redux/reducers/login'
import { getIsLoginInSelector } from '../../../redux/selectors/auth'
import { getIsFetchingLoginStatus, getIsOccurErrorLoginStatus } from '../../../redux/selectors/login'
import s from './Login.module.css'

function Login() {
  const dispatch = useDispatch()

  const isLoginIn = useSelector(getIsLoginInSelector)
  const isFetching = useSelector(getIsFetchingLoginStatus)
  const isOccurError = useSelector(getIsOccurErrorLoginStatus)

  useRootRedirect(isLoginIn)

  const handleSubmit = ({ email, password }) => {
    dispatch(login(email, password))
  }

  useEffect(() => () => {
    dispatch(setIsLoginErrorOccur(false))
  }, [dispatch])

  return (
    <div className={s.loginPage}>
      <LoginForm onSubmit={handleSubmit} isFetching={isFetching} isOccurError={isOccurError} />
    </div>
  )
}

export default Login

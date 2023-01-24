import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from '../../common/ReduxForms/SignUp/SignUpForm'
import useRootRedirect from '../../../hooks/useRootRedirect'
import { setIsLoginErrorOccur, signUp } from '../../../redux/reducers/login'
import { getIsLoginInSelector } from '../../../redux/selectors/auth'
import { getIsFetchingLoginStatus, getIsOccurErrorLoginStatus } from '../../../redux/selectors/login'
import s from './SignUp.module.css'

function SignUp() {
  const dispatch = useDispatch()

  const isLoginIn = useSelector(getIsLoginInSelector)
  const isFetching = useSelector(getIsFetchingLoginStatus)
  const isOccurError = useSelector(getIsOccurErrorLoginStatus)

  useRootRedirect(isLoginIn)

  const handleSubmit = ({
    name, email, password, rePassword, age,
  }) => {
    dispatch(signUp(name, email, password, rePassword, age))
  }

  useEffect(() => () => {
    dispatch(setIsLoginErrorOccur(false))
  }, [dispatch])

  return (
    <div className={s.signUpPage}>
      <SignUpForm onSubmit={handleSubmit} isFetching={isFetching} isOccurError={isOccurError} />
    </div>
  )
}

export default SignUp

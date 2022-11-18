import SignUpForm from "components/common/ReduxForms/SignUp/SignUpForm"
import useRootRedirect from "hooks/useRootRedirect"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoginErrorOccur, signUp } from "redux/reducers/login"
import { getIsLoginInSelector } from "redux/selectors/auth"
import { getIsFetchingLoginStatus, getIsOccurErrorLoginStatus } from "redux/selectors/login"

import s from './SignUp.module.css'

const SignUp = () => {
    const dispatch = useDispatch()

    const isLoginIn = useSelector(state => getIsLoginInSelector(state))
    const isFetching = useSelector(state => getIsFetchingLoginStatus(state))
    const isOccurError = useSelector(state => getIsOccurErrorLoginStatus(state))

    useRootRedirect(isLoginIn)

    const handleSubmit = ({ name, email, password, rePassword, age }) => signUp(name, email, password, rePassword, age)(dispatch)

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
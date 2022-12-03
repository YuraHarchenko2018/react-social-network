import React, { useEffect } from "react"
import SignUpForm from "components/common/ReduxForms/SignUp/SignUpForm"
import useRootRedirect from "hooks/useRootRedirect"
import { setIsLoginErrorOccur, signUp } from "redux/reducers/login"
import { getIsLoginInSelector } from "redux/selectors/auth"
import { getIsFetchingLoginStatus, getIsOccurErrorLoginStatus } from "redux/selectors/login"
import s from './SignUp.module.css'
// @ts-ignore
import { useAppDispatch, useAppSelector } from "hooks/redux.ts"


const SignUp = () => {
    const dispatch = useAppDispatch()

    const isLoginIn = useAppSelector(getIsLoginInSelector)
    const isFetching = useAppSelector(getIsFetchingLoginStatus)
    const isOccurError = useAppSelector(getIsOccurErrorLoginStatus)

    useRootRedirect(isLoginIn)

    const handleSubmit = ({ name, email, password, rePassword, age }) => {
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

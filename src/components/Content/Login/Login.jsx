import React, { useEffect } from "react"
import LoginForm from "components/common/ReduxForms/Login/LoginForm";
import useRootRedirect from "hooks/useRootRedirect";
import { login, setIsLoginErrorOccur } from "redux/reducers/login"
import { getIsLoginInSelector } from "redux/selectors/auth";
import { getIsFetchingLoginStatus, getIsOccurErrorLoginStatus } from "redux/selectors/login";
import s from "./Login.module.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "hooks/redux.ts"


const Login = () => {
    const dispatch = useAppDispatch()

    const isLoginIn = useAppSelector(getIsLoginInSelector)
    const isFetching = useAppSelector(getIsFetchingLoginStatus)
    const isOccurError = useAppSelector(getIsOccurErrorLoginStatus)

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

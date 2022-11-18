import React, { useEffect } from "react"
import LoginForm from "components/common/ReduxForms/Login/LoginForm";
import useRootRedirect from "hooks/useRootRedirect";
import { useDispatch, useSelector } from "react-redux";
import { login, setIsLoginErrorOccur } from "redux/reducers/login"
import { getIsLoginInSelector } from "redux/selectors/auth";
import { getIsFetchingLoginStatus, getIsOccurErrorLoginStatus } from "redux/selectors/login";

import s from "./Login.module.css"


const Login = () => {
    const dispatch = useDispatch()

    const isLoginIn = useSelector(state => getIsLoginInSelector(state))
    const isFetching = useSelector(state => getIsFetchingLoginStatus(state))
    const isOccurError = useSelector(state => getIsOccurErrorLoginStatus(state))

    useRootRedirect(isLoginIn)

    const handleSubmit = ({ email, password }) => login(email, password)(dispatch)

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
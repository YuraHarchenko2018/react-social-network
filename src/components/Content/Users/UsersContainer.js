import React from "react"
import { connect } from "react-redux"
import { getUsers } from "redux/reducers/users"
import { getIsLoginInSelector } from "redux/selectors/auth"
import { getUsersSelector } from "redux/selectors/users"
import useLoginRedirect from "hooks/useLoginRedirect"
import Preloader from "components/common/Preloader/Preloader"
import Users from "./Users"


const UsersContainer = ({ isLoginIn, users, getUsers }) => {
    useLoginRedirect(isLoginIn)
    
    if (users === null) {
        getUsers()
        return <Preloader />
    }
    
    return <Users />
}

export default connect(state => ({
    users: getUsersSelector(state),
    isLoginIn: getIsLoginInSelector(state)
}), { getUsers })(UsersContainer)
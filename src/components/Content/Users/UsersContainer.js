import React from "react"
import { connect } from "react-redux"
import { fetchUsers } from "redux/reducers/users"
import { getUsersSelector } from "redux/selectors/users"
import useLoginRedirect from "hooks/useLoginRedirect"
import Preloader from "components/common/Preloader/Preloader"
import Users from "./Users"


const UsersContainer = ({ users, fetchUsers }) => {
    useLoginRedirect()

    if (users === null) {
        fetchUsers()
        return <Preloader />
    }

    return <Users />
}

export default connect(state => ({ users: getUsersSelector(state) }), { fetchUsers })(UsersContainer)
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "redux/reducers/users"
import { getUsersPerPageSelector, getUsersSelector } from "redux/selectors/users"
import useLoginRedirect from "hooks/useLoginRedirect"
import Preloader from "components/common/Preloader/Preloader"
import Users from "./Users"


const UsersContainer = () => {
    useLoginRedirect()

    const dispatch = useDispatch()
    const users = useSelector(state => getUsersSelector(state))
    const perPage = useSelector(state => getUsersPerPageSelector(state))

    if (users === null) {
        // @ts-ignore
        dispatch(fetchUsers({ selectedPage: 1, perPage }))
        return <Preloader />
    }

    return <Users />
}

export default UsersContainer
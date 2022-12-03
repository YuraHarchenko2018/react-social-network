import React from "react"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"
import { fetchUsers } from "redux/reducers/users"
import { getUsersPerPageSelector, getUsersSelector } from "redux/selectors/users"
import useLoginRedirect from "hooks/useLoginRedirect"
import Preloader from "components/common/Preloader/Preloader"
import Users from "./Users"

const UsersContainer = () => {
    useLoginRedirect()

    const dispatch = useAppDispatch()
    const users = useAppSelector(state => getUsersSelector(state))
    const perPage = useAppSelector(state => getUsersPerPageSelector(state))

    if (users === null) {
        dispatch(fetchUsers({ selectedPage: 1, perPage }))
        return <Preloader />
    }

    return <Users />
}

export default UsersContainer

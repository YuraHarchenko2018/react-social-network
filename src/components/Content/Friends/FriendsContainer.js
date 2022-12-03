import React from "react"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"
import { fetchFriends } from "redux/reducers/users"
import { getFriendsPerPageSelector, getFriendsSelector } from "redux/selectors/users"
import useLoginRedirect from "hooks/useLoginRedirect"
import Preloader from "components/common/Preloader/Preloader"
import Frineds from "./Friends"


const FriendsContainer = () => {
    useLoginRedirect()

    const dispatch = useAppDispatch()
    const friends = useAppSelector(state => getFriendsSelector(state))
    const perPage = useAppSelector(state => getFriendsPerPageSelector(state))

    if (friends === null) {
        dispatch(fetchFriends({ selectedPage: 1, perPage }))
        return <Preloader />
    }

    return <Frineds />
}

export default FriendsContainer
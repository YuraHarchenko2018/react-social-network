import React from "react"
import { fetchFriends } from "redux/reducers/users"
import { getFriendsPerPageSelector, getFriendsSelector } from "redux/selectors/users"
import useLoginRedirect from "hooks/useLoginRedirect"
import Preloader from "components/common/Preloader/Preloader"
import Frineds from "./Friends"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"


const FriendsContainer = () => {
    useLoginRedirect()

    const dispatch = useAppDispatch()

    const friends = useAppSelector(getFriendsSelector)
    const perPage = useAppSelector(getFriendsPerPageSelector)

    if (friends === null) {
        dispatch(fetchFriends({ selectedPage: 1, perPage }))
        return <Preloader />
    }

    return <Frineds />
}

export default FriendsContainer

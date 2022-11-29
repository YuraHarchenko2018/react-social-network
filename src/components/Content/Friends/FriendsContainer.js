import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFriends } from "redux/reducers/users"
import { getFriendsPerPageSelector, getFriendsSelector } from "redux/selectors/users"
import useLoginRedirect from "hooks/useLoginRedirect"
import Preloader from "components/common/Preloader/Preloader"
import Frineds from "./Friends"


const FriendsContainer = () => {
    useLoginRedirect()

    const dispatch = useDispatch()
    const friends = useSelector(state => getFriendsSelector(state))
    const perPage = useSelector(state => getFriendsPerPageSelector(state))

    if (friends === null) {
        // @ts-ignore
        dispatch(fetchFriends({ selectedPage: 1, perPage }))
        return <Preloader />
    }

    return <Frineds />
}

export default FriendsContainer
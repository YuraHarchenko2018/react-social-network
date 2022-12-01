import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFriends } from "redux/reducers/users"
import { getFriendsPagesCountSelector, getFriendsPerPageSelector, getIsSearchSelector } from "redux/selectors/users"
import Paginator from "../../../common/Paginator/Paginator"


const FriendsPaginator = () => {
    const dispatch = useDispatch()

    const pagesCount = useSelector(state => getFriendsPagesCountSelector(state))
    const perPage = useSelector(state => getFriendsPerPageSelector(state))
    const isSearch = useSelector(state => getIsSearchSelector(state))

    const handlePaginatorCallback = useCallback((page) => {
        // @ts-ignore
        dispatch(fetchFriends({ selectedPage: page, perPage }))
    }, [dispatch, perPage])

    if (!isSearch) {
        return <Paginator pagesCount={pagesCount} handlePaginatorCallback={handlePaginatorCallback} />
    } else {
        return <></>
    }
}


export default FriendsPaginator

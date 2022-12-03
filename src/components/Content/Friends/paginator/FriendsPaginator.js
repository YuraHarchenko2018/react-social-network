import React, { useCallback } from "react"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../../hooks/redux.ts"
import { fetchFriends } from "redux/reducers/users"
import { getFriendsPagesCountSelector, getFriendsPerPageSelector, getIsSearchSelector } from "redux/selectors/users"
import Paginator from "../../../common/Paginator/Paginator"

const FriendsPaginator = () => {
    const dispatch = useAppDispatch()

    const pagesCount = useAppSelector(state => getFriendsPagesCountSelector(state))
    const perPage = useAppSelector(state => getFriendsPerPageSelector(state))
    const isSearch = useAppSelector(state => getIsSearchSelector(state))

    const handlePaginatorCallback = useCallback((page) => {
        dispatch(fetchFriends({ selectedPage: page, perPage }))
    }, [dispatch, perPage])

    if (!isSearch) {
        return <Paginator pagesCount={pagesCount} handlePaginatorCallback={handlePaginatorCallback} />
    } else {
        return <></>
    }
}

export default FriendsPaginator

import React, { useCallback } from "react"
import { fetchFriends } from "redux/reducers/users"
import { getFriendsPagesCountSelector, getFriendsPerPageSelector, getIsSearchSelector } from "redux/selectors/users"
import Paginator from "../../../common/Paginator/Paginator"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../../hooks/redux.ts"

const FriendsPaginator = () => {
    const dispatch = useAppDispatch()

    const pagesCount = useAppSelector(getFriendsPagesCountSelector)
    const perPage = useAppSelector(getFriendsPerPageSelector)
    const isSearch = useAppSelector(getIsSearchSelector)

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

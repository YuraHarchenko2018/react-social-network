import React from "react"
import { fetchFriends } from "redux/reducers/users"
import { getFriendsPagesCountSelector, getFriendsPerPageSelector, getIsSearchSelector } from "redux/selectors/users"
import { Pagination } from "@mui/material"
import s from "../Friends.module.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../../hooks/redux.ts"

const FriendsPaginator = () => {
    const dispatch = useAppDispatch()

    const pagesCount = useAppSelector(getFriendsPagesCountSelector)
    const perPage = useAppSelector(getFriendsPerPageSelector)
    const isSearch = useAppSelector(getIsSearchSelector)

    const handleChange = (event, page) => {
        dispatch(fetchFriends({ selectedPage: page, perPage }))
    }

    if (!isSearch) {
        return (
            <div className={s.paginatorWrapper}>
                <Pagination
                    count={pagesCount}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                />
            </div>
        )
    } else {
        return <></>
    }
}

export default FriendsPaginator

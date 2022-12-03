import React, { useCallback } from "react"
import { fetchUsers } from "redux/reducers/users"
import { getIsSearchSelector, getUsersPagesCountSelector, getUsersPerPageSelector } from "redux/selectors/users"
import Paginator from "components/common/Paginator/Paginator"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../../../hooks/redux.ts"


const UsersPaginator = () => {
    const dispatch = useAppDispatch()

    const pagesCount = useAppSelector(state => getUsersPagesCountSelector(state))
    const perPage = useAppSelector(state => getUsersPerPageSelector(state))
    const isSearch = useAppSelector(state => getIsSearchSelector(state))

    const handlePaginatorCallback = useCallback((page) => {
        dispatch(fetchUsers({ selectedPage: page, perPage }))
    }, [dispatch, perPage])

    if (!isSearch) {
        return <Paginator pagesCount={pagesCount} handlePaginatorCallback={handlePaginatorCallback} />
    } else {
        return <></>
    }
}

export default UsersPaginator

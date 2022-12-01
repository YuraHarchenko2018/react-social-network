import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "redux/reducers/users"
import { getIsSearchSelector, getUsersPagesCountSelector, getUsersPerPageSelector } from "redux/selectors/users"
import Paginator from "components/common/Paginator/Paginator"


const UsersPaginator = () => {
    const dispatch = useDispatch()

    const pagesCount = useSelector(state => getUsersPagesCountSelector(state))
    const perPage = useSelector(state => getUsersPerPageSelector(state))
    const isSearch = useSelector(state => getIsSearchSelector(state))

    const handlePaginatorCallback = useCallback((page) => {
        // @ts-ignore
        dispatch(fetchUsers({ selectedPage: page, perPage }))
    }, [dispatch, perPage])

    if (!isSearch) {
        return <Paginator pagesCount={pagesCount} handlePaginatorCallback={handlePaginatorCallback} />
    } else {
        return <></>
    }
}


export default UsersPaginator

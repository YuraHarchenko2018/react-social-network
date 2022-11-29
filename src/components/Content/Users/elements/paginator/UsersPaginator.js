import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "redux/reducers/users"
import { getUsersPagesCountSelector, getUsersPerPageSelector } from "redux/selectors/users"
import Paginator from "components/common/Paginator/Paginator"


const UsersPaginator = () => {
    const dispatch = useDispatch()

    const pagesCount = useSelector(state => getUsersPagesCountSelector(state))
    const perPage = useSelector(state => getUsersPerPageSelector(state))

    const handlePaginatorCallback = useCallback((page) => {
        // @ts-ignore
        dispatch(fetchUsers({ selectedPage: page, perPage }))
    }, [dispatch, perPage])

    return <Paginator pagesCount={pagesCount} handlePaginatorCallback={handlePaginatorCallback} />
}


export default UsersPaginator

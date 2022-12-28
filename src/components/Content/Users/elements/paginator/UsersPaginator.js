import React from "react"
import { fetchUsers } from "redux/reducers/users"
import { getIsSearchSelector, getUsersPagesCountSelector, getUsersPerPageSelector } from "redux/selectors/users"
import { Pagination } from "@mui/material"
import s from "../../Users.module.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../../../hooks/redux.ts"


const UsersPaginator = () => {
    const dispatch = useAppDispatch()

    const pagesCount = useAppSelector(state => getUsersPagesCountSelector(state))
    const perPage = useAppSelector(state => getUsersPerPageSelector(state))
    const isSearch = useAppSelector(state => getIsSearchSelector(state))

    const handleChange = (event, page) => {
        dispatch(fetchUsers({ selectedPage: page, perPage }))
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

export default UsersPaginator

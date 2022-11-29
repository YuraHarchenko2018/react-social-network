import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNews } from "redux/reducers/news"
import { getPagesCountSelector, getPerPageSelector } from "redux/selectors/news"
import Paginator from "components/common/Paginator/Paginator"

const NewsPaginator = () => {
    const dispatch = useDispatch()

    const perPageCount = useSelector(state => getPerPageSelector(state))
    const pagesCount = useSelector(state => getPagesCountSelector(state))

    const handlePaginator = useCallback((page) => {
        // @ts-ignore
        dispatch(fetchNews({ selectedPage: page, perPage: perPageCount }))
    }, [dispatch, perPageCount])

    return <Paginator pagesCount={pagesCount} handlePaginatorCallback={handlePaginator} />
}


export default NewsPaginator

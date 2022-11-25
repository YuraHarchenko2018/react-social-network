import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNews, setSelectedPage } from "redux/reducers/news"
import { getPagesCountSelector, getPerPageSelector, getSelectedPageSelector } from "redux/selectors/news"
import Paginator from "components/common/Paginator/Paginator"

const NewsPaginator = () => {
    const dispatch = useDispatch()

    const selectedPage = useSelector(state => getSelectedPageSelector(state))
    const perPageCount = useSelector(state => getPerPageSelector(state))
    const pagesCount = useSelector(state => getPagesCountSelector(state))

    const changeSelectedPage = (page) => {
        // @ts-ignore
        dispatch(fetchNews({ selectedPage: page, perPage: perPageCount }))
        dispatch(setSelectedPage(page))
    }

    const onNextBtnClick = () => {
        let nextSelectedValue = selectedPage < pagesCount
            ? selectedPage + 1
            : selectedPage

        changeSelectedPage(nextSelectedValue)
    }

    const onPrevBtnClick = () => {
        let nextSelectedValue = selectedPage > 1
            ? selectedPage - 1
            : selectedPage

        changeSelectedPage(nextSelectedValue)
    }

    return <Paginator
        selectedPage={selectedPage}
        pagesCount={pagesCount}
        onNextBtnClick={onNextBtnClick}
        onPrevBtnClick={onPrevBtnClick}
        changeSelectedPage={changeSelectedPage}
    />
}


export default NewsPaginator

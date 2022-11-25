import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, setSelectedPage } from "redux/reducers/users"
import { getPagesCountSelector, getSelectedPageSelector } from "redux/selectors/users"
import Paginator from "components/common/Paginator/Paginator"


const UsersPaginator = () => {
    const dispatch = useDispatch()

    const selectedPage = useSelector(state => getSelectedPageSelector(state))
    const pagesCount = useSelector(state => getPagesCountSelector(state))

    const changeSelectedPage = (page) => {
        // @ts-ignore
        dispatch(fetchUsers(page))
        dispatch(setSelectedPage({ page }))
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


export default UsersPaginator

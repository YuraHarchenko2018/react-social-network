import React from "react"
import { connect } from "react-redux"
import { getUsers, setSelectedPage } from "redux/reducers/users"
import { getPagesCountSelector, getSelectedPageSelector } from "redux/selectors/users"

import Paginator from "./Paginator"


const PaginatorContainer = (props) => {

    const changeSelectedPage = (page) => {
        props.getUsers(page)
        props.setSelectedPage(page)
    }

    const onNextBtnClick = () => {
        let nextSelectedValue = props.selectedPage < props.pagesCount
                                    ? props.selectedPage + 1 
                                    : props.selectedPage
        
        changeSelectedPage(nextSelectedValue)
    }

    const onPrevBtnClick = () => {
        let nextSelectedValue = props.selectedPage > 1
                                    ? props.selectedPage - 1 
                                    : props.selectedPage
        
        changeSelectedPage(nextSelectedValue)
    }

    return <Paginator
                selectedPage={props.selectedPage} 
                pagesCount={props.pagesCount} 
                onNextBtnClick={onNextBtnClick} 
                onPrevBtnClick={onPrevBtnClick}
                changeSelectedPage={changeSelectedPage} 
            />
}

export default connect(state => ({
    selectedPage: getSelectedPageSelector(state),
    pagesCount: getPagesCountSelector(state)
}), { getUsers, setSelectedPage })(PaginatorContainer)
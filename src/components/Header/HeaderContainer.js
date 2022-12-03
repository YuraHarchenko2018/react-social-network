import React from "react"
import Header from "./Header"
import { useSelector } from "react-redux"
import { getAuthUserProfileImgLinkSelector, getIsLoginInSelector } from "redux/selectors/auth"


const HeaderContainer = () => {
    const isLoginIn = useSelector(getIsLoginInSelector)
    const authUserProfileImgLink = useSelector(getAuthUserProfileImgLinkSelector)

    return (
        <Header
            isLoginIn={isLoginIn}
            authUserProfileImgLink={authUserProfileImgLink}
        />
    )
}

export default HeaderContainer

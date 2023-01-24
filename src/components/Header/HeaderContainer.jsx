import React from 'react'
import { useSelector } from 'react-redux'
import Header from './Header'
import { getAuthUserProfileImgLinkSelector, getIsLoginInSelector } from '../../redux/selectors/auth'

function HeaderContainer() {
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

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpContainer from './components/common/PopUp/PopUpContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import NavBar from './components/Navbar/NavBar'
import Content from './components/Content/Content'
import Preloader from './components/common/Preloader/Preloader'
import { initializeApp } from './redux/reducers/init'
import { getIsAppInit } from './redux/selectors/init'
import { getAuthUserIdSelector } from './redux/selectors/auth'
import './App.css'

function App() {
  const dispatch = useDispatch()

  const isAppInit = useSelector(getIsAppInit)
  const authUserId = useSelector(getAuthUserIdSelector)

  useEffect(() => {
    dispatch(initializeApp(authUserId))
  }, [dispatch, authUserId])

  if (!isAppInit) {
    return <Preloader />
  }

  return (
    <>
      <PopUpContainer />
      <div className="app-wrapper">
        <HeaderContainer />
        <NavBar />
        <Content />
      </div>
    </>
  )
}

export default App

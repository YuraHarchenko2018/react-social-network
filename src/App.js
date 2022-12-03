import React, { useEffect } from "react"
import PopUpContainer from "./components/common/PopUp/PopUpContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import NavBar from "./components/Navbar/NavBar"
import Content from "./components/Content/Content"
import Preloader from "./components/common/Preloader/Preloader"
import { initializeApp } from "./redux/reducers/init"
import { getIsAppInit } from "./redux/selectors/init"
import { getAuthUserIdSelector } from "./redux/selectors/auth.js"
import "./App.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./hooks/redux.ts"


const App = () => {
  const dispatch = useAppDispatch()

  const isAppInit = useAppSelector(getIsAppInit)
  const authUserId = useAppSelector(getAuthUserIdSelector)

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

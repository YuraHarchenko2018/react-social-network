import React, { useEffect } from "react"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./hooks/redux.ts"
import HeaderContainer from "./components/Header/HeaderContainer"
import Preloader from "./components/common/Preloader/Preloader"
import NavBar from "./components/Navbar/NavBar"
import Content from "./components/Content/Content"
import PopUpContainer from "./components/common/PopUp/PopUpContainer"
import { initializeApp } from "./redux/reducers/init"
import { getIsAppInit } from "./redux/selectors/init"
import { getAuthUserIdSelector } from "./redux/selectors/auth.js"
import "./App.css"


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

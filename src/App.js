import React, { useEffect } from "react"
import { connect } from "react-redux";
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/Navbar/NavBar';
import Content from './components/Content/Content';
import Preloader from "components/common/Preloader/Preloader";
import { initializeApp } from "redux/reducers/init";
import { getIsAppInit } from "redux/selectors/init";
import { getAuthUserIdSelector } from "redux/selectors/auth";

import './App.css';
import PopUpContainer from "components/common/PopUp/PopUpContainer";


const App = ({ isAppInit, authUserId, initializeApp }) => {
  useEffect(() => {
    initializeApp(authUserId)
  }, [initializeApp, authUserId])

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

export default connect((state) => ({
  isAppInit: getIsAppInit(state),
  authUserId: getAuthUserIdSelector(state),
}), {
  initializeApp
})(App);

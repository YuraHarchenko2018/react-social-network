import React from "react"
import { Routes, Route } from 'react-router-dom'

import { suspenseWithPreloader } from "utils/helpers/suspenseWithPreloader"

import HelloPage from "./HelloPage/HelloPage"
import DialogsContainer from "./Dialogs/DialogsContainer"
import Login from "./Login/Login"
import SignUp from "./SignUp/SignUp"
import News from "./News/News"
import Games from "./Games/Games"

import s from "./Content.module.css"


const Content = (props) => {
    const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));
    const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));

    return (
        <div className={s.content}>
            <Routes>
                <Route path="/" element={ <HelloPage /> } />

                <Route path="/profile/">
                    <Route path=":userId" element={suspenseWithPreloader(ProfileContainer)} />
                    <Route path="" element={suspenseWithPreloader(ProfileContainer)} />
                </Route>
                
                <Route path="dialogs" element={ <DialogsContainer /> } />
                <Route path="users" element={suspenseWithPreloader(UsersContainer)} />
                <Route path="news" element={ <News /> } />
                <Route path="games" element={ <Games /> } />

                <Route path="login" element={ <Login /> } />
                <Route path="sign-up" element={ <SignUp /> } />
            </Routes>
        </div>
    )
}

export default Content
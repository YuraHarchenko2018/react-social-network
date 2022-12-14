import React from "react"
import { Routes, Route } from 'react-router-dom'
import { suspenseWithPreloader } from "utils/helpers/suspenseWithPreloader"
import HelloPage from "./HelloPage/HelloPage"
import Dialogs from "./Dialogs/Dialogs"
import FriendsContainer from "./Friends/FriendsContainer"
import News from "./News/News"
import Login from "./Login/Login"
import SignUp from "./SignUp/SignUp"
import s from "./Content.module.css"


const Content = () => {
    const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));
    const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));

    return (
        <div className={s.content}>
            <Routes>
                <Route path="/" element={<HelloPage />} />

                <Route path="/profile/">
                    <Route path="" element={suspenseWithPreloader(ProfileContainer)} />
                    <Route path=":userId" element={suspenseWithPreloader(ProfileContainer)} />
                </Route>

                <Route path="dialogs" element={<Dialogs />} />
                <Route path="friends" element={<FriendsContainer />} />
                <Route path="users" element={suspenseWithPreloader(UsersContainer)} />
                <Route path="news" element={<News />} />

                <Route path="login" element={<Login />} />
                <Route path="sign-up" element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default Content

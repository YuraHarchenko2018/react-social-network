import React, { useEffect } from "react"
import Preloader from "components/common/Preloader/Preloader"
import { useDispatch, useSelector } from "react-redux"
import { getNews, setNews } from "redux/reducers/news"
import { getNewsSelector } from "redux/selectors/news"
import { Posts } from "../Profile/Posts/Posts"


const News = () => {
    const dispatch = useDispatch()
    const news = useSelector(state => getNewsSelector(state))

    // unmount
    useEffect( () => () => {
        dispatch(setNews({ posts: null }))
    }, [dispatch] );

    if (news === null) {
        getNews()(dispatch)
        return <Preloader />
    }

    return <Posts posts={news} enviroment="news" />
}

export default News

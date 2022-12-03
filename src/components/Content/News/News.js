import React, { useEffect, useState } from "react"
import Preloader from "components/common/Preloader/Preloader"
import { fetchNews, setNews } from "redux/reducers/news"
import { getPerPageSelector, getNewsSelector } from "redux/selectors/news"
import { Posts } from "../Profile/Posts/Posts"
import s from "./News.module.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"


const News = () => {
    const dispatch = useAppDispatch()

    const [newsPage, setNewsPage] = useState(1)

    const news = useAppSelector(getNewsSelector)
    const perPage = useAppSelector(getPerPageSelector)

    // did mount
    useEffect(() => { dispatch(fetchNews({ selectedPage: 1, perPage })) }, [dispatch, perPage]);
    // unmount
    useEffect(() => () => { dispatch(setNews({ posts: null })) }, [dispatch])

    const handleScroll = (e) => {
        // s.newsWrapper: max-height == 600px
        const scrollBaseHeight = 600
        const scrollHeight = e.target.scrollHeight
        const scrollTop = e.target.scrollTop

        const isEnd = scrollHeight - scrollTop - scrollBaseHeight <= 0 ? true : false

        if (isEnd) {
            const nextPage = newsPage + 1
            dispatch(fetchNews({ selectedPage: nextPage, perPage: 5 }))
            setNewsPage(nextPage)
        }
    }

    if (!news.length) {
        return <Preloader />
    }

    return (
        <div onScroll={handleScroll} className={s.newsWrapper}>
            <Posts posts={news} enviroment="news" />
        </div>
    )
}


export default News

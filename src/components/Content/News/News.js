import React, { useEffect } from "react"
import Preloader from "components/common/Preloader/Preloader"
import { fetchNews, setNews } from "redux/reducers/news"
import { getPerPageSelector, getNewsSelector, getNewsIsLoadingSelector } from "redux/selectors/news"
import useInfiniteScroll from "hooks/useInfiniteScroll"
import { Posts } from "../Profile/Posts/Posts"
import s from "./News.module.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"


const News = () => {
    const dispatch = useAppDispatch()

    const news = useAppSelector(getNewsSelector)
    const perPage = useAppSelector(getPerPageSelector)
    const loading = useAppSelector(getNewsIsLoadingSelector)

    const { loadMoreRef, page } = useInfiniteScroll()

    useEffect(() => {
        dispatch(fetchNews({
            selectedPage: page,
            perPage: perPage,
        }))
    }, [dispatch, perPage, page]);

    // unmount
    useEffect(() => () => {
        dispatch(setNews({ posts: null }))
    }, [dispatch])

    if (!news.length) {
        return <Preloader />
    }

    return (
        <>
            <div className={s.newsWrapper}>
                <Posts posts={news} enviroment="news" />
                <div ref={loadMoreRef}>{loading && <Preloader />}</div>
            </div>
        </>
    )
}


export default News

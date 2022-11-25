import React, { useEffect } from "react"
import Preloader from "components/common/Preloader/Preloader"
import { useDispatch, useSelector } from "react-redux"
import { fetchNews, setNews } from "redux/reducers/news"
import { getPerPageSelector, getSelectedPageSelector, getNewsSelector } from "redux/selectors/news"
import { Posts } from "../Profile/Posts/Posts"
import NewsPaginator from "./NewsPaginator"


const News = () => {
    const dispatch = useDispatch()
    const news = useSelector(state => getNewsSelector(state))
    const selectedPage = useSelector(state => getSelectedPageSelector(state))
    const perPage = useSelector(state => getPerPageSelector(state))

    // @ts-ignore | did mount
    useEffect(() => { dispatch(fetchNews({ selectedPage, perPage })) }, [dispatch, selectedPage, perPage]);
    // unmount
    useEffect(() => () => { dispatch(setNews({ posts: null })) }, [dispatch])

    if (news === null) {
        return <Preloader />
    }

    return (
        <>
            <NewsPaginator />
            <Posts posts={news} enviroment="news" />
        </>
    )
}


export default News

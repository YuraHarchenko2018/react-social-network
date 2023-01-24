import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../common/Preloader/Preloader'
import { fetchNews, setNews } from '../../../redux/reducers/news'
import { getPerPageSelector, getNewsSelector, getNewsIsLoadingSelector } from '../../../redux/selectors/news'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'
import { Posts } from '../Profile/Posts/Posts'
import s from './News.module.css'

function News() {
  const dispatch = useDispatch()

  const news = useSelector(getNewsSelector)
  const perPage = useSelector(getPerPageSelector)
  const loading = useSelector(getNewsIsLoadingSelector)

  const { loadMoreRef, page } = useInfiniteScroll()

  useEffect(() => {
    dispatch(fetchNews({
      selectedPage: page,
      perPage,
    }))
  }, [dispatch, perPage, page])

  // unmount
  useEffect(() => () => {
    dispatch(setNews({ posts: null }))
  }, [dispatch])

  if (!news.length) {
    return <Preloader />
  }

  return (
    <div className={s.newsWrapper}>
      <Posts posts={news} environment="news" />
      <div ref={loadMoreRef}>{loading && <Preloader />}</div>
    </div>
  )
}

export default News

import { useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementSelectedPage } from '../redux/reducers/dialogs'
import {
  getSelectedDialogSelector,
  getDialogsMessagesSelector,
} from '../redux/selectors/dialogs'

const useChatInfiniteScroll = () => {
  const dispatch = useDispatch()
  const loadMoreRef = useRef(null)

  const selectedChatId = useSelector(getSelectedDialogSelector)
  const messages = useSelector(getDialogsMessagesSelector)

  const handleObserver = useCallback(([entry]) => {
    // console.log(`isIntersecting ${entry.isIntersecting}`)
    if (entry.isIntersecting) {
      dispatch(incrementSelectedPage())
    }
  }, [dispatch])

  useEffect(() => {
    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, observerOption)

    if (loadMoreRef.current && messages.length) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [handleObserver, selectedChatId, loadMoreRef, messages])

  return { loadMoreRef }
}

export default useChatInfiniteScroll

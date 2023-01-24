import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSelectedDialogSelector } from '../redux/selectors/dialogs'

const useInfiniteScroll = () => {
  const [page, setPage] = useState(1)

  const loadMoreRef = useRef(null)
  const refCurrent = loadMoreRef.current

  const selectedChatId = useSelector(getSelectedDialogSelector)

  console.log(refCurrent)
  // const handleObserver = useCallback(([entry]) => {
  //   if (entry.isIntersecting) {
  //     setPage(page => page + 1)
  //   }
  // }, [])

  const resetPage = () => {
    setPage(1)
  }

  useEffect(() => {
    resetPage()

    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const elem = document.querySelector('#test_test_test')
    console.log('elem')
    console.log(elem)

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('isIntersecting true')
        setPage((currentPage) => currentPage + 1)
      }
    }, observerOption)

    if (elem) { // loadMoreRef.current
      observer.observe(elem)
    }

    return () => {
      observer.disconnect()
    }
  }, [selectedChatId])

  return { loadMoreRef, page, resetPage }
}

export default useInfiniteScroll

import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

const useNewsInfiniteScroll = () => {
  const [page, setPage] = useState(1)

  const loadMoreRef = useRef(null);
  const refCurrent = loadMoreRef.current

  const handleObserver = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [])

  useEffect(() => {
    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, observerOption)

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }
  }, [handleObserver, refCurrent])

  return { loadMoreRef, page }
}

export default useNewsInfiniteScroll

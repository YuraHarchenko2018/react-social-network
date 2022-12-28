import { useState, useRef, useCallback, useEffect } from 'react';

const useInfiniteScroll = () => {
  const [page, setPage] = useState(1);

  const loadMoreRef = useRef(null);
  const refCurrent = loadMoreRef.current

  const handleObserver = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [])

  useEffect(() => {
    const observeerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, observeerOption)

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

  }, [handleObserver, refCurrent]);

  return { loadMoreRef, page };
}

export default useInfiniteScroll;
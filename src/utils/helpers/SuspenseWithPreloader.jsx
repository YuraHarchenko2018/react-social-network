import React, { Suspense } from 'react'
import Preloader from '../../components/common/Preloader/Preloader'

function SuspenseWithPreloader(Component) {
  return (
    <Suspense fallback={<Preloader />}>
      <Component />
    </Suspense>
  )
}

// replace from helper
export default SuspenseWithPreloader

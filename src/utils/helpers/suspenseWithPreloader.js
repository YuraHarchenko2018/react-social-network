import React, { Suspense } from "react"
import Preloader from "components/common/Preloader/Preloader"

export const suspenseWithPreloader = (Component) => {
    return (
        <Suspense fallback={<Preloader />}>
            <Component />
        </Suspense>
    )
}
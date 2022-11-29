import React, { useEffect, useState } from 'react'
import { generateOrderNumbersArray } from 'utils/helpers/generateOrderNumbersArray'

import s from './Paginator.module.css'


const Paginator = ({ pagesCount, handlePaginatorCallback }) => {
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        handlePaginatorCallback(currentPage)
    }, [handlePaginatorCallback, currentPage])

    const renderPageButtons = () => {
        let pagesJSX = generateOrderNumbersArray(pagesCount).map(buttonPage => {
            let pageClassName = currentPage === buttonPage ? s.pageBtn + " " + s.activePageBtn : s.pageBtn

            return (
                <div key={buttonPage} className={pageClassName} onClick={() => setCurrentPage(buttonPage)}>
                    {buttonPage}
                </div>
            )
        })

        return pagesJSX
    }

    const onNextBtnClick = () => {
        if (currentPage < pagesCount) {
            setCurrentPage(page => page + 1)
        }
    }

    const onPrevBtnClick = () => {
        if (currentPage > 1) {
            setCurrentPage(page => page - 1)
        }
    }

    return (
        <div className={s.paginatorWrapper}>
            <div className={s.pages}>
                {
                    renderPageButtons()
                }
            </div>
            <div className={s.nextBtnWrapper}>
                <button onClick={onPrevBtnClick} className={s.prevBtn}>Prev</button>
                <button onClick={onNextBtnClick} className={s.nextBtn}>Next</button>
            </div>
        </div>
    )
}

export default Paginator
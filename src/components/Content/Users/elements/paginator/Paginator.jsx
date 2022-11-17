import React from 'react'

import s from './Paginator.module.css'


const Paginator = (props) => {

    const generateSipmlePagesArray = (pagesCount) => {
        let simplePagesArray = []

        for (let i = 1; i <= pagesCount; i++) {
            simplePagesArray.push(i)
        }

        return simplePagesArray
    }

    const renderPageButtons = () => {
        let simplePagesArray = generateSipmlePagesArray(props.pagesCount)
        
        let pagesJSX = simplePagesArray.map(page => {
            let pageClassName = (page === props.selectedPage) 
                            ? s.pageBtn + " " + s.activePageBtn 
                            : s.pageBtn
            return (
                <div 
                    key={page} className={pageClassName} 
                    onClick={() => { props.changeSelectedPage(page) }} 
                >
                    {page}
                </div>
            )
        })
        
        return pagesJSX
    }

    return (
        <div className={s.paginatorWrapper}>
            <div className={s.pages}>
                { renderPageButtons() }
            </div>
            <div className={s.nextBtnWrapper}>
                <button onClick={props.onPrevBtnClick} className={s.prevBtn}>Prev</button>
                <button onClick={props.onNextBtnClick} className={s.nextBtn}>Next</button>
            </div>
        </div>
    )
}

export default Paginator
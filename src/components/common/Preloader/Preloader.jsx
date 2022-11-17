import React from 'react'
import PreloaderGIF from '../../../assets/Preloader.gif'

import s from './Preloader.module.css'


const Preloader = (props) => {
    return (
        <div className={s.preloaderWrapper}>
            <img alt="#" src={PreloaderGIF} />
        </div>
    )
}

export default Preloader
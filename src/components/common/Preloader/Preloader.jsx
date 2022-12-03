import React from 'react'
import PreloaderGIF from '../../../assets/Preloader.gif'

import s from './Preloader.module.css'


const Preloader = () => {
    return (
        <div className={s.preloaderWrapper}>
            <img alt="#" src={PreloaderGIF} />
        </div>
    )
}

export default Preloader
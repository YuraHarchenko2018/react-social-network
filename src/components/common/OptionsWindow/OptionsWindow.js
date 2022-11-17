import React, { useState } from "react"
import s from "./OptionsWindow.module.css"

const OptionsWindow = ({ buttonsSettings }) => {
    const [isShow, setIsShow] = useState(false)

    const handleOptionsBtn = () => setIsShow(isShow => !isShow)
    const handleOption = (callback) => {
        setIsShow(false)
        callback()
    }

    const generateOptionBtns = (buttonsSettings = []) => {
        return buttonsSettings.map(btn => {
            return (
                <div 
                    key={btn.id}
                    onClick={() => handleOption(btn.onClickFunc)}
                    className={s.optionBtn} 
                >{btn.text}</div>
            )
        })
    }

    return (
        <div className={s.optionsWrapper}>
            <div onClick={handleOptionsBtn} className={s.optionsBtn}>:</div>
            {isShow && (
                <div className={s.optionsContainer}>
                    { generateOptionBtns(buttonsSettings) }
                </div>
            )}
        </div>
    )
}

export default OptionsWindow
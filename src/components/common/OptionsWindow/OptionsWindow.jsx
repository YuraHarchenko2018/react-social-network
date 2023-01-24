import React, { useState } from 'react'
import s from './OptionsWindow.module.css'

function OptionsWindow({ buttonsSettings }) {
  const [isShow, setIsShow] = useState(false)

  const handleOptionsBtn = () => setIsShow((isShowActualValue) => !isShowActualValue)
  const handleOption = (callback) => {
    setIsShow(false)
    callback()
  }

  const generateOptionBtns = () => {
    const result = buttonsSettings.map((btn) => (
      <div
        key={btn.id}
        role="presentation"
        onClick={() => handleOption(btn.onClickFunc)}
        className={s.optionBtn}
      >
        {btn.text}
      </div>
    ))
    return result
  }

  return (
    <div className={s.optionsWrapper}>
      <div role="presentation" onClick={handleOptionsBtn} className={s.optionsBtn}>:</div>
      {isShow && (
        <div className={s.optionsContainer}>
          { generateOptionBtns(buttonsSettings) }
        </div>
      )}
    </div>
  )
}

export default OptionsWindow

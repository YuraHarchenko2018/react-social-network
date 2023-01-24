import React from 'react'
import s from './SelectChatPreview.module.css'

function SelectChatPreview() {
  return (
    <div className={s.wrapper}>
      <h3>Select chat</h3>

      <span>If you don&apos;t have any chat</span>
      <br />
      <span>You can create new with friend-list left</span>
      <br />
      <br />
      <span>If you don&apos;t have any friend yet</span>
      <br />
      <b>Lets find some one!</b>
    </div>
  )
}

export default SelectChatPreview

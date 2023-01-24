import React from 'react'
import { useSelector } from 'react-redux'
import { getAuthUserIdSelector } from '../../../../../../redux/selectors/auth'
import s from './MessageItem.module.css'

function MessageItem({ userId, message }) {
  const authUserId = useSelector((state) => getAuthUserIdSelector(state))
  const flexAlign = userId === authUserId ? 'flex-end' : 'flex-start'
  return (
    <div className={s.message} style={({ alignSelf: flexAlign })}>
      {message}
    </div>
  )
}

export default MessageItem

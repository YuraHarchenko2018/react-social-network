import React, { useState } from 'react'
import generateStatus from '../../../../../utils/helpers/generateStatus'
import { updateUserStatus } from '../../../../../redux/reducers/profile'
import s from './Status.module.css'
// @ts-ignore
import { useAppDispatch } from '../../../../../hooks/redux.ts'

function Status({ userId, actualUserStatus, authUserId }) {
  const dispatch = useAppDispatch()

  const userStatus = actualUserStatus || generateStatus()

  const [localUserStatus, setLocalUserStatus] = useState(userStatus)
  const [isStatusEditMode, setStatusEditMode] = useState(false)

  const userStatusInputOnChange = ({ target }) => {
    setLocalUserStatus(target.value)
  }

  const toggleUserStatusMode = () => {
    if (userId === authUserId) {
      setStatusEditMode(!isStatusEditMode)
    }
  }

  const handleUserStatus = () => {
    toggleUserStatusMode()

    if (!localUserStatus) {
      setLocalUserStatus(userStatus)
    }

    if (localUserStatus !== actualUserStatus) {
      dispatch(updateUserStatus(localUserStatus))
    }
  }

  return (
    <div className={s.userInfoStatusWrapper}>
      {
        isStatusEditMode
          ? (
            <input
              className={s.statusInput}
              autoFocus
              onBlur={handleUserStatus}
              onChange={userStatusInputOnChange}
              value={localUserStatus}
            />
          )
          : (
            <span
              role="presentation"
              onClick={toggleUserStatusMode}
              className={s.statusSpan}
            >
              {localUserStatus}
            </span>
          )
      }
    </div>
  )
}

export default Status

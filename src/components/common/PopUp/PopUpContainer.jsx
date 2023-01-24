import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShow } from '../../../redux/reducers/popup'
import { getContentPopUp, getIsShowPopUp } from '../../../redux/selectors/popup'
import UpdateUserInfoPopUp from './popUps/updateUserInfo/updateUserInfo'
import UpdatePostTextPopUp from './popUps/updatePostText/updatePostText'
import DeletePostPopUp from './popUps/deletePost/deletePost'
import s from './PopUpContainer.module.css'

const getContentComponent = (content) => {
  switch (content) {
    case 'updatePostText':
      return <UpdatePostTextPopUp />
    case 'deletePost':
      return <DeletePostPopUp />
    case 'updateUserInfo':
      return <UpdateUserInfoPopUp />

    default:
      return <div />
  }
}

function PopUpContainer() {
  const dispatch = useDispatch()
  const content = useSelector((state) => getContentPopUp(state))
  const isShow = useSelector((state) => getIsShowPopUp(state))

  const Component = getContentComponent(content)

  const closePopUp = () => dispatch(setIsShow({ isShow: false }))

  return (
    <div>
      {
        isShow ? (
          <div className={s.backgroundBlur}>
            <div className={s.popUpContainer}>
              <button type="button" className={s.closeBtn} onClick={closePopUp}>Close</button>
              {Component}
            </div>
          </div>
        ) : <div />
      }
    </div>
  )
}

export default PopUpContainer

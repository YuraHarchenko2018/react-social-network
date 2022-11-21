import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsShow } from "redux/reducers/popup"
import { updatePost } from "redux/reducers/profile"
import { getPopUpPayload } from "redux/selectors/popup"
import containerStyle from "./../../PopUpContainer.module.css"

import s from "./updatePostText.module.css"


const UpdatePostTextPopUp = () => {
    const dispatch = useDispatch()
    const popUpPayload = useSelector(state => getPopUpPayload(state))
    const postId = popUpPayload.postId
    const postText = popUpPayload.postText

    const [localPostText, setLocalPostText] = useState(postText)

    const handleApproveBtn = () => {
        if (localPostText !== postText) {
            updatePost(postId, localPostText)(dispatch)
        }
        dispatch(setIsShow({ isShow: false }))
    }

    const handleOnChangeTextarea = ({ target }) => {
        const newText = target.value
        setLocalPostText(newText)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.title}>
                Update post text
            </div>
            <div className={s.textareaWrapper}>
                <textarea value={localPostText} onChange={handleOnChangeTextarea} />
            </div>
            <button onClick={handleApproveBtn} className={containerStyle.approveBtn}>Approve</button>
        </div>
    )
}

export default UpdatePostTextPopUp
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsShow } from "redux/reducers/popup"
import { deletePost } from "redux/reducers/profile"
import { getPopUpPayload } from "redux/selectors/popup"

import s from "./deletePostText.module.css"


const DeletePostPopUp = () => {
    const dispatch = useDispatch()
    const payload = useSelector(state => getPopUpPayload(state))

    const handleYesBtn = () => {
        if (payload.postId) {
            deletePost(payload.postId)(dispatch)
        }
        dispatch(setIsShow({ isShow: false }))
    }

    const handleNoBtn = () => {
        dispatch(setIsShow({ isShow: false }))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.title}>
                Are you sure?
            </div>
            <div className={s.buttonsWrapper}>
                <div className={s.buttonWrapper}>
                    <button onClick={handleYesBtn}>Yes</button>
                </div>
                <div className={s.buttonWrapper}>
                    <button onClick={handleNoBtn}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostPopUp
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowPopUp } from "redux/reducers/popup";
import { getContentPopUp, getIsShowPopUp } from "redux/selectors/popup";

import UpdatePostTextPopUp from "./popUps/updatePostText/updatePostText";
import DeletePostPopUp from "./popUps/deletePost/deletePost";

import s from './PopUpContainer.module.css'


const PopUpContainer = () => {
    const dispatch = useDispatch()
    const content = useSelector(state => getContentPopUp(state))
    const isShow = useSelector(state => getIsShowPopUp(state))

    const Component = getContentComponent(content)

    const closePopUp = () => dispatch(setIsShowPopUp(false))

    return (
        <>
            {
                isShow ? (
                    <div className={s.backgroundBlur}>
                        <div className={s.popUpContainer}>
                            <button className={s.closeBtn} onClick={closePopUp}>Close</button>
                            { Component }
                        </div>
                    </div>
                ) : <></>
            }
        </>
    )
}

const getContentComponent = (content) => {
    switch (content) {
        case "updatePostText":
            return <UpdatePostTextPopUp />
        case "deletePost":
            return <DeletePostPopUp />
    
        default:
            return <></>
    }
}

export default PopUpContainer
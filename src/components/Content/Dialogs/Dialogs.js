import React, { useEffect, useState } from "react"
import useLoginRedirect from "hooks/useLoginRedirect"
import SendMessageForm from "components/common/ReduxForms/SendMessage/SendMessageForm"
import DialogUserItem from "./Components/DialogUserItem/DialogUserItem";
import MessageItem from "./Components/MessageItem/MessageItem";
import { List } from "@mui/material";
import { chatAPI } from "api/chat";
import { getDialogsMessagesSelector, getDialogsUsersSelector, getSelectedDialogSelector } from "redux/selectors/dialogs";
import s from "./Dialogs.module.css"
import {
    fetchDialogs,
    fetchMessages,
    setSelectedDialog,
    startListeningMessage,
    stopListeningMessage,
} from "redux/reducers/dialogs";
// @ts-ignore
import { useAppDispatch, useAppSelector } from "hooks/redux.ts";


const Dialogs = () => {
    useLoginRedirect()

    const [isSelectedChat, setSelectedChat] = useState(false)

    const dispatch = useAppDispatch()

    const dialogs = useAppSelector(getDialogsUsersSelector)
    const messages = useAppSelector(getDialogsMessagesSelector)
    const selectedChatId = useAppSelector(getSelectedDialogSelector)

    useEffect(() => {
        dispatch(fetchDialogs())
        dispatch(startListeningMessage())
    }, [dispatch])

    useEffect(() => () => {
        dispatch(stopListeningMessage())
    }, [dispatch])

    useEffect(() => {
        if (!!selectedChatId) {
            setSelectedChat(true)
        }
    }, [selectedChatId])

    const handleSendMessageSubmit = ({ message }) => {
        chatAPI.handleSendMessage(message, selectedChatId)
    }

    const handleDialogClick = (chatId) => () => {
        dispatch(setSelectedDialog(chatId))
        dispatch(fetchMessages(chatId))
    }

    return (
        <div className={s.dialogWindow}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
                {
                    dialogs.map(el => {
                        const chatId = el.chat[0].id
                        return (
                            <DialogUserItem
                                key={el.id}
                                avatarImg={el.avatarImg}
                                userName={el.name}
                                isSelected={selectedChatId === chatId}
                                handleClick={handleDialogClick(chatId)}
                            />
                        )
                    })
                }
            </List>
            <div className={s.messagesList}>
                {
                    isSelectedChat && messages.map(el => <MessageItem key={el.id} userId={el.senderId} message={el.text} />)
                }
                {
                    !isSelectedChat && <h3>Select chat</h3>
                }
            </div>
            <div className="mock"></div>
            <div>
                {
                    isSelectedChat && <SendMessageForm onSubmit={handleSendMessageSubmit} />
                }
            </div>
        </div>
    )
}

export default Dialogs
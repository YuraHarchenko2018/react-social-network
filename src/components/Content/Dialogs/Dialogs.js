import React, { useEffect } from "react"
import useLoginRedirect from "hooks/useLoginRedirect"
import SendMessageForm from "components/common/ReduxForms/SendMessage/SendMessageForm"
import DialogUserItem from "./Components/DialogUserItem/DialogUserItem";
import MessageItem from "./Components/MessageItem/MessageItem";
import s from "./Dialogs.module.css"
import { List } from "@mui/material";
import { chatAPI } from "api/chat";
import { useDispatch } from "react-redux";


const Dialogs = ({ dialogs, messages, addMessage }) => {
    useLoginRedirect()

    const dispatch = useDispatch()

    useEffect(() => {
        chatAPI.listenOnMessage(dispatch)
    }, [dispatch, addMessage])

    const handleSubmit = ({ message }) => {
        chatAPI.handleSendMessage(message)
    }

    return (
        <div className={s.dialogWindow}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
                {
                    dialogs.map(el => <DialogUserItem key={el.id} userName={el.name} />)
                }
            </List>
            <div className={s.messagesList}>
                {
                    messages.map(el => <MessageItem key={el.id} userId={el.userId} message={el.message} />)
                }
            </div>
            <div className="mock"></div>
            <div>
                <SendMessageForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default Dialogs
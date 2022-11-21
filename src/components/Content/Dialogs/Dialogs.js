import React from "react"
import useLoginRedirect from "hooks/useLoginRedirect"
import SendMessageForm from "components/common/ReduxForms/SendMessage/SendMessageForm"

import s from "./Dialogs.module.css"


const DialogUserItem = ({ userName }) => <div className={s.dialogUser}>{userName}</div>
const MessageItem    = ({ message }) => <div className={s.message} style={({ alignSelf: "flex-start" })}>{message}</div>

const Dialogs = ({ isLoginIn, dialogs, messages, addMessage }) => {
    useLoginRedirect(isLoginIn)

    const handleSubmit = ({ message }) => addMessage({ message })
    
    const dialogsItems  = dialogs.map( el =>  <DialogUserItem key={el.id} userName={el.userName} /> )
    const messagesItems = messages.map( el =>  <MessageItem key={el.id} message={el.message} /> )

    return (
        <div className={s.dialogWindow}>
            <div className={s.dialogsList}>
                { dialogsItems }
            </div>
            <div className={s.messagesList}>
                { messagesItems }
            </div>
            <div className="mock"></div>
            <div>
                <SendMessageForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default Dialogs
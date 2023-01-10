import React, { useEffect, useRef, useState } from "react"
import useLoginRedirect from "hooks/useLoginRedirect"
import SendMessageForm from "components/common/ReduxForms/SendMessage/SendMessageForm"
import DialogUserItem from "./Components/DialogUserItem/DialogUserItem";
import MessageItem from "./Components/MessageItem/MessageItem";
import { List } from "@mui/material";
import { chatAPI } from "api/chat";
import { getDialogsMessagesSelector, getDialogsUsersSelector, getFriendsWithoutChat, getSelectedDialogSelector, getUnreadedAmountForChatSelector, getUnreadedMessagesSelector } from "redux/selectors/dialogs";
import s from "./Dialogs.module.css"
import {
    createChat,
    fetchDialogs,
    fetchMessages,
    nullifyUnreadedMessagesValueForChat,
    setSelectedDialog,
    startListeningMessage,
    stopListeningMessage,
} from "redux/reducers/dialogs";
// @ts-ignore
import { useAppDispatch, useAppSelector } from "hooks/redux.ts";
import { fetchFriends } from "redux/reducers/users";


const Dialogs = () => {
    useLoginRedirect()

    const [isSelectedChat, setSelectedChat] = useState(false)

    const dispatch = useAppDispatch()

    const dialogs = useAppSelector(getDialogsUsersSelector)
    const friends = useAppSelector(getFriendsWithoutChat)
    const messages = useAppSelector(getDialogsMessagesSelector)
    const selectedChatId = useAppSelector(getSelectedDialogSelector)
    const unreadedMessages = useAppSelector(getUnreadedMessagesSelector)

    const messagesListEl = useRef(null);

    useEffect(() => {
        dispatch(fetchDialogs())
        dispatch(fetchFriends({ selectedPage: 1, perPage: 100 })) // ??? add mark to select all
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

    useEffect(() => {
        if (messagesListEl) {
            messagesListEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event
                target.scroll({ top: target.scrollHeight }) // , behavior: 'smooth'
            });
        }
    }, [])

    const handleSendMessageSubmit = ({ message }) => {
        chatAPI.handleSendMessage(message, selectedChatId)
    }

    const handleDialogClick = (chatId) => () => {
        dispatch(setSelectedDialog(chatId))
        dispatch(fetchMessages(chatId))
        dispatch(nullifyUnreadedMessagesValueForChat(chatId))
    }

    return (
        <div className={s.dialogWindow}>
            <div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
                    {
                        dialogs.map(el => {
                            const chatId = el.chat[0].id
                            const newMessagesAmount = getUnreadedAmountForChatSelector(unreadedMessages, chatId)
                            return (
                                <DialogUserItem
                                    key={el.id}
                                    avatarImg={el.avatarImg}
                                    userName={el.name}
                                    isSelected={selectedChatId === chatId}
                                    handleClick={handleDialogClick(chatId)}
                                    newMessagesAmount={newMessagesAmount}
                                />
                            )
                        })
                    }
                </List>
                {
                    friends && friends.length > 0 ? <FriendsList friends={friends} /> : 'No one friend yet'
                }
            </div>
            <div className={s.messagesList} ref={messagesListEl}>
                <div className={s.messages}>
                    {
                        isSelectedChat && messages.map(el => <MessageItem key={el.id} userId={el.senderId} message={el.text} />)
                    }
                </div>
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

const FriendsList = ({ friends }) => {

    const dispatch = useAppDispatch()

    const handleFriendClick = (friendId) => () => {
        dispatch(createChat(friendId))
    }

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <i style={{ fontSize: "10px" }}>Friends without chat</i>
            </div>
            <div className={s.friendsList}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
                    {
                        friends && friends.map(friend => {
                            return (
                                <DialogUserItem
                                    key={friend.id}
                                    avatarImg={friend.avatarImg}
                                    userName={friend.name}
                                    isSelected={false}
                                    handleClick={handleFriendClick(friend.id)}
                                    newMessagesAmount={0}
                                />
                            )
                        })
                    }
                </List>
            </div>
        </>
    )
}

export default Dialogs
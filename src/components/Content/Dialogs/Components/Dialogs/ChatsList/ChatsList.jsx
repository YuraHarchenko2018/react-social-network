import React from 'react'
import { List } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {
  setMessages,
  nullifyUnreadMessagesValueForChat,
  setSelectedDialog,
} from '../../../../../../redux/reducers/dialogs'
import {
  getSelectedDialogSelector,
  getUnreadAmountForChatSelector,
  getUnreadMessagesSelector,
} from '../../../../../../redux/selectors/dialogs'
import DialogUserItem from '../DialogUserItem/DialogUserItem'

function ChatsList({ dialogs }) {
  const dispatch = useDispatch()

  const unreadMessages = useSelector(getUnreadMessagesSelector)
  const selectedChatId = useSelector(getSelectedDialogSelector)

  const handleDialogClick = (chatId) => () => {
    dispatch(setSelectedDialog(chatId))
    dispatch(setMessages([]))
    dispatch(nullifyUnreadMessagesValueForChat(chatId))
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
      {
        dialogs.map((el) => {
          const chatId = el.chat[0].id
          const newMessagesAmount = getUnreadAmountForChatSelector(unreadMessages, chatId)
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
  )
}

export default ChatsList

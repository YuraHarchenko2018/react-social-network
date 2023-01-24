import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Messages from './Components/Messages/Messages'
import SendMessageForm from '../../common/ReduxForms/SendMessage/SendMessageForm'
import {
  fetchDialogs,
  startListeningMessage,
  stopListeningMessage,
} from '../../../redux/reducers/dialogs'
import DialogsUsers from './Components/Dialogs/DialogsUsers'
import useLoginRedirect from '../../../hooks/useLoginRedirect'
import { getSelectedDialogSelector } from '../../../redux/selectors/dialogs'
import { fetchFriends } from '../../../redux/reducers/users'
import { chatAPI } from '../../../api/chat'
import s from './Dialogs.module.css'

function Dialogs() {
  useLoginRedirect()

  const dispatch = useDispatch()
  const selectedChatId = useSelector(getSelectedDialogSelector)

  useEffect(() => {
    dispatch(fetchDialogs())
    dispatch(fetchFriends({ selectedPage: 1, perPage: 100 }))
    dispatch(startListeningMessage())
  }, [dispatch])

  useEffect(() => () => {
    dispatch(stopListeningMessage())
  }, [dispatch])

  const handleSendMessageSubmit = ({ message }) => {
    chatAPI.handleSendMessage(message, selectedChatId)
  }

  return (
    <div className={s.dialogWindow}>
      <DialogsUsers />
      <Messages />
      <div className="mock" />
      <div>
        {
          !!selectedChatId && <SendMessageForm onSubmit={handleSendMessageSubmit} />
        }
      </div>
    </div>
  )
}

export default Dialogs

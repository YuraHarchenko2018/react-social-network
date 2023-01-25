import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../../../../redux/reducers/dialogs'
import {
  getDialogsMessagesSelector,
  getSelectedDialogSelector,
  getSelectedChatPageSelector,
  isMessagesLoadAvailableSelector,
} from '../../../../../redux/selectors/dialogs'
import useChatInfiniteScroll from '../../../../../hooks/useChatInfiniteScroll'
import SelectChatPreview from './SelectChatPreview/SelectChatPreview'
import MessageItem from './MessageItem/MessageItem'
import s from './Messages.module.css'

function Messages() {
  const dispatch = useDispatch()

  const messages = useSelector(getDialogsMessagesSelector)
  const selectedChatId = useSelector(getSelectedDialogSelector)
  const selectedChatPage = useSelector(getSelectedChatPageSelector)
  const isMessagesLoadAvailable = useSelector(isMessagesLoadAvailableSelector)

  const { loadMoreRef } = useChatInfiniteScroll()

  const messagesListEl = useRef(null)

  useEffect(() => {
    if (selectedChatId) {
      dispatch(fetchMessages({
        chatId: selectedChatId,
        page: selectedChatPage,
        limit: 30,
      }))
    }
  }, [dispatch, selectedChatId, selectedChatPage])

  useEffect(() => {
    if (messagesListEl) {
      messagesListEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight }) // , behavior: 'smooth'
      })
    }
  }, [])

  const messageMapFunc = (el) => <MessageItem key={el.id} userId={el.senderId} message={el.text} />

  return (
    <div className={s.messagesList} ref={messagesListEl}>
      <div className={s.messages}>
        {
          !!selectedChatId && messages.map(messageMapFunc)
        }
        {
          !!selectedChatId && !!messages.length && isMessagesLoadAvailable && (
            <div ref={loadMoreRef} />
          )
        }
      </div>
      {
        !selectedChatId && <SelectChatPreview />
      }
    </div>
  )
}

export default Messages

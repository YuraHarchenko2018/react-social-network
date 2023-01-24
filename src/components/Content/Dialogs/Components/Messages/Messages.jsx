import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../../../../redux/reducers/dialogs'
import { getDialogsMessagesSelector, getSelectedDialogSelector } from '../../../../../redux/selectors/dialogs'
import useInfiniteScroll from '../../../../../hooks/useInfiniteScroll'
import SelectChatPreview from './SelectChatPreview/SelectChatPreview'
import MessageItem from './MessageItem/MessageItem'
import s from './Messages.module.css'

function Messages() {
  const dispatch = useDispatch()

  const messages = useSelector(getDialogsMessagesSelector)
  const selectedChatId = useSelector(getSelectedDialogSelector)

  const { loadMoreRef, page, resetPage } = useInfiniteScroll()

  const messagesListEl = useRef(null)

  console.log(`test selectedChatId mess - ${selectedChatId}`)
  console.log(`test page mess - ${page}`)

  // вынести page в редакс
  useEffect(() => {
    if (selectedChatId) {
      console.log(`selectedChatId - ${selectedChatId}`)
      dispatch(fetchMessages({
        chatId: selectedChatId,
        page,
        limit: 30,
      }))
    }
    console.log(`page - ${page}`)
  }, [dispatch, selectedChatId, page])

  useEffect(() => {
    if (messagesListEl) {
      messagesListEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight }) // , behavior: 'smooth'
      })
    }
  }, [])

  return (
    <div className={s.messagesList} ref={messagesListEl}>
      <div className={s.messages}>
        {
          !!selectedChatId && messages.map((el) => <MessageItem key={el.id} userId={el.senderId} message={el.text} />)
        }
        {
          // !!selectedChatId && <div ref={loadMoreRef}>Loading... {page}</div>
          !!selectedChatId && messages.length && (
            <div id="test_test_test">
              Loading...
              {page}
            </div>
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

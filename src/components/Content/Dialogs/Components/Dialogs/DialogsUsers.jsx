import React from 'react'
import { getDialogsUsersSelector, getFriendsWithoutChat } from '../../../../../redux/selectors/dialogs'
import { useAppSelector } from '../../../../../hooks/redux.ts'
import FriendsList from './FriendsList/FriendsList'
import ChatsList from './ChatsList/ChatsList'
import NoChatsPreview from './NoChatsPreview/NoChatsPreview'
import NoFriendsPreview from './NoFriendsPreview/NoFriendsPreview'
// @ts-ignore

function DialogsUsers() {
  const dialogs = useAppSelector(getDialogsUsersSelector)
  const friends = useAppSelector(getFriendsWithoutChat)

  return (
    <div>
      {
        dialogs && dialogs.length > 0 ? <ChatsList dialogs={dialogs} /> : <NoChatsPreview />
      }
      {
        friends && friends.length > 0 ? <FriendsList friends={friends} /> : <NoFriendsPreview />
      }
    </div>
  )
}

export default DialogsUsers

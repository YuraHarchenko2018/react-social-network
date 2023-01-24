import React from 'react'
import { useSelector } from 'react-redux';
import { getDialogsUsersSelector, getFriendsWithoutChat } from '../../../../../redux/selectors/dialogs'
import FriendsList from './FriendsList/FriendsList'
import ChatsList from './ChatsList/ChatsList'
import NoChatsPreview from './NoChatsPreview/NoChatsPreview'
import NoFriendsPreview from './NoFriendsPreview/NoFriendsPreview'
// @ts-ignore

function DialogsUsers() {
  const dialogs = useSelector(getDialogsUsersSelector)
  const friends = useSelector(getFriendsWithoutChat)

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

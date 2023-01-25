import React from 'react'
import { useDispatch } from 'react-redux';
import { List } from '@mui/material'
import { createChat } from '../../../../../../redux/reducers/dialogs'
import DialogUserItem from '../DialogUserItem/DialogUserItem'
import s from './FriendsList.module.css'

function FriendsList({ friends }) {
  const dispatch = useDispatch()

  const handleFriendClick = (friendId) => () => {
    dispatch(createChat(friendId))
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <i style={{ fontSize: '10px' }}>Friends without chat</i>
      </div>
      <div className={s.friendsList}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
          {
            friends && friends.map((friend) => (
              <DialogUserItem
                key={friend.id}
                avatarImg={friend.avatarImg}
                userName={friend.name}
                isSelected={false}
                handleClick={handleFriendClick(friend.id)}
                newMessagesAmount={0}
              />
            ))
          }
        </List>
      </div>
    </>
  )
}

export default FriendsList

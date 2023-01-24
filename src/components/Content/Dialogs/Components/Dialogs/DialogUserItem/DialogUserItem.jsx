import React from 'react'
import {
  Avatar, Badge, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { serverLink } from '../../../../../../constants/common'

function DialogUserItem({
  handleClick, avatarImg, userName, isSelected, newMessagesAmount,
}) {
  const avatar = serverLink + avatarImg
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick} selected={isSelected}>
        <ListItemIcon>
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemIcon>
        <ListItemText primary={userName} />
        {
                    newMessagesAmount > 0 && <Badge badgeContent={newMessagesAmount} color="primary" />
                }
      </ListItemButton>
    </ListItem>
  )
}

export default DialogUserItem

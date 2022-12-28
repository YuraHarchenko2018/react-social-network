import React from "react";
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { serverLink } from "constants/common";

const DialogUserItem = ({ handleClick, avatarImg, userName, isSelected }) => {
    const avatar = serverLink + avatarImg
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={handleClick} selected={isSelected}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={avatar} />
                </ListItemIcon>
                <ListItemText primary={userName} />
            </ListItemButton>
        </ListItem>
    )
}

export default DialogUserItem

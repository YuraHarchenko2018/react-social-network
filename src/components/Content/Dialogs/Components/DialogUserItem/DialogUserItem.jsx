import React from "react";
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import userAvatar from "../../../../../assets/default-avatar.webp"

const DialogUserItem = ({ userName }) => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={userAvatar} />
                </ListItemIcon>
                <ListItemText primary={userName} />
            </ListItemButton>
        </ListItem>
    )
}

export default DialogUserItem

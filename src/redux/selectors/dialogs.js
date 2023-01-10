import { createSelector } from "reselect"
import { getFriendsSelector } from "./users"


export const getDialogsUsersSelector = (state) => {
    return state.dialogs.dialogs
}

export const getDialogsMessagesSelector = (state) => {
    return state.dialogs.messages
}

export const getSelectedDialogSelector = (state) => {
    return state.dialogs.selectedDialog
}

export const getFriendsWithoutChat = createSelector(
    [
        getFriendsSelector,
        getDialogsUsersSelector
    ],
    (friends, chats) => {
        const filterFriends = friends?.filter((item) => {
            return !chats.some(chat => item.id === chat.id)
        })
        return filterFriends
    }
)

export const getUnreadedMessagesSelector = (state) => {
    return state.dialogs.unreadedMessages
}

export const getUnreadedAmountForChatSelector = (unreaded, chatId) => {
    return unreaded[chatId] ?? 0
}

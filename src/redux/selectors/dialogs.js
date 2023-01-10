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
    (friends, friendWithChat) => {
        const noChatFriends = friends?.filter((friend) => {
            return !friendWithChat.some(chatFriend => friend.id === chatFriend.id)
        })
        return noChatFriends
    }
)

export const getUnreadedMessagesSelector = (state) => {
    return state.dialogs.unreadedMessages
}

export const getUnreadedAmountForChatSelector = (unreaded, chatId) => {
    return unreaded[chatId] ?? 0
}

import { createSelector } from 'reselect'
import { getFriendsSelector } from './users'

export const getDialogsUsersSelector = (state) => state.dialogs.dialogs
export const getDialogsMessagesSelector = (state) => state.dialogs.messages
export const getSelectedDialogSelector = (state) => state.dialogs.selectedDialog
export const getUnreadMessagesSelector = (state) => state.dialogs.unreadMessages
export const getUnreadAmountForChatSelector = (unread, chatId) => unread[chatId] ?? 0

export const getFriendsWithoutChat = createSelector(
  [
    getFriendsSelector,
    getDialogsUsersSelector,
  ],
  (friends, friendWithChat) => {
    const filterFunc = (friend) => !friendWithChat.some((chatFriend) => friend.id === chatFriend.id)
    const noChatFriends = friends?.filter(filterFunc)
    return noChatFriends
  },
)

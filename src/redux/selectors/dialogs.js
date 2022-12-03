

export const getDialogsUsersSelector = (state) => {
    return state.dialogs.dialogs
}

export const getDialogsMessagesSelector = (state) => {
    return state.dialogs.messages
}

export const getSelectedDialogSelector = (state) => {
    return state.dialogs.selectedDialog
}
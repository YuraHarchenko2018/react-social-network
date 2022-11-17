

export const getIsFetchingLoginStatus = (state) => {
    return state.login.isFetching
}

export const getIsOccurErrorLoginStatus = (state) => {
    return state.login.isOccurError
}
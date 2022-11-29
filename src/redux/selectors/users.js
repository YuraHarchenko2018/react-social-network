

export const getUsersSelector = (state) => {
    return state.users.users
}

export const getFriendsSelector = (state) => {
    return state.users.friends
}

export const getFollowingInProcessSelector = (state) => {
    return state.users.followingInProcess
}

export const getUsersPerPageSelector = (state) => {
    return state.users.usersPerPage
}

export const getFriendsPerPageSelector = (state) => {
    return state.users.friendsPerPage
}

export const getTotalUsersCountSelector = (state) => {
    return state.users.totalUsersCount
}

export const getTotalFriendsCountSelector = (state) => {
    return state.users.totalFriendsCount
}

export const getUsersPagesCountSelector = (state) => {
    let totalUsersCount = getTotalUsersCountSelector(state)
    let perPage = getUsersPerPageSelector(state)
    return getPagesCount(totalUsersCount, perPage)
}

export const getFriendsPagesCountSelector = (state) => {
    let totalFriendsCount = getTotalFriendsCountSelector(state)
    let perPage = getFriendsPerPageSelector(state)
    return getPagesCount(totalFriendsCount, perPage)
}

const getPagesCount = (totalItemsCount, perPage) => {
    let pagesCount = Math.ceil(totalItemsCount / perPage)
    return pagesCount
}

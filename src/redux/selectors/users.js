

export const getUsersSelector = (state) => {
    return state.users.users
}

export const getFollowingInProcessSelector = (state) => {
    return state.users.followingInProcess
}

export const getSelectedPageSelector = (state) => {
    return state.users.selectedPage
}

export const getPerPageSelector = (state) => {
    return state.users.perPage
}

export const getTotalUsersCountSelector = (state) => {
    return state.users.totalUsersCount
}

export const getPagesCountSelector = (state) => {
    let totalUsersCount = getTotalUsersCountSelector(state)
    let perPage = getPerPageSelector(state)

    let pagesCount = Math.ceil(totalUsersCount / perPage)
    return pagesCount
}

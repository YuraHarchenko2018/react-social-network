

export const getUserInfoSelector = state => {
    return state.profile.userInfo
}

export const getUserInfoStatusSelector = state => {
    return state.profile.userInfoStatus
}

export const getUserPostsSelector = state => {
    return state.profile.posts
}

export const getUserPostsStatusSelector = state => {
    return state.profile.userPostsStatus
}

export const getProfileUserIdSelector = state => {
    return state.profile.profileUserId
}

export const getIsModifyableUserSelector = state => {
    return state.auth.authUserId === state.profile.profileUserId
}

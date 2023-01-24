export const getUserInfoSelector = (state) => state.profile.userInfo
export const getUserInfoStatusSelector = (state) => state.profile.userInfoStatus
export const getUserPostsSelector = (state) => state.profile.posts
export const getUserPostsStatusSelector = (state) => state.profile.userPostsStatus
export const getProfileUserIdSelector = (state) => state.profile.profileUserId
export const getIsModifiableUserSelector = (state) => {
  const isModifiable = state.auth.authUserId === state.profile.profileUserId
  return isModifiable
}

export const getUsersSelector = (state) => state.users.users
export const getFriendsSelector = (state) => state.users.friends
export const getFollowingInProcessSelector = (state) => state.users.followingInProcess
export const getUsersPerPageSelector = (state) => state.users.usersPerPage
export const getFriendsPerPageSelector = (state) => state.users.friendsPerPage
export const getTotalUsersCountSelector = (state) => state.users.totalUsersCount
export const getTotalFriendsCountSelector = (state) => state.users.totalFriendsCount
export const getIsSearchSelector = (state) => state.users.isSearch

const getPagesCount = (totalItemsCount, perPage) => {
  const pagesCount = Math.ceil(totalItemsCount / perPage)
  return pagesCount
}

export const getUsersPagesCountSelector = (state) => {
  const totalUsersCount = getTotalUsersCountSelector(state)
  const perPage = getUsersPerPageSelector(state)
  return getPagesCount(totalUsersCount, perPage)
}

export const getFriendsPagesCountSelector = (state) => {
  const totalFriendsCount = getTotalFriendsCountSelector(state)
  const perPage = getFriendsPerPageSelector(state)
  return getPagesCount(totalFriendsCount, perPage)
}

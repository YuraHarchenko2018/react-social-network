

export const getNewsSelector = (state) => {
    return state.news.posts
}

export const getSelectedPageSelector = (state) => {
    return state.news.selectedPage
}

export const getPerPageSelector = (state) => {
    return state.news.newsPerPage
}

export const getTotalPostsCountSelector = (state) => {
    return state.news.totalNewsAmount
}

export const getPagesCountSelector = (state) => {
    let totalUsersCount = getTotalPostsCountSelector(state)
    let perPage = getPerPageSelector(state)

    let pagesCount = Math.ceil(totalUsersCount / perPage)
    return pagesCount
}

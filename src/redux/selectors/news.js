import { createSelector } from "reselect"

export const getNewsSelector = state => state.news.posts
export const getPerPageSelector = state => state.news.newsPerPage
export const getTotalPostsCountSelector = state => state.news.totalNewsAmount
export const getNewsIsLoadingSelector = state => state.news.isLoading

export const getPagesCountSelector = createSelector(
    [
        getTotalPostsCountSelector,
        getPerPageSelector
    ],
    (totalUsersCount, perPage) => {
        let pagesCount = Math.ceil(totalUsersCount / perPage)
        return pagesCount
    }
)

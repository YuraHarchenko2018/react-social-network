import { connect } from "react-redux"
import { follow, unfollow } from "redux/reducers/users"
import { getAuthUserIdSelector } from "redux/selectors/auth"
import { getFollowingInProcessSelector, getUsersSelector } from "redux/selectors/users"
import UsersList from "./UsersList"

export default connect(state => ({
    users: getUsersSelector(state),
    followingInProcess: getFollowingInProcessSelector(state),
    authUserId: getAuthUserIdSelector(state)
}), { follow, unfollow })(UsersList)
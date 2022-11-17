import { connect } from "react-redux"
import { logout } from "redux/reducers/auth"
import { getAuthUserProfileImgLinkSelector, getIsLoginInSelector } from "redux/selectors/auth"
import Header from "./Header"

const mapStateToProps = (state) => ({
    isLoginIn: getIsLoginInSelector(state), 
    authUserProfileImgLink: getAuthUserProfileImgLinkSelector(state),
})

export default connect(mapStateToProps, { logout })(Header)
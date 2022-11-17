import Dialogs from "./Dialogs"
import { connect } from "react-redux"
import { addMessageCreator } from "redux/reducers/dialogs"
import { getIsLoginInSelector } from "redux/selectors/auth"
import { getDialogsMessagesSelector, getDialogsUsersSelector } from "redux/selectors/dialogs"

const DialogsContainer = connect(state => ({
    dialogs: getDialogsUsersSelector(state),
    messages: getDialogsMessagesSelector(state),
    isLoginIn: getIsLoginInSelector(state)
}), { addMessageCreator })(Dialogs)
export default DialogsContainer
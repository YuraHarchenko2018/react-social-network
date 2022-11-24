import Dialogs from "./Dialogs"
import { connect } from "react-redux"
import { addMessage } from "redux/reducers/dialogs"
import { getDialogsMessagesSelector, getDialogsUsersSelector } from "redux/selectors/dialogs"

const DialogsContainer = connect(state => ({
    dialogs: getDialogsUsersSelector(state),
    messages: getDialogsMessagesSelector(state),
}), { addMessage })(Dialogs)
export default DialogsContainer
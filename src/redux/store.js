import dialogsReducer from "./reducers/dialogs"
import profileReducer from "./reducers/profile"

const store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, text: "Hi" },
        { id: 2, text: "I'm ok =)" },
        { id: 3, text: "What do you think?" },
        { id: 4, text: "Ok!" }
      ],
      postInputValue: ''
    },
    
    dialogsPage: {
      dialogs: [
        { id: 1, userName: "Yura" },
        { id: 2, userName: "Vova" },
        { id: 3, userName: "Vlad" },
        { id: 4, userName: "Vika" },
        { id: 5, userName: "Tanya" },
      ],
    
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "What do you think?" },
        { id: 4, message: "Ok?" },
      ],

      messageInputValue: ""
    }
  },
  getState() {
    return this._state
  },
  
  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

    this.subscriber(this)

  },

  subscriber(store) {
    console.log('No one observer set')
  },
  subscribe(observer) {
    this.subscriber = observer
  }
}

export default store
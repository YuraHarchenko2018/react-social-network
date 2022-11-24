import { createSlice } from "@reduxjs/toolkit"

const popUpSlice = createSlice({
  name: 'popUp',
  initialState: {
    content: 'default',
    isShow: false,
    /**
     * @property {any} payload
     */
    payload: null
  },
  reducers: {
    setContent(state, action) {
      state.content = action.payload.content
    },
    setIsShow(state, action) {
      state.isShow = action.payload.isShow
    },
    setPayload(state, action) {
      state.payload = action.payload
    }
  }
});

export const {
  setContent,
  setIsShow,
  setPayload
} = popUpSlice.actions;

export default popUpSlice.reducer
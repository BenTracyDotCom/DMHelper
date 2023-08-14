import { createSlice } from "@reduxjs/toolkit";

const prefsSlice = createSlice({
  name: 'prefs',
  initialState: {
    shown: false,
  },
  reducers: {
    showPrefs: state => {
      state.shown = !state.shown
    }
  }

})
export const { showPrefs } = prefsSlice.actions
export default prefsSlice.reducer
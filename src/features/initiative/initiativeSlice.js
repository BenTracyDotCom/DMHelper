import { createSlice } from "@reduxjs/toolkit";

const initiativeSlice = createSlice({
  name: 'initiative', 
  initialState: {
    groupMode: 0,
    tiebreak: false
  },
  reducers: {
    cycleGroupMode: state => {
      const newIndex = state.groupMode + 1
      state.groupMode = newIndex % 3
    },
    toggleTiebreak: state => {
      state.tiebreak = !state.tiebreak
    }
  }
})

export const { cycleGroupMode, toggleTiebreak } = initiativeSlice.actions
export default initiativeSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initiativeSlice = createSlice({
  name: 'initiative', 
  initialState: {
    groupMode: 0,
  },
  reducers: {
    cycleGroupMode: state => {
      const newIndex = state.groupMode + 1
      state.groupMode = newIndex % 3
    }
  }
})

export const { cycleGroupMode } = initiativeSlice.actions
export default initiativeSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initiativeSlice = createSlice({
  name: 'initiative', 
  initialState: {
    groupMode: 1,
  },
  reducers: {
    cycleGroupMode: state => state.groupMode = (state.groupMode + 1) % 3
  }
})

export const { cycleGroupMode } = initiativeSlice.actions
export default initiativeSlice.reducer
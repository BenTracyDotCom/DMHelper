import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes: (state, action) => {
      state = action.payload
    }
  }
})

export const { setNotes } = notesSlice.actions
export default notesSlice.reducer
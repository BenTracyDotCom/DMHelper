import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: { current: ['notes in da notes sliceee'] },
  reducers: {
    setNotes: (state, action) => {
      state.current = action.payload
    }
  }
})

export const { setNotes } = notesSlice.actions
export default notesSlice.reducer
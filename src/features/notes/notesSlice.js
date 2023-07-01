import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: { 
    current: ['notes in da notes sliceee'],
    showAddNoteModal: false 
  },
  reducers: {
    setNotes: (state, action) => {
      state.current = action.payload
    },
    toggleNoteModal: state => {
      state.showAddNoteModal = !state.showAddNoteModal
    }
  }
})

export const { setNotes, toggleNoteModal } = notesSlice.actions
export default notesSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: { 
    current: [],
    showAddNoteModal: false,
    lastNote: '' 
  },
  reducers: {
    setNotes: (state, action) => {
      state.current = action.payload
    },
    toggleNoteModal: state => {
      state.showAddNoteModal = !state.showAddNoteModal
    },
    setStale: (state, action) => {
      state.lastNote = action.payload
    }
  }
})

export const { setNotes, toggleNoteModal, setStale } = notesSlice.actions
export default notesSlice.reducer
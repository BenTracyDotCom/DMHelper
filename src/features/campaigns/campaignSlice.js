import { createSlice } from '@reduxjs/toolkit';
//sample for testing
import sampleCampaign from '../../../utilities/sampleData/sampleCampaign';

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: sampleCampaign,
  reducers: {
    currentQuestUpdated: (state, action) => {
      state.currentQuest = action.payload
    },
    addNote: (state, action) => {
      newNotes = state.notes
      newNotes.push(action.payload)
      state.notes = newNotes
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => (note !== action.payload))
    },
    /*requires payload to include:
    { old: noteToUpdate, new: noteToReplaceItWith }
    */
    editNote: (state, action) => {
      const index = state.notes.findIndex((note) => note === action.payload.old)
      if (action.payload.new) {
        state.notes.splice(index, 1, action.payload.new)
      } else {
        state.notes.splice(index, 1)
      }
    },
    /*requires payload to include:
    { name: string, note: string }
    */
    addCharNote: (state, action) => {
      const charIndex = state.characters.findIndex((char) => char.name === action.payload.name)
      const charToUpdate = state.characters[charIndex]
      charToUpdate.notes.push(action.payload.note)
      const chars = state.characters
      chars.splice(charIndex, 1, charToUpdate)
      state.characters = chars
    },
    /*requires payload to include:
    { name: string, old: noteToUpdate, new: noteToReplaceItWith }
    */
    editCharNote: (state, action) => {
      const charIndex = state.characters.findIndex((char) => char.name === action.payload.name)
      const charToUpdate = state.characters[charIndex]
      const noteIndex = charToUpdate.notes.findIndex((note) => note === action.payload.old)
      if(action.payload.new){
        charToUpdate.notes.splice(noteIndex, 1, action.payload.new)
      } else {
        charToUpdate.notes.splice(noteIndex, 1)
      }
      const chars = state.characters
      chars.splice(charIndex, 1, charToUpdate)
      state.characters = chars
    },
    setActive: (state, action) => {
      state.active = action.payload
    }
  }
})

export const { currentQuestUpdated, addNote, deleteNote, editNote, addCharNote, editCharNote, setActive } = campaignSlice.actions
export default campaignSlice.reducer
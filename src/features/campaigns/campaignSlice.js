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
      state.notes.splice(index, 1, action.payload.new)
    },
    setActive: (state, action) => {
      state.active = action.payload
    }
  }
})

export const { currentQuestUpdated, addNote, deleteNote, editNote, setActive } = campaignSlice.actions
export default campaignSlice.reducer
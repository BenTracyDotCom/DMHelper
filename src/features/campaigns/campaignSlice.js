import { createSlice } from '@reduxjs/toolkit';
//sample for testing
import sampleCampaign from '../../../utilities/sampleData/sampleCampaign';

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    ...sampleCampaign,
    npcs: [],
  },
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
    setActiveNotes: (state, action) => {
      state.activeNotes = action.payload
    },
    setCurrentCampaign: (state, action) => {
      Object.keys(state).forEach(key => [
        state[key] = action.payload[key]
      ])
    },
    addNPC: (state, action) => {
      state.npcs.push(action.payload)
    },
    editNPC: (state, action) => {
      const index = state.npcs.findIndex((npc) => npc.id === action.payload.id);
      if (index !== -1) {
        state.npcs[index] = action.payload;
      }
    },
    deleteNPC: (state, action) => {
      state.npcs = state.npcs.filter(npc => npc.id !== action.payload.id);
    }
  }
})

export const { currentQuestUpdated, addNote, deleteNote, editNote, addCharNote, editCharNote, setActiveNotes, setCurrentCampaign, addNPC, editNPC, deleteNPC } = campaignSlice.actions

export default campaignSlice.reducer
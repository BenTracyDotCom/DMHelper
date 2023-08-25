import { createSlice } from '@reduxjs/toolkit';
import { tallyXp } from '../../api';

import sampleEncounter from '../../../utilities/sampleData/sampleEncounter';

const encounterSlice = createSlice({
    name: 'encounter',
    initialState: {
      ...sampleEncounter,
      location: 'Phandalin',
      notes: ['Lets kill some Red Brands']
    },
    reducers: {
      setEncounter: (state, action) => {
        Object.keys(action.payload).forEach(key =>
          (state[key] = action.payload[key])
        )
      },
      nextChar: state => {
        state.active = (state.active + 1) % state.chars.length
      },
      setTargeted: (state, action) => {
        //TODO
      },
      setInitiative: (state, action) => {
        const index = state.chars.findIndex(char => char.name === action.payload.name)
        state.chars[index].initiative = action.payload.initiative
      },
      sortByInitiative: (state) => {
        state.chars = state.chars.sort((a, b) => ( a.initiative - b.initiative ))
      },
      //the following actions require a "target" integer corresponding to an index in the encounter's "chars" array
      statusAdded: (state, action) => {
        let target = state.chars[target];
        target.status = [...target.status, action.status]
      },
      statusRemoved: (state, action) => {
        let target = state.chars[action.target];
        target.status = target.status.filter(status => (status !== action.status))
      },
      hpAdded: (state, action) => {
        let target = state.chars[action.target];
        target.hp += action.hp
      },
      hpRemoved: (state, action) => {
        let target = state.chars[action.target];
        target.hp -= action.hp
      },
      targetDestroyed: async (state, action) => {
        let target = state.chars[action.target];
        state.chars = state.chars.filter(char => (char !== target))
        state.xpEarned += await tallyXp(target.name)
      },
      setLocation: (state, action) => {
        state.location = action.payload
      },
      addNote: (state, action) => {
        state.notes.push(action.payload)
      },
      deleteNote: (state, action) => {
        state.notes = state.notes.filter(note => note !== action.payload);
      },
      editNote: (state, action) => {
        const {index, newNote} = action.payload;
        state.notes[index] = newNote
            }
    }
})

export const { setEncounter, nextChar, statusAdded, statusRemoved, hpAdded, hpRemoved, targetDestroye, setLocation, addNote, deleteNote, editNote, setInitiative, sortByInitiative } = encounterSlice.actions
export default encounterSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import { tallyXp } from '../../api';

import sampleEncounter from '../../../utilities/sampleData/sampleEncounter';

const encounterSlice = createSlice({
    name: 'encounter',
    initialState: sampleEncounter,
    reducers: {
      nextChar: state => {
        state.active = (state.active + 1) % state.chars.length
      },
      setTargeted: (state, action) => {
        
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
      }
    }
})

export const { nextChar, statusAdded, statusRemoved, hpAdded, hpRemoved, targetDestroyed } = encounterSlice.actions
export default encounterSlice.reducer
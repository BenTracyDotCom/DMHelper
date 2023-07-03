import { createSlice } from '@reduxjs/toolkit';
import sampleEncounter from '../../../utilities/sampleData/sampleEncounter';


const encountersSlice = createSlice({
  name: 'encounters',
  initialState: {
    showEncounterModal: false,
    //This will be an empty array once we can add encounters
    encounters: [ sampleEncounter ]
  },
  reducers: {
    toggleEncountersModal: state => {
      state.showEncounterModal = !state.showEncounterModal
    },

  }
})

export const { toggleEncountersModal } = encountersSlice.actions

export default encountersSlice.reducer
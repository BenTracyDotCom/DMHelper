import { createSlice } from "@reduxjs/toolkit";
import sampleEncounter from "../../../utilities/sampleData/sampleEncounter";

const encountersSlice = createSlice({
  name: "encounters",
  initialState: {
    showEncounterModal: false,
    //This will be an empty array once we can add encounters
    encounters: [sampleEncounter],
  },
  reducers: {
    toggleEncountersMenu: (state) => {
      state.showEncounterModal = !state.showEncounterModal;
    },
    addEncounter: (state, action) => {
      state.encounters.push(action.payload);
    },
    deleteEncounter: (state, action) => {
      state.encounters = state.encounters.filter(
        (encounter) => encounter !== action.payload,
      );
    },
  },
});

export const { toggleEncountersMenu, addEncounter } = encountersSlice.actions;

export default encountersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const encounterBuilderSlice = createSlice({
  name: "encounterBuilder",
  initialState: {
    selectedMonsters: {},
  },
  reducers: {
    selectMonster: (state, action) => {
      const { url, name } = action.payload;
      if (!state.selectedMonsters[name]) {
        state.selectedMonsters[name] = { count: 1, url: url };
      } else {
        state.selectedMonsters[name].count += 1;
      }
    },
    clearMonsters: (state) => {
      state.selectedMonsters = {};
    },
  },
});

export const { selectMonster, clearMonsters } = encounterBuilderSlice.actions;

export default encounterBuilderSlice.reducer;

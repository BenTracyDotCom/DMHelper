import { createSlice } from '@reduxjs/toolkit';

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    //TODO: Change to empty when campaign screen is only accessible through populating these values
    title: "Sample Campaign",
    quests: {
      "escort the cart": []
    },
    currentQuest: "Escort the Cart"
  },
  reducers: {
    currentQuestUpdated: (state, action) => {
      state.currentQuest = action.payload
    }
  }
})

export const {} = campaignSlice.actions
export default campaignSlice.reducer
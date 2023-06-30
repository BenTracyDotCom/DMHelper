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
    notesUpdated: (state, action) => {
      //TODO
    },
    setActive: (state, action) => {
      state.active = action.payload
    }
  }
})

export const { currentQuestUpdated, notesUpdated, setActive } = campaignSlice.actions
export default campaignSlice.reducer
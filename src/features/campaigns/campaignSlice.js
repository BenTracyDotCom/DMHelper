import { createSlice } from '@reduxjs/toolkit';
//sample for testing
import sampleCampaign from '../../../utilities/sampleData/sampleCampaign';

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: sampleCampaign,
  reducers: {
    currentQuestUpdated: (state, action) => {
      state.currentQuest = action.payload
    }
  }
})

export const {} = campaignSlice.actions
export default campaignSlice.reducer
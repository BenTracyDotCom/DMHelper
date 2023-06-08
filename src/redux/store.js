import CountReducer from './reducers/countReducer';
import { configureStore } from '@reduxjs/toolkit';
import campaignsReducer from './features/campaigns/campaignsSlice';
import newCampaignReducer from './features/campaigns/newCampaignSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    count: CountReducer,
    newCampaign: newCampaignReducer,
  }
});
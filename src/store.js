import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import campaignsReducer from './features/campaigns/campaignsSlice';
import newCampaignReducer from './features/campaigns/newCampaignSlice';
import encounterReducer from './features/encounter/encounterSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    counter: counterReducer,
    newCampaign: newCampaignReducer,
    encounter: encounterReducer
  }
});
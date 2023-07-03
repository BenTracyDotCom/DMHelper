import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import campaignsReducer from './features/campaigns/campaignsSlice';
import campaignReducer from './features/campaigns/campaignSlice';
import newCampaignReducer from './features/campaigns/newCampaignSlice';
import encounterReducer from './features/encounter/encounterSlice';
import notesReducer from './features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    campaign: campaignReducer,
    counter: counterReducer,
    newCampaign: newCampaignReducer,
    encounter: encounterReducer,
    notes: notesReducer,
  }
});
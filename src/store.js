import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import campaignsReducer from './features/campaigns/campaignsSlice';
import campaignReducer from './features/campaigns/campaignSlice';
import newCampaignReducer from './features/NewCampaign/newCampaignSlice';
import encounterReducer from './features/encounter/encounterSlice';
import encountersReducer from './features/encounter/encountersSlice';
import notesReducer from './features/notes/notesSlice';
import encounterBuilderReducer from './features/encounter/encounterBuilderSlice'

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    campaign: campaignReducer,
    counter: counterReducer,
    newCampaign: newCampaignReducer,
    encounter: encounterReducer,
    encounters: encountersReducer,
    notes: notesReducer,
    encounterBuilder: encounterBuilderReducer,
  }
});
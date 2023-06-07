import CountReducer from './reducers/countReducer';
import { configureStore } from '@reduxjs/toolkit';
import campaignsReducer from './features/campaigns/campaignsSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    count: CountReducer,
  }
});
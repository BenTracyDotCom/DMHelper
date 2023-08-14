import { createSlice } from '@reduxjs/toolkit';

const dierollSlice = createSlice({
  name: 'dieroll',
  initialState: {
    //this should be pulled from preferences
    twentyMode: 'delay',
    nonTwentyMode: 'delay',
    delay: 3000,
    non20s: null,
    twunnies: null
  },
  resucers: {

  }
})

export const{ } = dierollSlice.actions
export default dierollSlice.reducer
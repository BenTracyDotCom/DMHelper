import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  twentyMode: 'delay',
  nonTwentyMode: 'delay',
  delay: 3000,
  non20s: null,
  twunnies: null
}

export const getDiePrefs = createAsyncThunk('dieroll/getPrefs', async () => {
  const storedPrefs = await AsyncStorage.getItem('dierollPrefs');
  if (storedPrefs) {
    return {
      ...(JSON.parse(storedPrefs)),
      non20s: null,
      twunnies: null
    }
  } else {
    return defaultState
  }
}
)

export const saveDiePrefs = createAsyncThunk('dieroll/savePrefs', async newPrefs => {
  const response = await AsyncStorage.setItem('dierollPrefs', JSON.stringify(newPrefs))
  return response;
})

const dierollSlice = createSlice({
  name: 'dieroll',
  initialState: defaultState,

  reducers: {
    //TODO: add function to reset defaults
    toggle20Mode: state => {
      state.twentyMode === 'delay' ? state.twentyMode = 'toggle' : state.twentyMode = 'delay'
    },
    toggleNon20Mode: state => {
      state.nonTwentyMode === 'delay' ? state.nonTwentyMode = 'toggle' : state.nonTwentyMode = 'delay'
    },
    setDelay: (state, action) => {
      state.delay = action.payload
    },
    setLastNon20: (state, action) => {
      state.non20s = action.payload
    },
    setLast20: (state, action) => {
      state.twunnies = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getDiePrefs.pending, (state) => {
      state.status = 'loading'
      })
      .addCase(getDiePrefs.fulfilled, (state, action) => {
        const returned = JSON.parse(action.payload)
        if(returned){
          const newPrefs = {
            ...returned,
            non20s: null,
            twunnies: null
          }
          Object.keys(newPrefs).forEach(pref => {
            state[pref] = newPrefs[pref]
          })
          state.status = 'idle'
        }
      })
  }
})

export const { toggle20Mode, toggleNon20Mode, setDelay, setLast20, setLastNon20 } = dierollSlice.actions;
export default dierollSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDiePrefs } from "../dieroll/dierollSlice";

// When we interact with local storage, all we're interested in is the array stored at 'campaigns'; i.e. 'AsyncStorage.getItem('maps')' will return a 'campaigns' array
const defaultState = {
  showModal: false,
  campaigns: [
    {
      title: null,
      maps: [],
    },
  ],
};

export const getMaps = createAsyncThunk("maps/getMaps", async () => {
  const storedMaps = await AsyncStorage.getItem("maps");
  if (storedMaps) {
    return JSON.parse(storedMaps);
  } else {
    return defaultState;
  }
});
export const saveMaps = createAsyncThunk("maps/saveMaps", async (newMaps) => {
  /* newMaps Must have the following structure:
    title: String(campaign title)
    maps: [ Map objects from image picker ]
  */
  const storedMaps = await AsyncStorage.getItem("maps");
  if (storedMaps) {
    const toStore = JSON.parse(storedMaps);
    const toChange = toStore.findIndex(
      (campaign) => campaign.title === newMaps.title,
    );
    if (toChange > -1) {
      toStore[toChange] = newMaps;
    } else {
      toStore.push(newMaps);
    }
    AsyncStorage.setItem("maps", JSON.stringify(toStore));
  }
});

const mapsSlice = createSlice({
  name: "maps",
  initialState: defaultState,
  reducers: {
    toggleMapModal: (state) => {
      state.showModal ? (state.showModal = false) : (state.showModal = true);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaps.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMaps.fulfilled, (state, action) => {
        const returned = JSON.parse(action.payload);
        if (returned) {
          state.maps = returned;
        }
      });
  },
});

export const { toggleMapModal } = mapsSlice.actions;
export default mapsSlice.reducer;

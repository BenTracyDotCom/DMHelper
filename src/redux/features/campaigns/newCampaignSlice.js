import { createSlice } from '@reduxjs/toolkit';
//Only used to get the most recent campaign id
import store from '../../store'

const newCampaignSlice = createSlice({
  name: newCampaignModal,
  initialState: {
    shown: false,
    campaign: {
      //This is inelegant and will pull from Realm data later
      id: store.getState().campaignsReducer.campaigns[-1].id + 1,
      title: "",
      characters: [],
      quests: [],
      currentQuest: "Get started",
    }
  },
  reducers: {
    modalToggled(state) {
      state.shown = !state.shown
    },
    titleAdded(state, action) {
      state.campaign = {...state.campaign, title: action.payload.title}
    },
    //The following require a "character" on the payload
    characterAdded(state, action) {
      state.campaign.characters.push(action.payload.character)
    },
    characterRemoved(state, action) {
      state.campaign.characters = 
      state.campaign.characters.filter(char => (char !== action.payload.character))
    },
    //The following require a "quest" on the payload
    mainQuestAdded(state, action) {
      state.campaign.quests.push(action.payload.quest)
    },
    mainQuestRemoved(state, action) {
      state.campaign.quests = 
      state.campaign.quests.filter(quest => (quest !== action.payload.quest))
    },
    //This final one requires a "firstQuest" string on the payload
    firstQuestAdded(state, action) {
      state.campaign.currentQuest = action.payload.firstQuest
    }
  }
})
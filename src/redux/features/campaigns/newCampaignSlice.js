import { createSlice } from '@reduxjs/toolkit';


const newCampaignSlice = createSlice({
  name: 'newCampaignModal',
  initialState: {
    shown: false,
    campaign: {
      //This is inelegant and will pull from Realm data later
      id: Math.floor(Math.random()*1000),
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
      state.campaign.characters = state.campaign.characters.filter(char => (char !== action.payload.character))
    },
    //The following require a "quest" on the payload
    mainQuestAdded(state, action) {
      state.campaign.quests.push(action.payload.quest)
    },
    mainQuestRemoved(state, action) {
      state.campaign.quests = state.campaign.quests.filter(quest => (quest !== action.payload.quest))
    },
    //This final one requires a "firstQuest" string on the payload
    firstQuestAdded(state, action) {
      state.campaign.currentQuest = action.payload.firstQuest
    }
  }
})

export const { modalToggled, titleAdded, characterAdded, characterRemoved, mainQuestAdded, mainQuestRemoved, firstQuestAdded } = newCampaignSlice.actions
export default newCampaignSlice.reducer
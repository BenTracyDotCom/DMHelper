import { createSlice } from '@reduxjs/toolkit';


const newCampaignSlice = createSlice({
  name: 'newCampaign',
  initialState: {
    shown: false,
    addCharacter: false,
    campaign: {
      //This is inelegant and will pull from Realm data later
      id: Math.floor(Math.random()*1000),
      title: "",
      characters: [],
      npcs: [],
      quests: [],
      currentQuest: "Get started",
      initialLocation: '',
      maps: [], 
    }
  },
  reducers: {
    modalToggled: (state) => {
      state.shown = !state.shown
    },

    //TODO: toggle a character and/or NPC modal to add either

    titleAdded: (state, action) => {
      state.campaign = {...state.campaign, title: action.payload}
    },
    toggleAddCharacter: (state) => {
      state.addCharacter = !state.addCharacter
    },
    //The following require a "character" on the payload
    characterAdded: (state, action) => {
      state.campaign.characters.push(action.payload)
    },
    characterRemoved: (state, action) => {
      state.campaign.characters = state.campaign.characters.filter(char => (char !== action.payload))
    },
    //The following require a "quest" on the payload
    mainQuestAdded: (state, action) => {
      state.campaign.quests.push(action.payload)
    },
    mainQuestRemoved: (state, action) => {
      state.campaign.quests = state.campaign.quests.filter(quest => (quest !== action.payload))
    },
    //This final one requires a "firstQuest" string on the payload
    firstQuestAdded: (state, action) => {
      state.campaign.currentQuest = action.payload
    }
  }
})

export const { modalToggled, toggleAddCharacter, titleAdded, characterAdded, characterRemoved, mainQuestAdded, mainQuestRemoved, firstQuestAdded } = newCampaignSlice.actions
export default newCampaignSlice.reducer
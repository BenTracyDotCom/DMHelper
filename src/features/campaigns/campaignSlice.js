import { createSlice } from '@reduxjs/toolkit';

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    //TODO: Change to empty when campaign screen is only accessible through populating these values
    title: "Sample Campaign",
    quests: {
      "escort the cart": []
    },
    currentQuest: "Escort the Cart",
    characters: [
      {
        name: 'Snervelin',
        type: 'pc',
        race: 'Gnome',
        class: 'Wizard',
        level: '4'
      },
      {
        name: 'Jealdor',
        type: 'pc',
        race: 'Dragonborn',
        class: 'Barbarian',
        level: '4'
      },
      {
        name: "Boxbix",
        type: 'npc',
        race: 'Dwarf',
        class: 'Cleric',
        level: '4'
      }
    ],
    npcs: [
      {
        name: 'Boxbix',
        race: 'Dwarf',
        class: 'Cleric',
        stats: {
          
        }
      }
    ]
    
  },
  reducers: {
    currentQuestUpdated: (state, action) => {
      state.currentQuest = action.payload
    }
  }
})

export const {} = campaignSlice.actions
export default campaignSlice.reducer
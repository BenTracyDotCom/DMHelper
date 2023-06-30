export default {
  id: 1,
  title: "Default",

  characters: [{
    name: 'Snervelin',
    type: 'pc',
    race: 'Gnome',
    class: "Wizard",
    level: 4,
    status: [],
    notes: []
    },
    {
     name: "Jealdor",
     type: 'pc',
     race: "Dragonborn",
     class: "Barbarian",
     level: 4,
     status: [],
     notes: []
    },
    {
      name: "Benthar",
      type: 'pc',
      race: "V. Human",
      class: "Barbarian",
      level: 4,
      status: [],
      notes: []
    },
    {
      name: "Boxbix",
      type: 'npc',
      race: 'Dwarf',
      class: 'Cleric',
      level: '4',
      status: [],
      notes: []
    }
  ],
  npcs: {
    'Boxbix': {
      name: 'Boxbix',
      race: 'Dwarf',
      class: 'Cleric',
      stats: {
        
      }
    }
  },
  quests: [],
  currentQuest: 'To take over the world!!!',
  notes: ['This is the initial note for the sample campaign. Click to edit someday I guess.']
}
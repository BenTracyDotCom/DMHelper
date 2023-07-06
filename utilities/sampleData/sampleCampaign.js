export default {
  id: 1,
  title: 'Default',

  characters: [{
    name: 'Snervelin',
    type: 'pc',
    race: 'Gnome',
    class: 'Wizard',
    level: 4,
    status: [],
    notes: []
    },
    {
     name: 'Jealdor',
     type: 'pc',
     race: 'Dragonborn',
     class: 'Barbarian',
     level: 4,
     status: [],
     notes: ['Failed CON save vs. were-babboons']
    },
    {
     name: 'Kar\'Kalon',
     type: 'pc',
     race: 'Half-Orc',
     class: 'Cleric',
     level: 4,
     status: [],
     notes: ['Will\'s character']
    },
    {
      name: 'Benthar',
      type: 'pc',
      race: 'V. Human',
      class: 'Barbarian',
      level: 4,
      status: [],
      notes: []
    },
    {
      name: 'Zallirill',
      type: 'pc',
      race: 'Half Elf',
      class: 'Rogue',
      level: 4,
      status: [],
      notes: ['Zack\'s character']
    },
    {
      name: 'Boxbix',
      type: 'npc',
      race: 'Dwarf',
      class: 'Cleric',
      level: '4',
      status: [],
      notes: []
    },
    {
      name: 'Brandalf',
      type: 'npc',
      race: 'High Elf',
      class: 'Wizard',
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
  currentQuest: 'Meet Me in Phandalin',
  currentObjective: 'Escort cart to Phandalin',
  notes: ['Hired by Gundren Rockseeker to escort a wagon of supplies to Phandalin', 'Gundren went ahead with a warrior, Sildar Hallwinter', 'Characters promised 10gp each by the owner of Barthen\'s Provisions in Phandalin on safe delivery'],
  location: 'Neverwinter',
  active: null
}
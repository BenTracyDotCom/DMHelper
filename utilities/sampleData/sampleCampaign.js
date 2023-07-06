export default {
  id: 1,
  title: 'Default',

  characters: [{
    name: 'Benthar',
    type: 'pc',
    race: 'Half-Orc',
    class: 'Barbarian',
    level: 1,
    status: [],
    notes: ['Ben\'s Character']
    },
    {
     name: 'Kar\'Kalon',
     type: 'pc',
     race: 'Half-Orc',
     class: 'Cleric',
     level: 1,
     status: [],
     notes: ['Will\'s character']
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
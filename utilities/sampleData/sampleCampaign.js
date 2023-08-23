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

      },
      location: null
    }
  },
  quests: [
    {
      title: 'Meet Me in Phandalin',
      objectives: ['Escort Cart to Phandalin', 'Run to Phandolin', 'Defeat Redbrands', 'Seduce the barmaid']
    },
    {
      title: 'The Lost Mine of Wave Echo',
      objectives: ['Locate the entrance to the mine', 'Defeat the Black Spider', 'Retrieve the Forge of Spells', 'Return to Gundren with news']
    },
    {
     title: 'Dragon of Icespire Peak',
     objectives: ['Investigate the dragon sightings', 'Protect the town of Phandalin', 'Drive the dragon from the region']
    },
    {
      title: 'The Sunless Citadel',
      objectives: ['Find the missing adventurers', 'Explore the citadel ruins', 'Defeat the evil druid Belak', 'Retrieve the Gulthias Tree fruit']
    },
    {
      title: 'The Forge of Fury',
      objectives: ['Investigate the haunted tower', 'Retrieve the fabled Soulgem', 'Uncover the mystery of the ghostly apparitions']
    }
  ],
  currentQuest: 'Meet Me in Phandalin',
  currentObjective: 'Escort cart to Phandalin',
  notes: ['Hired by Gundren Rockseeker to escort a wagon of supplies to Phandalin', 'Gundren went ahead with a warrior, Sildar Hallwinter', 'Characters promised 10gp each by the owner of Barthen\'s Provisions in Phandalin on safe delivery'],
  location: 'Neverwinter',
  activeNotes: null
}
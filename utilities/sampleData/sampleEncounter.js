import goblin from './goblin'
import quasit from './sampleMonster'

export default {
    title: "Goblin Ambush",
    active: 0,
    target: 0,
    xpEarned: 0,
    loot: [],
    chars: [
        {   name: 'Snervelin',
            ac: 14,
            hp: 123,
            status: [],
            type: 'pc',
            initiative: 0 
        },
        {
            name: 'Goblin',
            ac: 12,
            hp: 30,
            status: [],
            type: 'enemy',
            initiative: 0,
            cr: 3,
            data: goblin,
        },
        {
            name: 'Jealdor',
            ac: 13,
            hp: 30,
            status: [],
            type: 'pc',
            initiative: 0,
        },
        {
            name: 'Goblin',
            ac: 12,
            hp: 24,
            status: [],
            type: 'enemy',
            cr: 0.25,
            initiative: 0,
            data: goblin
        },
        {
            name: 'Boxbix',
            ac: 16,
            hp: 32,
            status: [],
            type: 'npc',
            initiative: 0,
            stats: {
              str: '+2',
              dex: '+2',
              con: '0',
              int: '-1',
              cha: '3'
            },
        },
        {
          name: 'Quasit',
          ac: 13,
          hp: 7,
          status: [],
          type: 'enemy',
          cr: 0.25,
          initiative: 0,
          data: quasit
      },
    ]
}

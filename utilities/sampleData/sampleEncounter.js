import goblin from './goblin'

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
            initiative: 22 
        },
        {
            name: 'Goblin B',
            ac: 12,
            hp: 30,
            status: [],
            type: 'enemy',
            initiative: 21,
            cr: 3,
            data: goblin,
        },
        {
            name: 'Jealdor',
            ac: 13,
            hp: 30,
            status: [],
            type: 'pc',
            initiative: 18,
        },
        {
            name: 'Goblin A',
            ac: 12,
            hp: 24,
            status: [],
            type: 'enemy',
            cr: 0.25,
            initiative: 13,
            data: goblin
        },
        {
            name: 'Boxbix',
            ac: 16,
            hp: 32,
            status: [],
            type: 'npc',
            initiative: 8,
            stats: {
              str: '+2',
              dex: '+2',
              con: '0',
              int: '-1',
              cha: '3'
            },
        }
    ]
}
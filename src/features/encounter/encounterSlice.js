import { createSlice } from "@reduxjs/toolkit";
import { tallyXp } from "../../api";

import sampleEncounter from "../../../utilities/sampleData/sampleEncounter";

const encounterSlice = createSlice({
  name: 'encounter',
  initialState: {
    ...sampleEncounter,
    location: 'Phandalin',
    notes: ['Lets kill some Red Brands'],
    groupMode: 0,
    tiebreak: false,
    ties: {},
    activeTie: null
  },
  reducers: {
    setChars: (state, action) => {
      state.chars = action.payload
    },
    setEncounter: (state, action) => {
      Object.keys(action.payload).forEach(key =>
        (state[key] = action.payload[key])
      )
    },
    nextChar: state => {
      state.active = (state.active + 1) % state.chars.length
    },
    setTargeted: (state, action) => {
      //TODO
    },
    cycleGroupMode: state => {
      const newIndex = state.groupMode + 1
      state.groupMode = newIndex % 3
    },
    toggleTiebreak: state => {
      state.tiebreak = !state.tiebreak
    },
    setActiveTie: (state, action) => {
      state.activeTie = action.payload
    },
    setInitiative: (state, action) => {
      const index = state.chars.findIndex(char => char.name === action.payload.name)
      state.chars[index].initiative = action.payload.initiative
    },
    setAllEnemies: (state, action) => {
      state.chars.forEach(char => {
        if (char.type === 'enemy') {
          char.initiative = action.payload
        }
      })
    },
    setEnemiesByType: (state, action) => {
      state.chars.forEach(char => {
        if (char.type === 'enemy' && char.name === action.payload) {
          char.initiative = action.payload.initiative
        }
      })
    },
    sortByInitiative: (state) => {
      let sortedChars = state.chars.slice(0).sort((a, b) => {
        if (a.initiative > b.initiative) {
          return -1
        } else if (a.initiative < b.initiative) {
          return 1
        } else {
          return a.name.localeCompare(b.name)
        }
      })
      sortedChars = sortedChars.map((char, i) => ({...char, key: i}))
      state.chars = sortedChars
    },
    validateInitiative: (state) => {
      const inits = {};
      state.chars.forEach(char => {
        //Create an array for each initiative
        inits[char.initiative.toString()] ? inits[char.initiative].push(char) : inits[char.initiative] = [char]
      })
      //Check for duplicates
      Object.keys(inits).forEach(key => {
        if (inits[key].length > 1) {
          if (state.groupMode === 0) {
            //Case: duplicates for this initiative, all enemies grouped together
            const enemy = state.chars.find(char => (char.type === 'enemy' && char.initiative === parseFloat(key)))
            
            const oneEnemyInits = inits[key].filter(char => char.type !== 'enemy')
            oneEnemyInits.push(enemy)
            
            //ONLY add this value to ties if there's more than one left after reducing to a single enemy value
            if (oneEnemyInits.length > 1) {
              const toSet = {...state.ties}
              toSet[key] = oneEnemyInits
              state.ties = toSet
            }
            //console.log(state.ties, 'ties in state')
          } else if (state.groupMode === 1) {
            //Case: duplicates for this initiative, enemies grouped by type
            const reducedByName = inits[key].filter((char, index) => inits[key].indexOf(char) === index);
            if (reducedByName.length > 1) {
              state.ties[key] = reducedByName
            }
          } else {
            //Case: duplicates for this initiative, enemies handled individually
            state.ties[key] = inits[key]
          }
        }
      });
      //If there are no ties remaining,
      //if (JSON.stringify({}) === JSON.stringify(state.ties)) {
        //Find duplicates and assign them numbers
        const dupeCounts = {}
        const newChars = []
        state.chars.forEach(char => {
          if (dupeCounts[char.name] === undefined) {
            dupeCounts[char.name] = 1;
            newChars.push(char);
          } else {
            if (dupeCounts[char.name] === 1){
              newChars.find(guy => guy.name === char.name).name = `${char.name} 1`
            }
            const nextOne = `${char.name} ${dupeCounts[char.name] + 1}`;
            char.name = nextOne
            dupeCounts[char.name] ++;
            newChars.push(char)
          }
        })
        state.chars = newChars
      //}
    },
    //the following actions require a "target" integer corresponding to an index in the encounter's "chars" array
    statusAdded: (state, action) => {
      let target = state.chars[target];
      target.status = [...target.status, action.status]
    },
    statusRemoved: (state, action) => {
      let target = state.chars[action.target];
      target.status = target.status.filter(status => (status !== action.status))
    },
    hpAdded: (state, action) => {
      let target = state.chars[action.target];
      target.hp += action.hp
    },
    hpRemoved: (state, action) => {
      let target = state.chars[action.target];
      target.hp -= action.hp
    },
    targetDestroyed: async (state, action) => {
      let target = state.chars[action.target];
      state.chars = state.chars.filter(char => (char !== target))
      state.xpEarned += await tallyXp(target.name)
    },
    setLocation: (state, action) => {
      state.location = action.payload
    },
    addNote: (state, action) => {
      state.notes.push(action.payload)
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note !== action.payload);
    },
    editNote: (state, action) => {
      const { index, newNote } = action.payload;
      state.notes[index] = newNote
    },
    autoResolveTies: (state) => {
      //Buggy, needs work
      const highToLowTies = Object.keys(state.ties).sort((a,b) => (parseFloat(b) - parseFloat(a)))
      //console.log(highToLowTies, 'sorted tied inits')
      highToLowTies.forEach(init => {
        const theseChars = state.ties[init]
        //console.log(theseChars, 'theseChars')
        let nonPCs = theseChars.filter(char => (char.type !== 'pc'))
        if(nonPCs.length === state.ties[init].length){1
          nonPCs.sort((a, b) => {
            if(a.type === 'npc'){
               if(b.type === 'enemy'){
                return b.data.dexterity - (parseInt(a.stats.dex) * 2 + 10)
               } else {
                return b.stats.dex - a.stats.dex
               }
            } else if(a.type === 'enemy'){
              if(b.type === 'enemy'){
                return b.data.dexterity - a.data.dexterity
              } else {
                return (parseInt(b.stats.dex) * 2 + 10) - a.data.dexterity
              }
            }
          })
        }
        nonPCs.forEach((char, i) => {
          char.initiative = parseFloat(`${init}.${i}`)
        })
        delete state.ties[init]
      })
    }
  }
})

export const { setEncounter, setChars, nextChar, statusAdded, statusRemoved, hpAdded, hpRemoved, targetDestroyed, setLocation, addNote, deleteNote, editNote, setInitiative, setAllEnemies, setEnemiesByType, sortByInitiative, cycleGroupMode, toggleTiebreak, validateInitiative, autoResolveTies, setActiveTie } = encounterSlice.actions
export default encounterSlice.reducer
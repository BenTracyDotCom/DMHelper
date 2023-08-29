export default {
  index: "dragonborn",
  name: "Dragonborn",
  speed: 30,
  ability_bonuses: [
    {
      ability_score: {
        index: "str",
        name: "STR",
        url: "/api/ability-scores/str",
      },
      bonus: 2,
    },
    {
      ability_score: {
        index: "cha",
        name: "CHA",
        url: "/api/ability-scores/cha",
      },
      bonus: 1,
    },
  ],
  alignment:
    "Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil. Most dragonborn are good, but those who side with evil can be terrible villains.",
  age: "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
  size: "Medium",
  size_description:
    "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
  starting_proficiencies: [],
  languages: [
    {
      index: "common",
      name: "Common",
      url: "/api/languages/common",
    },
    {
      index: "draconic",
      name: "Draconic",
      url: "/api/languages/draconic",
    },
  ],
  language_desc:
    "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.",
  traits: [
    {
      index: "draconic-ancestry",
      name: "Draconic Ancestry",
      url: "/api/traits/draconic-ancestry",
    },
    {
      index: "breath-weapon",
      name: "Breath Weapon",
      url: "/api/traits/breath-weapon",
    },
    {
      index: "damage-resistance",
      name: "Damage Resistance",
      url: "/api/traits/damage-resistance",
    },
  ],
  subraces: [],
  url: "/api/races/dragonborn",
};

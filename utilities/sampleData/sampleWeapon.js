//api/equipment/shortsword

export default {
  desc: [],
  special: [],
  index: "shortsword",
  name: "Shortsword",
  equipment_category: {
    index: "weapon",
    name: "Weapon",
    url: "/api/equipment-categories/weapon",
  },
  weapon_category: "Martial",
  weapon_range: "Melee",
  category_range: "Martial Melee",
  cost: {
    quantity: 10,
    unit: "gp",
  },
  damage: {
    damage_dice: "1d6",
    damage_type: {
      index: "piercing",
      name: "Piercing",
      url: "/api/damage-types/piercing",
    },
  },
  range: {
    normal: 5,
  },
  weight: 2,
  properties: [
    {
      index: "finesse",
      name: "Finesse",
      url: "/api/weapon-properties/finesse",
    },
    {
      index: "light",
      name: "Light",
      url: "/api/weapon-properties/light",
    },
    {
      index: "monk",
      name: "Monk",
      url: "/api/weapon-properties/monk",
    },
  ],
  url: "/api/equipment/shortsword",
  contents: [],
};

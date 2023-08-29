export default {
  index: "quasit",
  name: "Quasit",
  size: "Tiny",
  type: "fiend",
  subtype: "demon",
  alignment: "chaotic evil",
  armor_class: [
    {
      type: "dex",
      value: 13,
    },
  ],
  hit_points: 7,
  hit_dice: "3d4",
  hit_points_roll: "3d4",
  speed: {
    walk: "40 ft.",
  },
  strength: 5,
  dexterity: 17,
  constitution: 10,
  intelligence: 7,
  wisdom: 10,
  charisma: 10,
  proficiencies: [
    {
      value: 5,
      proficiency: {
        index: "skill-stealth",
        name: "Skill: Stealth",
        url: "/api/proficiencies/skill-stealth",
      },
    },
  ],
  damage_vulnerabilities: [],
  damage_resistances: [
    "cold",
    "fire",
    "lightning",
    "bludgeoning, piercing, and slashing from nonmagical weapons",
  ],
  damage_immunities: ["poison"],
  condition_immunities: [
    {
      index: "poisoned",
      name: "Poisoned",
      url: "/api/conditions/poisoned",
    },
  ],
  senses: {
    darkvision: "120 ft.",
    passive_perception: 10,
  },
  languages: "Abyssal, Common",
  challenge_rating: 1,
  xp: 200,
  special_abilities: [
    {
      name: "Shapechanger",
      desc: "The quasit can use its action to polymorph into a beast form that resembles a bat (speed 10 ft. fly 40 ft.), a centipede (40 ft., climb 40 ft.), or a toad (40 ft., swim 40 ft.), or back into its true form . Its statistics are the same in each form, except for the speed changes noted. Any equipment it is wearing or carrying isn't transformed . It reverts to its true form if it dies.",
    },
    {
      name: "Magic Resistance",
      desc: "The quasit has advantage on saving throws against spells and other magical effects.",
    },
  ],
  actions: [
    {
      name: "Claw (Bite in Beast Form)",
      desc: "Melee Weapon Attack: +4 to hit, reach 5 ft ., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or take 5 (2d4) poison damage and become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
      attack_bonus: 4,
      damage: [
        {
          damage_type: {
            index: "piercing",
            name: "Piercing",
            url: "/api/damage-types/piercing",
          },
          damage_dice: "1d4+3",
        },
      ],
      actions: [],
    },
    {
      name: "Scare",
      desc: "One creature of the quasit's choice within 20 ft. of it must succeed on a DC 10 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, with disadvantage if the quasit is within line of sight, ending the effect on itself on a success.",
      usage: {
        type: "per day",
        times: 1,
      },
      dc: {
        dc_type: {
          index: "wis",
          name: "WIS",
          url: "/api/ability-scores/wis",
        },
        dc_value: 10,
        success_type: "none",
      },
      actions: [],
    },
    {
      name: "Invisibility",
      desc: "The quasit magically turns invisible until it attacks or uses Scare, or until its concentration ends (as if concentrating on a spell). Any equipment the quasit wears or carries is invisible with it.",
      actions: [],
    },
  ],
  url: "/api/monsters/quasit",
  legendary_actions: [],
};

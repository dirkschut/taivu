const skillIDS = {
    magic: 0,
    spatialmagics: 1,
    runicmagics: 2,
    animalcare: 3,
    husbandry: 4,
    butchering: 5,
    skinning: 6,
    taming: 7,
    naturemanagement: 8,
    woodcutting: 9,
    harvesting: 10,
    planting: 11,
    metalworking: 12,
    mining: 13,
    smelting: 14,
};

const skillData = [
    //Magic (0-2)
    {
        id: skillIDS.magic,
        lid: "magic",
        levelCap: 10,
    },
    {
        id: skillIDS.spatialmagics,
        lid: "spatialmagics",
        levelCap: 10,
        parentSkill: skillIDS.magic,
    },
    {
        id: skillIDS.runicmagics,
        lid: "runicmagics",
        levelCap: 10,
        parentSkill: skillIDS.magic,
    },

    //Animals (3-7)
    {
        id: skillIDS.animalcare,
        lid: "animalcare",
        levelCap: 10,
    },
    {
        id: skillIDS.husbandry,
        lid: "husbandry",
        levelCap: 10,
        parentSkill: skillIDS.animalcare,
    },
    {
        id: skillIDS.butchering,
        lid: "butchering",
        levelCap: 10,
        parentSkill: skillIDS.animalcare,
    },
    {
        id: skillIDS.skinning,
        lid: "skinning",
        levelCap: 10,
        parentSkill: skillIDS.animalcare,
    },
    {
        id: skillIDS.taming,
        lid: "taming",
        levelCap: 10,
        parentSkill: skillIDS.animalcare,
    },

    //Nature (8-11)
    {
        id: skillIDS.naturemanagement,
        lid: "naturemanagement",
        levelCap: 10,
    },
    {
        id: skillIDS.woodcutting,
        lid: "woodcutting",
        levelCap: 10,
        parentSkill: skillIDS.naturemanagement,
    },
    {
        id: skillIDS.harvesting,
        lid: "harvesting",
        levelCap: 10,
        parentSkill: skillIDS.naturemanagement,
    },
    {
        id: skillIDS.planting,
        lid: "planting",
        levelCap: 10,
        parentSkill: skillIDS.naturemanagement,
    },

    //Metal (12-14)
    {
        id: skillIDS.metalworking,
        lid: "metalworking",
        levelCap: 10,
    },
    {
        id: skillIDS.mining,
        lid: "mining",
        levelCap: 10,
        parentSkill: skillIDS.metalworking,
    },
    {
        id: skillIDS.smelting,
        lid: "smelting",
        levelCap: 10,
        parentSkill: skillIDS.metalworking,
    },
];
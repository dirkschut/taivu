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
    }
];

const skillIDS = {
    magic: 0,
    spatialmagics: 1,
    runicmagics: 2,
    animalcare: 3,
    husbandry: 4,
    butchering: 5,
    skinning: 6,
    taming: 7,
    woodcutting: 8,
    mining: 9,
    smelting: 10,
    farming: 11,
};
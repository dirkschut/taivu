//The class which contains the skill data pertaining to the save game.
class Skill{
    constructor(id){
        this.id = id;
        this.level = 0;
    }

    //Set the skill level to the given level.
    setLevel(level){
        if(level <= this.getSkillData().levelCap && level >= 0){
            this.level = level;
        }
    }

    //Get the skill data from the skillData array.
    getSkillData(){
        return skillData[this.id];
    }

    //Returns the chance of the given action to be a success (between 0 and 1).
    getActionSuccessChance(actionID){
        //Check if the action exists.
        if(this.getSkillData().actions[actionID] == null){
            return -1;
        }

        let action = this.getSkillData().actions[actionID];
        return this.level / action.level / action.difficulty;
    }

    getActionLevelupChance(actionID){
        //Check if the action exists.
        if(this.getSkillData().actions[actionID] == null){
            return -1;
        }

        let action = this.getSkillData().actions[actionID];
        let levelChance = (1 / (this.level * this.level / action.level)) * .1 / action.level;
        if(this.level - action.level >= 5){
            levelChance = 0;
        }
        return levelChance;
    }

    doAction(actionID){
        currentAction.lastTime = Date.now();
        let action = this.getSkillData().actions[actionID];

        if(this.level >= action.level){
            
            //Check to see if the input items can be removed from the inventory.
            let canRemove = true;
            for(input in action.input){
                if(!canRemoveFromInventory(input, action.input[input].amount)){
                    canRemove = false;
                }
            }

            if(canRemove){
                //Remove input items from inventory
                for(input in action.input){
                    removeFromInventory(input, action.input[input].amount);
                }

                //Check to see if you succeed in the action.
                let successChance = this.getActionSuccessChance(actionID);
                let roll = Math.random();
                if(roll < successChance){
                    currentAction.messages.push(i18next.t("general.actionSuccess"));

                    //Add the output items to the inventory.
                    for(let itemID in action.output){
                        addItemToInventory(itemID, action.output[itemID].amount);
                    }

                    //Increase the item cap.
                    for(let category in action.increase_cap){
                        addToItemCap(category, action.increase_cap[category].amount);
                    }
    
                    //Check to see if the skill leveled from the action.
                    let lvlChance = this.getActionLevelupChance(actionID);
                    if(lvlChance > 0 && this.level < skillData[skillID].levelCap){
                        console.log("level: " + this.level + " lvlchance: " + lvlChance + " (1 in " + (1 / lvlChance) + ")");
                        roll = Math.random();
                        if(roll < lvlChance){
                            this.level++;
                            currentAction.messages.push(i18next.t("general.actionLevelUp"));
                        }
                    }else{
                        currentAction.messages.push(i18next.t("general.actionLevelTooHigh"));
                    }
                }else{
                    currentAction.messages.push(i18next.t("general.actionFailed"));
                }
            }else{
                currentAction.messages.push(i18next.t("general.actionNotEnoughItems"));
            }
        }

        displayActionMessages();
        displayActionButtons();
        displayLevels();
        displayInventory();
    }
}

//Display the skill list in the skills tab.
function showSkills(){
    console.log("---Showing Skills---");
    let skillText = "<ul>";

    for(skill in skillData){
        if(!skillHasParent(skill)){
            skillText += getSkillText(skill);
        }
    }

    skillText += "</ul>";
    $("#skilllist").html(skillText);
};

// Checks to see if a skill has a parent skill set.
function skillHasParent(skillID){
    if(skillData[skillID].parentSkill == null){
        return false;
    }
    return true;
}

// Generate the skill text for a given skill.
function getSkillText(skillID){
    console.log(skillID);
    let skillText = "<li>";
    
    skillText += "<b>" + i18next.t("skills." + skillID + ".name") + "</b><br />";
    skillText += i18next.t("skills." + skillID + ".desc") + "<br />";
    skillText += i18next.t("general.levelCap") + ": " + skillData[skillID].levelCap + "<br />";

    skillText += i18next.t("general.actions") + ":<ul>";

    for(actionID in skillData[skillID].actions){
        skillText += getActionText(skillID, actionID);
    }


    skillText += "</ul>";

    let childSkills = "";

    for(childSkill in skillData){
        if(skillData[childSkill].parentSkill == skillID){
            childSkills += getSkillText(childSkill);
        }
    }

    if(childSkills != ""){
        skillText += i18next.t("general.childSkills") + ": <ul>";
        skillText += childSkills;
        skillText += "</ul>";
    }

    skillText += "</li>";
    return skillText;
}

//Get text describing an action for the skills page.
function getActionText(skillID, actionID){
    let action = skillData[skillID].actions[actionID];
    let actionText = "<li>";

    actionText += "<b>" + i18next.t("skills." + skillID + ".actions." + actionID + ".name") + "</b><br />";
    actionText += i18next.t("skills." + skillID + ".actions." + actionID + ".desc") + "</b><br />";
    actionText += i18next.t("general.requiredLevel") + ": " + action.level + "<br />";
    actionText += i18next.t("general.difficulty") + ": " + action.difficulty + "<br />";
    actionText += i18next.t("general.input") + ": <ul>";
    for(input in action.input){
        actionText += "<li>" + action.input[input].amount + " " + i18next.t("items." + input + ".name") + "</li>";
    }
    actionText += "</ul>";
    actionText += i18next.t("general.output") + ": <ul>";
    for(output in action.output){
        actionText += "<li>" + action.output[output].amount + " " + i18next.t("items." + output + ".name") + "</li>";
    }
    actionText += "</ul></li>";

    return actionText;
}

//Displays the skill levels on the home page.
function displayLevels(){
    let levelText = "";
    for(level in skills){
        levelText += "<li>" + i18next.t("skills." + level + ".name") + ": " + skills[level].level;
    }
    $("#levels").html(levelText);
}

//Displays the action buttons on the home page.
function displayActionButtons(){
    let actionsText = "";
    for(skillID in skillData){
        let skill = skillData[skillID];
        for(actionID in skill.actions){
            let action = skill.actions[actionID];
            if(skills[skillID] != null){
                if(skills[skillID].level >= action.level){
                    actionsText += "<button class='uk-button uk-button-default actionButton' onclick='setCurrentAction(`" + skillID + "`, `" + actionID + "`)'>";
                    actionsText += i18next.t("skills." + skillID + ".actions." + actionID + ".name");

                    //Begin tooltip
                    actionsText += "<span class='tooltiptext uk-light'>";

                    //Success chance and levelup chance
                    actionsText += "<div class='chanceText'>";
                    actionsText += "Success Chance: " + parseFloat(skills[skillID].getActionSuccessChance(actionID) * 100).toFixed(2) + "%<br />";
                    actionsText += "Levelup Chance: " + parseFloat(skills[skillID].getActionLevelupChance(actionID) * 100).toFixed(2) + "%";
                    actionsText += "</div><hr/>";

                    //Input
                    if(action.input != null){
                        actionsText += "<div class='actionInput'><b>" + i18next.t("general.input") + ":</b><ul>";
                        for(input in action.input){
                            actionsText += "<li>" + action.input[input].amount + " ";
                            if(items[input] != null){
                                actionsText += "(" + items[input].amount + ")";
                            }else{
                                actionsText += "(0)";
                            }
                            actionsText += " " + i18next.t("items." + input + ".name") + "</li>";
                        }
                        actionsText += "</ul></div>";
                    }

                    //Output
                    if(action.output != null){
                        actionsText += "<div class='actionOutput'><b>" + i18next.t("general.output") + ":</b><ul>";
                        for(output in action.output){
                            actionsText += "<li>" + action.output[output].amount + " ";
                            if(items[output] != null){
                                actionsText += "(" + items[output].amount + ")";
                            }else{
                                actionsText += "(0)";
                            }
                            actionsText += " " + i18next.t("items." + output + ".name") + "</li>";
                        }
                        actionsText += "</ul></div>";
                    }

                    //Increase Item Cap
                    if(action.increase_cap != null){
                        actionsText += "<div class='actionOutput'><b>" + i18next.t("general.increaseItemCap") + ":</b><ul>";
                        for(increase_cap in action.increase_cap){
                            actionsText += "<li>" + action.increase_cap[increase_cap].amount + " " + i18next.t("itemCategory." + increase_cap + ".name") + "</li>";
                        }
                        actionsText += "</ul></div>";
                    }
                    actionsText += "</span>";

                    actionsText += "</button>";
                }
            }
        }
    }
    $("#actions").html(actionsText);
}

function displayActionMessages(){
    //Display the action messages.
    if(currentAction.messages != null){
        while(currentAction.messages.length > 5){
            currentAction.messages.shift();
        }

        let messageText = "<ul>";
        for(message in currentAction.messages){
            messageText += "<li>" + currentAction.messages[message] + "</li>";
        }
        messageText += "</ul>";

        $("#actionMessage").html(messageText);
    }
}

//Sets the current action and starts the interval.
function setCurrentAction(skillID, actionID){
    if(currentAction.skillID == skillID && currentAction.actionID == actionID){
        console.log("Stopping action");
        currentAction.skillID = null;
        currentAction.actionID = null;
        currentAction.messages = [];
        clearInterval(currentAction.interval);
        clearInterval(currentAction.progressUpdate);
    }else{
        console.log("Setting current action to " + skillID + " " + actionID);
        currentAction.skillID = skillID;
        currentAction.actionID = actionID;
        currentAction.messages = [];
        clearInterval(currentAction.interval);
        $("#currentAction").html(i18next.t("skills." + skillID + ".actions." + actionID + ".name"));
        document.getElementById("actionProgress").max = skillData[skillID].actions[actionID].time;
        currentAction.interval = setInterval(() => {
            doCurrentAction()
        }, skillData[skillID].actions[actionID].time);
    
        currentAction.lastTime = Date.now();
        clearInterval(currentAction.progressUpdate);
        currentAction.progressUpdate = setInterval(() => {
            updateProgress();
        }, 10);
    }
}

//Is called by the interval to do the current action.
function doCurrentAction(){
    skills[currentAction.skillID].doAction(currentAction.actionID);
}

//Updates the action progressbar.
function updateProgress(){
    let test = Date.now() - currentAction.lastTime;
    document.getElementById("actionProgress").value = test;
}

//Add the given amount to the item cap of the given category.
function addToItemCap(category, amount){
    if(itemCapModifiers[category] == null){
        itemCapModifiers[category] = 0;
    }
    itemCapModifiers[category] += amount;
}

//Set the level of the given skill to the given number
function setSkillLevel(skillID, level){
    if(skills[skillID] == null){
        skills[skillID] = new Skill(skillID);
    }
    skills[skillID].setLevel(level);
}
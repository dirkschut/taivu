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
                let successChance = this.level / action.level / action.difficulty;
                let roll = Math.random();
                if(roll < successChance){
                    currentAction.messages.push("Successful Action.");

                    //Add the output items to the inventory.
                    for(let itemID in action.output){
                        addItemToInventory(itemID, action.output[itemID].amount);
                    }
    
                    //Check to see if the skill leveled from the action.
                    if(this.level - action.level < 5 && this.level < skillData[skillID].levelCap){
                        let lvlChance = (1 / (this.level * this.level / action.level)) * .1 / action.level;
                        console.log("level: " + this.level + " lvlchance: " + lvlChance + " (1 in " + (1 / lvlChance) + ")");
                        roll = Math.random();
                        if(roll < lvlChance){
                            this.level++;
                            displayActionButtons();
                            displayLevels();
                            currentAction.messages.push("Level up!");
                        }
                    }else{
                        currentAction.messages.push("Too high level for levelup or level cap reached.");
                    }
                }else{
                    currentAction.messages.push("Failed the action.");
                }
            }else{
                currentAction.messages.push("You do not have enough items to complete the action.");
            }
        }

        displayActionMessages();
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
    skillText += "Level Cap: " + skillData[skillID].levelCap + "<br />";

    skillText += "Actions:<ul>";

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
        skillText += "Child Skills: <ul>";
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
    actionText += "Required level: " + action.level + "<br />";
    actionText += "Difficulty: " + action.difficulty + "<br />";
    actionText += "Input: <ul>";
    for(input in action.input){
        actionText += "<li>" + action.input[input].amount + " " + i18next.t("items." + input + ".name") + "</li>";
    }
    actionText += "</ul>";
    actionText += "Output: <ul>";
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
                    actionsText += "<button class='uk-button uk-button-default' onclick='setCurrentAction(`" + skillID + "`, `" + actionID + "`)'>" + i18next.t("skills." + skillID + ".actions." + actionID + ".name") + "</button>";
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

//Is called by the interval to do the current action.
function doCurrentAction(){
    skills[currentAction.skillID].doAction(currentAction.actionID);
}

//Updates the action progressbar.
function updateProgress(){
    let test = Date.now() - currentAction.lastTime;
    document.getElementById("actionProgress").value = test;
}
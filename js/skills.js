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
    actionText += "Output: <ul>";
    for(output in action.output){
        actionText += "<li>" + action.output[output].amount + " " + i18next.t("items." + output + ".name") + "</li>";
    }
    actionText += "</ul></li>";

    return actionText;
}
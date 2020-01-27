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
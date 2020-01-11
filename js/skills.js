function showSkills(){
    console.log("---Showing Skills---");
    let skillText = "<ul>";

    skillData.forEach(function(skill){
        if(skill.parentSkill == null){
            skillText += getSkillText(skill);
        }
    });

    skillText += "</ul>";
    $("#skilllist").html(skillText);
};

function getSkillText(skill){
    let skillText = "<li>";
    skillText += "[" + skill.id + "] " + i18next.t("skills." + skill.lid + ".name") + "<br />";
    skillText += i18next.t("skills." + skill.lid + ".desc");

    let subSkills = skillData.filter(subSkill => subSkill.parentSkill === skill.id);
    if(subSkills.length > 0){
        skillText += "<ul>";
        subSkills.forEach(function(subSkill){
            skillText += getSkillText(subSkill);
        });
        skillText += "</ul>";
    }

    skillText += "</li>";
    return skillText;
}
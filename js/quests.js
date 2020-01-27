//Display the quests in the quests tab.
function showQuests(){
    console.log("---Showing Quests---");
    let questText = "<ul>";

    for(quest in questData){
        questText += getQuestText(quest);
    }

    questText += "</ul>";
    $("#questlist").html(questText);
};

//Returns the quest string for a given quest ID.
function getQuestText(quest){
    console.log(quest);
    let questText = "<li>";

    questText += "<b>" + i18next.t("quests." + quest + ".name") + "</b><br />";
    questText += i18next.t("quests." + quest + ".desc") + "</li>";
    questText += "<ul>";

    questData[quest].stages.forEach(stage => {
        questText += "<li>[" + stage.id + "] " + i18next.t("quests." + quest + ".stages." + stage.id + ".desc") + "</li>";
    });

    questText += "</ul></li>";
    return questText;
}
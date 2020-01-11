function showQuests(){
    console.log("---Showing Quests---");
    let questText = "<ul>";

    questData.forEach(function(quest){
        questText += "<li>[" + quest.id + "] " + i18next.t("quests." + quest.lid + ".name") + "<br />" + i18next.t("quests." + quest.lid + ".desc") + "</li>";
        questText += "<ul>";
        quest.stages.forEach(function(stage){
            questText += "<li>[" + stage.id + "] " + i18next.t("quests." + quest.lid + ".stages." + stage.id + ".desc") + "</li>";
        });
        questText += "</ul>";
    });

    questText += "</ul>";
    $("#questlist").html(questText);
};
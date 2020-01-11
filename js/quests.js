function showQuests(){
    console.log("---Showing Quests---");
    let questText = "<ul>";

    questData.forEach(function(quest){
        questText += "<li>[" + quest.id + "] " + i18next.t(quest.name) + "<br />" + i18next.t(quest.description) + "</li>";
        questText += "<ul>";
        quest.stages.forEach(function(stage){
            questText += "<li>[" + stage.id + "] " + i18next.t(stage.description) + "</li>";
        });
        questText += "</ul>";
    });

    questText += "</ul>";
    $("#questlist").html(questText);
};
$(document).ready(function(){
    let questText = "<ul>";

    questData.forEach(function(quest){
        questText += "<li>[" + quest.id + "] " + quest.name + "<br />" + quest.description + "</li>";
        questText += "<ul>";
        quest.stages.forEach(function(stage){
            questText += "<li>[" + stage.id + "] " + stage.description + "</li>";
        });
        questText += "</ul>";
    });

    questText += "</ul>";
    $("#questlist").html(questText);
});
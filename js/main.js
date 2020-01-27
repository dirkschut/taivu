var loadedLocales = false; //When set to true indicates that the locales strings have been loaded.
var loadedContent = false; //When set to true indicates that the content (quests, items, skills, etc.) have been loaded. Can be used as a check for mods.

//Gets called when the document is loaded.
$(document).ready(function(){
    loadAll();
});

//Initiates the loading of both the locales and the content.
function loadAll(){
    console.log("---LOADING---");
    if(!loadedLocales){
        loadLocales();
    }
    else{
        showQuests();
        showSkills();
        showItems();
        loadedContent = true;
    }
}
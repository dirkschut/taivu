var loadedLocales = false; //When set to true indicates that the locales strings have been loaded.
var loadedContent = false; //When set to true indicates that the content (quests, items, skills, etc.) have been loaded. Can be used as a check for mods.

var items = {};
var skills = {};
var currentAction = {};

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
        initSave();
        showQuests();
        showSkills();
        showItems();
        displayLevels();
        displayActionButtons();

        loadedContent = true;
    }
}

//Initialize the save game.
function initSave(){
    console.log("---Initializing Save---");
    skills["spatialmagics"] = new Skill("spatialmagics");
    skills["spatialmagics"].setLevel(1);
}
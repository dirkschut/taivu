var loadedLocales = false; //When set to true indicates that the locales strings have been loaded.
var loadedContent = false; //When set to true indicates that the content (quests, items, skills, etc.) have been loaded. Can be used as a check for mods.

var items = {};
var itemCapModifiers = {};
var skills = {};
var currentAction = {};

var saveGameInterval;

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
        loadGame();
        showQuests();
        showSkills();
        showItems();
        displayLevels();
        displayActionButtons();
        displayInventory();

        saveGameInterval = setInterval(() => {
            saveGame();
        }, 10000);

        loadedContent = true;
    }
}

//Initialize the save game.
function initSave(){
    console.log("---Initializing Save---");
    skills["spatialmagics"] = new Skill("spatialmagics");
    skills["spatialmagics"].setLevel(1);
}

//Save the current game state into the localStorage of the browser.
function saveGame(){
    console.log("Saving Game");
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("itemCapModifiers", JSON.stringify(itemCapModifiers));
    localStorage.setItem("skills", JSON.stringify(skills));
}

//Load the save game from the browser's localStorage.
function loadGame(){
    let tempItems = JSON.parse(localStorage.getItem("items"));
    for(item in tempItems){
        addItemToInventory(item, tempItems[item].amount);
    }

    let tempItemCapModifiers = JSON.parse(localStorage.getItem("itemCapModifiers"));
    if(tempItemCapModifiers != null){
        itemCapModifiers = tempItemCapModifiers;
    }

    let tempSkills = JSON.parse(localStorage.getItem("skills"));
    for(skill in tempSkills){
        setSkillLevel(skill, tempSkills[skill].level);
    }
}

//Switch to the given page.
function showPage(pageID){
    let pages = document.getElementsByClassName("taivuPage");
    for(let i = 0; i < pages.length; i++){
        if(pages[i].id == pageID){
            pages[i].style.display = "block";
        }else{
            pages[i].style.display = "none";
        }
    }
}
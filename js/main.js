var loadedLocales = false;

$(document).ready(function(){
    loadAll();
});

function loadAll(){
    console.log("---LOADING---");
    if(!loadedLocales){
        loadLocales();
    }
    else{
        showQuests();
    }
}
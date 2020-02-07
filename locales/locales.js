function loadLocales(){
    i18next
    .use(i18nextXHRBackend)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        backend: {
            loadPath: 'locales/{{lng}}/{{ns}}.json',
            crossDomain: false,
        },
    }, function(err, t){
        updateContent();
        loadedLocales = true;
        loadAll();
    });
};



function updateContent(){
    console.log("---UPDATING LOCALIZED CONTENT---");
    $("#gamedesc").html(i18next.t("gamedesc"));
    $("#madeby").html(i18next.t("madeby"));

    $("#navHeaderGame").html(i18next.t("general.game"));
    $("#navHome").html(i18next.t("general.home"));
    $("#navInventory").html(i18next.t("general.inventory"));
    $("#navSkills").html(i18next.t("general.skills"));
    $("#navHeaderData").html(i18next.t("general.data"));
    $("#navSkillList").html(i18next.t("general.skillList"));
    $("#navQuestList").html(i18next.t("general.questList"));
    $("#navItemList").html(i18next.t("general.itemList"));
    $("#navHeaderExternal").html(i18next.t("general.external"));
    $("#actionProgressTitle").html(i18next.t("general.actionProgress"));
    $("#levelsTitle").html(i18next.t("general.levels"));
    $("#actionsTitle").html(i18next.t("general.actions"));
    $("#inventoryTitle").html(i18next.t("general.inventory"));
}
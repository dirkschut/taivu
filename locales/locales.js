function loadLocales(){
    i18next
    .use(i18nextXHRBackend)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
            crossDomain: true,
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
}
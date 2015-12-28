var Potpuri = Backbone.Model.extend({
    defaults: {
        potpuriId: null,
        title: null,
        lead: null, // leading text for potpuri
        icon: './assets/img/game_placeholder.jpg',
        gamesArray: [], // eg. [1,2,3] meaning game1 -> game2 -> game3
        progressPicArray: [] //eg. after completing each game picture changes
    }
});

var Game = Backbone.Model.extend({
    defaults: {
        gameId: null,
        title: 'No title',
        coverImage: './assets/img/game_placeholder.jpg',
        guide: 'Harjoituksen ohjeet puuttuvat',
        exerciseTarget: null //Mitä harjoitetaan: eg. Tarkkaavaisuus / Tarkkaavuuden ylläpitäminen
    }
});

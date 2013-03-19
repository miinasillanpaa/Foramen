var Game = Backbone.Model.extend({
    //urlRoot:'/piiri-foramen/',
    defaults: {
        gameId: null,
        title: 'No title',
        coverImage: './img/game_placeholder.jpg',
        guide: 'Pelin ohjeet puuttuvat',
        difficulty: 'easy'
    }
});


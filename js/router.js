window.Settings = new Settings();

window.Router = Backbone.Router.extend({
	routes: {
		"" : "gameIndex",
		"game/:id": "getGame",
        "game/:id/video": "videoView",
        "game/:id/play": "play",
        "game/:id/results" : "resultsView"
	},

	gameIndex: function() {
		new GameListView(games);
	}
});

var router = new Router();

router.on('route:getGame', function(id) {
	var difficulty = Settings.get('difficulty');

	var selectedGame = games[id-1];
	//console.log(selectedGame);

	var gameObj = new Game(selectedGame);
	var view = new PreGameView({ model: gameObj });
	view.render();
});

router.on('route:videoView', function(id) {

    var selectedGame = games[id-1];

    var gameObj = new Game(selectedGame);
    var view = new VideoView({ model: gameObj });
    view.render();


});

router.on('route:play', function(id) {

    var selectedGame = games[id-1];

    var gameObj = new Game(selectedGame);

    if( id == 1 ){
        var view = new KuvaEtsinta({ model:gameObj });
        view.render();
    }else{
        console.log('Nothing here yet.')
    }
});


Backbone.history.start();
window.Router = Backbone.Router.extend({
	routes: {
		"" : "gameIndex",
		"game/:id": "getGame"
	},

	gameIndex: function() {
		new GameListView(games);
	}
});

var router = new Router();

router.on('route:getGame', function(id) {
	console.log('game selected with id ' + id);

	var selectedGame = games[id-1];
	console.log(selectedGame);

	var gameObj = new Game(selectedGame);
	var view = new PreGameView({model: gameObj});
	view.render();
});

Backbone.history.start();
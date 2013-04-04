window.Settings = new Settings();

window.Router = Backbone.Router.extend({
	routes: {
		"" : "gameIndex",
		"game/:id": "getGame",
        "game/:id/video": "videoView",
        "game/:id/play": "play",
        "game/:id/results" : "resultsView",
        "game/:id/results/screen" : "playedGameView"
	},

	gameIndex: function() {
		var currentUserId = getURLParameter('userId');
		if (currentUserId) {
			Settings.set({currentUserId: currentUserId});
		}

		var returnUrl = getURLParameter('returnUrl');
		if (returnUrl && returnUrl !== 'null' && returnUrl.length > 0) {
			Settings.set({returnUrl: returnUrl});
		}

		new GameListView(games);

		if (App.currentGameView != null) {
			App.currentGameView.undelegateEvents();
		}
	}

});

var router = new Router();

router.on('route:getGame', function(id) {

	var difficulty = Settings.get('difficulty');

	var selectedGame = games[id-1];
	var gameObj = new Game(selectedGame);

	if (App.preGameview === null) {
		App.preGameview = new PreGameView({ model: gameObj });
	} else {
		App.preGameview.setModel(gameObj);
	}

    new HeaderView({id:1,gameId:id});

	App.preGameview.render();
});

router.on('route:videoView', function(id) {

    var selectedGame = games[id-1];
    var gameObj = new Game(selectedGame);
    var view = new VideoView({ model: gameObj });

    new HeaderView({id:2,gameId:id});
    view.render();

});

router.on('route:play', function(id) {
	var selectedGameIndex = parseInt(id-1);
    var selectedGame = games[selectedGameIndex];
    var gameObj = new Game(selectedGame);

    console.log('route:play with id ' + id);

	if( parseInt(id) === 1 ){
        var view1 = new KuvaEtsinta({ model:gameObj });
		App.currentGameView = view1;
        view1.render();
    } else if( parseInt(id) === 2){
        var view2 = new TekstiviestiGameView({ model:gameObj });
		App.currentGameView = view2;
        view2.render();
    }else{
        $('#content').html('Nothing here yet!');
    }
});
router.on('route:resultsView', function(id) {
    //new HeaderView({id:2,gameId:id});
});
router.on('route:playedGameView', function(id) {
    $('#header').html('');

});

Backbone.history.start();
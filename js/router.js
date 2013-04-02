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
	}

});

var router = new Router();

router.on('route:getGame', function(id) {

	var difficulty = Settings.get('difficulty');

	var selectedGame = games[id-1];
	var gameObj = new Game(selectedGame);
	var view = new PreGameView({ model: gameObj });

    new HeaderView({id:1,gameId:id});
	view.render();

});

router.on('route:videoView', function(id) {

    var selectedGame = games[id-1];
    var gameObj = new Game(selectedGame);
    var view = new VideoView({ model: gameObj });

    new HeaderView({id:2,gameId:id});
    view.render();

	//$('#iframe-placeholder').html('<iframe class="center" width="1120" height="630" src="http://www.youtube.com/embed/ZKs0OZM0M9k?rel=0" frameborder="0"></iframe>');

});

router.on('route:play', function(id) {

    var selectedGame = games[id-1];
    var gameObj = new Game(selectedGame);
    if( id == 1 ){
        var view1= new KuvaEtsinta({ model:gameObj });
        view1.render();
    }else if( id == 2){
        var view2 = new TekstiviestiGameView({ model:gameObj });
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
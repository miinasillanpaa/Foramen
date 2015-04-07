window.Settings = new Settings();

window.Router = Backbone.Router.extend({
	routes: {
		"" : "gameIndex",
		"guide": "guideView",
		"game/:id": "getGame",
        "game/:id/video": "videoView",
        "game/:id/play": "play",
        "game/:id/results" : "resultsView",
        "game/:id/results/screen" : "playedGameView"
	},

	gameIndex: function() {

		new GameListView(games);

		if (App.currentGameView !== null) {
			App.currentGameView.undelegateEvents();
			App.currentGameView.unbind();
		}

		if(App.headerView === null) {
			App.headerView = new HeaderView({ id:0 });
		}else{
			App.headerView.setId(0);
		}
		App.headerView.render();
	}

});

var router = new Router();

router.on('route:guideView', function(){

	if( App.headerView === null){
		App.headerView = new HeaderView({ id: 4 });
	}else {
		App.headerView.setId(4);
	}

	App.guideView = new GuideView();

	App.guideView.render();
	App.headerView.render();
});

router.on('route:getGame', function(id) {
	var difficulty = Settings.get('difficulty');

	var selectedGame = games[id-1];
	var gameObj = new Game(selectedGame);

	if (App.preGameview === null) {
		App.preGameview = new PreGameView({ model: gameObj });
	} else {
		App.preGameview.setModel(gameObj);
	}
	App.preGameview.render();

	if( App.headerView === null ) {
		App.headerView = new HeaderView({ id:1, model:gameObj});

	}else if( App.headerView.id !== 1 ) {
		App.headerView.setId(1);
		App.headerView.setModel(gameObj);

	}
	App.headerView.render();
});

router.on('route:videoView', function(id) {
    var selectedGame = games[id-1];
    var gameObj = new Game(selectedGame);
    var view = new VideoView({ model: gameObj });
    view.render();


	if(App.headerView.id !== 3) {
		App.headerView.setId(3);
		App.headerView.setModel(gameObj);
	}
	App.headerView.render();

});

router.on('route:play', function(id) {
	var selectedGameIndex = parseInt(id-1);
    var selectedGame = games[selectedGameIndex];
    var gameObj = new Game(selectedGame);
	//preloadMoodmeter();

	var difficulty = Settings.get('difficulty');
	var difficultyLevel;
	if ( difficulty === 'easy') {
		difficultyLevel = 1;
	}else if( difficulty === 'medium' ) {
		difficultyLevel = 2;
	}else if( difficulty === 'hard' ) {
		difficultyLevel = 3;
	}else{
		difficultyLevel = 4; //joker
	}

	var gameData =  {
		'gameId' : parseInt(id),
		'gameName' : gameObj.attributes.title,
		'userId' : Settings.get('currentUserId'),
		'difficultyLevel' : difficultyLevel,
		'category' : '',
		'playerRole' : Settings.get('playerRole')
	};

	if( parseInt(id) === 1 ){

		gameData['category'] = Settings.get('category');

        var view1 = new KuvaEtsinta({ model:gameObj });
		App.currentGameView = view1;
        view1.render();

    } else if( parseInt(id) === 2){
        var view2 = new TekstiviestiGameView({ model:gameObj });
		App.currentGameView = view2;
        view2.render();

    }else if( parseInt(id) === 3){

		gameData['category'] = Settings.get('textCategory');
        var view3 = new SanojenTunnistaminen({ model: gameObj });
        App.currentGameView = view3;
        view3.render();

    }else if( parseInt(id) === 4){
        var view4 = new Sarjamuisti({ model:gameObj });
        App.currentGameView = view4;
        view4.render();

    }else if( parseInt(id) === 5){
        var view5 = new AudatiivinenInterferenssi({ model:gameObj });
        App.currentGameView = view5;
        view5.render();

    }else if( parseInt(id) === 6){
        var view6 = new KIM({ model:gameObj });
        App.currentGameView = view6;
        view6.render();

    }else if( parseInt(id) === 7){
        var view7 = new Salasana({ model:gameObj });
        App.currentGameView = view7;
        view7.render();

    }else if( parseInt(id) === 8){

		gameData['category'] = Settings.get('sudokuCategory');

        var view8 = new Sudoku({ model:gameObj });
        App.currentGameView = view8;
        view8.render();

    }else if( parseInt(id) === 9){
        var view9 = new Konstruointi({ model:gameObj });
        App.currentGameView = view9;
        view9.render();

    }else if( parseInt(id) === 10){
        var view10 = new Ristinolla({ model:gameObj });
        App.currentGameView = view10;
        view10.render();

    }else{
        $('#content').html('Nothing here yet!');
    }

	//window.saveGame(gameData);
});
router.on('route:resultsView', function(id) {
    var selectedGameIndex = parseInt(id-1);
    var selectedGame = games[selectedGameIndex];
    var gameObj = new Game(selectedGame);


	if(App.headerView === null ) {
		App.headerView = new HeaderView({ id:2, model:gameObj});

	}else if(App.headerView.id !== 2) {
		App.headerView.setId(2);
		App.headerView.setModel(gameObj);
	}
	App.headerView.render();

});
router.on('route:playedGameView', function(id) {
	if(App.headerView === null ) {
		App.headerView = new HeaderView({ id:2, model:gameObj});

	}else if(App.headerView.id !== 2) {
		App.headerView.setId(2);
		App.headerView.setModel(gameObj);
	}
	App.headerView.render();
});

Backbone.history.start();

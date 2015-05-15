var GameListView = Backbone.View.extend({
    el: $( '#content' ),
	defaults: {
		games: null
	},

    initialize: function (initGames){
        this.games = new Games(initGames);
		this.$el.html('');

		_.bindAll(this, 'render');
		var _this = this;

		this.render = _.wrap(this.render, function(render) {
				render();
				return _this;
		});

        //new HeaderView({id:0});
        //this.startedPlaying();
        this.render();

        //window.savePlayedTime();
    },

    render: function() {
		var self = this;
		this.games.forEach(function(item, key) {
			self.renderGame(item);
		});
    },

    renderGame: function(item) {
        var gameView = new GameView({
            model: item
        });
        
        this.$el.append( gameView.render().el );
    }

    // startedPlaying: function() {
    //     var today = new Date();
    //     var started = Settings.get('startedPlaying');
    //     if(started === null){
    //         //no start time found, reset time played
    //         Settings.set({'startedPlaying': today});
    //     }else if(today.getDate() !== started.getDate()) {
    //         //date is different, reset time played
    //         Settings.set({'startedPlaying': today});
    //     }
    // }

});

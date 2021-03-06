var GameListView = Backbone.View.extend({
    el: $( '#content' ),
	defaults: {
		games: null
	},

    initialize: function (initGames){

        $('#header').show();

        this.games = new Games(initGames);
		this.$el.html('');

		_.bindAll(this, 'render');
		var _this = this;

		this.render = _.wrap(this.render, function(render) {
				render();
				return _this;
		});

        this.render();

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

});

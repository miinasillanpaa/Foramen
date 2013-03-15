var GameListView = Backbone.View.extend({
    el: $( '#content' ),

	defaults: {
		games: null
	},

    initialize: function (initGames){
        this.games = new Games(initGames);
		this.$el.html('');

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
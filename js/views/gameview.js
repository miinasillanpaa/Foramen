var GameView = Backbone.View.extend({
    tagName: 'div',
    className: 'game-item span2 rounded',
    template: '#gameTemplate',

	events: {
		'click #select-game': 'selectGame'
	},

    render: function() {
		var variables = {title: this.model.get('title'), coverImage: this.model.get('coverImage')};

		var template = _.template( $(this.template).html(), variables );

        this.$el.html(template);
        return this;
    },

	selectGame: function() {
		router.navigate('game/' + this.model.get('gameId'), { trigger: true });
	}
});
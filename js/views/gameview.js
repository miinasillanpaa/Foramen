var GameView = Backbone.View.extend({
    tagName: 'div',
    className: 'game-item rounded',
    template: '#gameTemplate',



	events: {
        'click': 'selectGame'
	},

    render: function() {
        console.log(this.$el);
		var variables = {
                        title: this.model.get('title'),
                        coverImage: this.model.get('coverImage'),
                        guide: this.model.get('guide')
                        };

		var template = _.template( $(this.template).html(), variables );

        this.$el.html(template);
        return this;
    },

	selectGame: function() {
        console.log('hep');
        router.navigate('game/' + this.model.get('gameId'), true);
    }
});
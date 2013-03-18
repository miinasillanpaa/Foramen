var PreGameView = Backbone.View.extend({
	el: $( '#content' ),
	template: '#preGameTemplate',

	render: function() {
		//console.log(this.model);

		var variables = {title: this.model.get('title'), guide: this.model.get('guide') };

		var template = _.template( $(this.template).html(), variables );

        var header = new HeaderView({id:1});
		this.$el.html(template);
		return this;
	},

    events: {
        'click .easy' : 'easySelected',
        'click .medium' : 'mediumSelected',
        'click .hard' : 'hardSelected',
        'click .preview' : 'previewVideo',
        'click .play' : 'play'

    },

    easySelected: function() {
        $('.easy').addClass('btn-success');
        $('.medium').removeClass('btn-warning');
        $('.hard').removeClass('btn-danger');
    },
    mediumSelected: function() {
        $('.medium').addClass('btn-warning');
        $('.easy').removeClass('btn-success');
        $('.hard').removeClass('btn-danger');
    },
    hardSelected: function() {
        $('.hard').addClass('btn-danger');
        $('.easy').removeClass('btn-success');
        $('.medium').removeClass('btn-warning');
    },
    previewVideo: function() {
         var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId + '/video', true);
    },
    play: function() {
        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId + '/play', true);
    }
});
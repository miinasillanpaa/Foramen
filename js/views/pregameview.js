var PreGameView = Backbone.View.extend({
	el: $( '#content' ),
	template: '#preGameTemplate',

	render: function() {
		//console.log(this.model);

		var variables = {title: this.model.get('title'),
                         guide: this.model.get('guide'),
                         difficulty: this.model.get('difficulty') };

		var template = _.template( $(this.template).html(), variables );

        new HeaderView({id:1});
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

        this.model.set({'difficulty':'easy'});

    },

    mediumSelected: function() {
        $('.medium').addClass('btn-warning');
        $('.easy').removeClass('btn-success');
        $('.hard').removeClass('btn-danger');

        this.model.set({'difficulty':'medium'});

    },

    hardSelected: function() {
        $('.hard').addClass('btn-danger');
        $('.easy').removeClass('btn-success');
        $('.medium').removeClass('btn-warning');

        this.model.set({'difficulty':'hard'});

    },

    previewVideo: function() {
         var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId + '/video', true);
    },

    play: function() {
        var difficulty = this.model.get('difficulty');
        console.log('pregameview diff: ' + difficulty);
        // this.model.save();
        var gameId = this.model.get('gameId');

        router.navigate('game/' + gameId + '/play', true);

    }
});
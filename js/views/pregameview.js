var PreGameView = Backbone.View.extend({
	el: $( '#content' ),
	template: '#preGameTemplate',

	render: function() {
        var gameId = this.model.get('gameId');
		if( gameId === 1 ){
            this.preload('kalat');
        }else if ( gameId = 9){
            this.preload('konstruktio');
        }

		var variables = {title: this.model.get('title'),
                         guide: this.model.get('guide'),
                         difficulty: Settings.get('difficulty') };

		var template = _.template( $(this.template).html(), variables );

		this.$el.html(template);

        var diff = Settings.get('difficulty');
        if(diff === 'easy'){
            this.easySelected();
        }else if(diff === 'medium'){
            this.mediumSelected();
        }else{
            this.hardSelected();
        }

	},

    events: {
        'click .easy' : 'easySelected',
        'click .medium' : 'mediumSelected',
        'click .hard' : 'hardSelected',
        'click .preview' : 'previewVideo',
        'click #play-game' : 'play'
    },

    easySelected: function() {

        $('.easy').addClass('btn-success');
        $('.medium').removeClass('btn-warning');
        $('.hard').removeClass('btn-danger');
		Settings.set({difficulty: 'easy'});

    },

    mediumSelected: function() {

        $('.medium').addClass('btn-warning');
        $('.easy').removeClass('btn-success');
        $('.hard').removeClass('btn-danger');
		Settings.set({difficulty: 'medium'});
    },

    hardSelected: function() {

        $('.hard').addClass('btn-danger');
        $('.easy').removeClass('btn-success');
        $('.medium').removeClass('btn-warning');
		Settings.set({difficulty: 'hard'});
    },

    previewVideo: function() {
         var gameId = this.model.get('gameId');
         router.navigate('game/' + gameId + '/video', true);
    },

    play: function() {
		console.log('play button clicked!');
        var gameId = this.model.get('gameId');

		router.navigate('game/' + gameId + '/play', {trigger: true});

    },

    preload: function(category) {

        var category = category;
        var preload = [];
        var img;
        if(category === 'konstruktio'){
            for(var j=0;j<12;j++){
                img = './pics/' + category + '/' + j + '.png';
                preload.push(img);
            }
        }else{
            for(var i=1;i<21;i++){
                img = './pics/' + category + '/' + i + '.png';
                preload.push(img);
            }
        }
        $(preload).preload();
        //console.log(preload + ' preloaded')
    },

	setModel: function(model) {
		this.model = model;
	}
 });
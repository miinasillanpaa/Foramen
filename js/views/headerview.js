var HeaderView = Backbone.View.extend({
   el: '#header',

    template0: '#mainHeaderTmpl',
    template1: '#backHeaderTmpl',
    template2: '#historyBackTmpl',


    initialize: function () {
    },

    render: function () {
		var template;
		var variables;
		var self = this;
		if(parseInt(this.id) === 0){

			//local session lenght
			var started = Settings.get('startedPlaying');
			var now = new Date();
			var sessionTime = ( now.getTime() - started.getTime() )/1000;
			Settings.set({'sessionTime': sessionTime});

			template = _.template( $(self.template0).html(), variables);
			this.$el.html(template);

			//getting played time from backend and showing it in header
			window.getPlayedTime();

			
			//$('#header').html('<h1 class="text-center">Ladataan...</h1>');


			/*setTimeout(function(){
				if(Settings.get('playedTimeMS') !== null){
					var totalTime = Settings.get('playedTimeMS') + sessionTime;
					var hours = Math.floor(totalTime / 3600) % 24;
					var minutes = Math.floor(totalTime / 60) % 60;

					variables = { playedTime: hours + "h " + minutes +"min"}; 
					template = _.template( $(self.template0).html(), variables);
					self.$el.html(template);
				}else{
					variables = { playedTime: "Ei tiedossa"}; 
					template = _.template( $(self.template0).html(), variables);
					self.$el.html(template);
				}
			},500) */

			//$('.toggle-player').text(Settings.get('playerRole'));

		}else if(parseInt(this.id) === 3){
			variables  = { title: this.model.attributes.title };
			template = _.template( $(this.template2).html(), variables);
			this.$el.html(template);

		}else{
			variables  = { title: this.model.attributes.title };
			template = _.template( $(this.template1).html(), variables);
			this.$el.html(template);

			//$('.toggle-player').text(Settings.get('playerRole'));
		}

    },


    events: {
        'click .back-root' : 'goRoot',
		'click #back-button': 'goBackToService',
        'click .back-setup' : 'goToGameSetup',
        'click .back-history' : 'historyBack'
		//'click .toggle-player' : 'togglePlayer'
    },

    goRoot: function() {
        router.navigate('/', {trigger: true });
    },

    goToGameSetup: function() {
        router.navigate('game/' + this.options.gameId, {trigger: true});
    },

    historyBack: function () {
      window.history.back();
    },

	/*togglePlayer: function () {
		var target = $(event.target);
		if(target.text() == 'Kuntoutuja') {
			Settings.set({'playerRole':'Läheinen'});
			target.text('Läheinen')
		}else{
			Settings.set({'playerRole':'Kuntoutuja'});
			target.text('Kuntoutuja');
		}
	}, */

	goBackToService: function() {
		//navigating back to mobile-site is handled in callback
		window.savePlayedTime();
	},
	setModel: function(model) {
		this.model = model;
	},

	setId: function(id){
		this.id = id;
	}


});
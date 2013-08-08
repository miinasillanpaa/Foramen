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

		if(parseInt(this.id) === 0){
			template = _.template( $(this.template0).html() );
			this.$el.html(template);

			$('#toggle-player').text(Settings.get('playerRole'));

		}else if(parseInt(this.model.id) === 3){
			variables  = { title: this.model.attributes.title };
			template = _.template( $(this.template2).html(), variables);
			this.$el.html(template);

		}else{
			variables  = { title: this.model.attributes.title };
			template = _.template( $(this.template1).html(), variables);
			this.$el.html(template);
		}

    },


    events: {
        'click .back-root' : 'goRoot',
		'click #back-button': 'goBackToService',
        'click .back-setup' : 'goToGameSetup',
        'click .back-history' : 'historyBack',
		'click #toggle-player' : 'togglePlayer'
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

	togglePlayer: function () {
		var target = $(event.target);
		if(target.text() == 'Kuntoutuja') {
			Settings.set({'playerRole':'Läheinen'});
			target.text('Läheinen')
		}else{
			Settings.set({'playerRole':'Kuntoutuja'});
			target.text('Kuntoutuja');
		}
	},

	goBackToService: function() {
		var userId = Settings.get('currentUserId');
		var returnUrl = Settings.get('returnUrl');

		window.location = returnUrl + userId;
	},
	setModel: function(model) {
		this.model = model;
	},

	setId: function(id){
		this.id = id;
	}


});
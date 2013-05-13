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
        console.log(this.id);
        if(parseInt(this.id) === 0){

            template = _.template( $(this.template0).html());
            this.$el.html(template);
            return this;

        }else if(parseInt(this.id) === 3){
            variables  = { title: this.options.gameObj.attributes.title };
            template = _.template( $(this.template2).html(), variables);
            this.$el.html(template);
            return this;

        }else{

            variables  = { title: this.options.gameObj.attributes.title };
            template = _.template( $(this.template1).html(), variables);
            this.$el.html(template);
            return this;
        }
    },

    events: {
        'click .back-root' : 'goRoot',
		'click #back-button': 'goBackToService',
        'click .back-setup' : 'goToGameSetup',
        'click .back-history' : 'historyBack'
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

	goBackToService: function() {
		var userId = Settings.get('currentUserId');
		var returnUrl = Settings.get('returnUrl');

		window.location = returnUrl + userId;
	}


});
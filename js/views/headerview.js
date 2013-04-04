var HeaderView = Backbone.View.extend({
   el: '#header',

    template0: _.template($('#mainHeaderTmpl').html()),
    template1: _.template($('#backHeaderTmpl').html()),


    initialize: function () {
        this.render();
    },

    render: function () {
        //console.log(this);
        if(this.id == 0){
            this.$el.html(this.template0);
            return this;

        }else if(this.id == 2){
            this.$el.html(this.template1);
            //this.$el.find('button').removeClass('back-root');
            //this.$el.find('button').addClass('back-setup');
            return this;


        }else{
            this.$el.html(this.template1);
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
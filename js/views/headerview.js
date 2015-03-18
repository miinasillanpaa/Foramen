var HeaderView = Backbone.View.extend({
   el: '#header',

    template0: '#mainHeaderTmpl',
    template1: '#backHeaderTmpl',
    template2: '#historyBackTmpl',

    render: function () {
		var template;
		var variables;
		var self = this;
		if (parseInt(this.id) === 0) {

			template = _.template( $(self.template0).html(), variables);
			this.$el.html(template);

		}else if (parseInt(this.id) === 3) {

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

	setModel: function(model) {
		this.model = model;
	},

	setId: function(id){
		this.id = id;
	}


});

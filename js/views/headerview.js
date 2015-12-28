var HeaderView = Backbone.View.extend({
   el: '#header',

    template0: '#mainHeaderTmpl',
    template1: '#backHeaderTmpl',
    template2: '#historyBackTmpl',
    template3: '#plainHeaderTmpl',
    template4: '#titleHeaderTmpl',

    render: function () {
		var template;
		var variables;
		var self = this;

		if (parseInt(this.id) === 0) {

			template = _.template( $(self.template0).html(), {isPotpuriGame: Settings.get('isPotpuriGame')} );
			this.$el.html(template);

		}else if (parseInt(this.id) === 3) {

			variables  = { title: this.model.attributes.title, showRecipe: false, isPotpuriGame: Settings.get('isPotpuriGame') };
			template = _.template( $(this.template2).html(), variables);
			this.$el.html(template);

        }else if(parseInt(this.id) === 4) {

            variables = { title: 'Taustaa ja resepti', showRecipe: true, isPotpuriGame: Settings.get('isPotpuriGame') };
            template = _.template( $(this.template2).html(), variables);
			this.$el.html(template);

        }else if (parseInt(this.id) === 5) {
            template = _.template( $(this.template3).html());
            this.$el.html(template);

        }else if (parseInt(this.id) === 6) {
            template = _.template( $(this.template4).html());
            this.$el.html(template);

        }else{
			variables  = { title: this.model.attributes.title, isPotpuriGame: Settings.get('isPotpuriGame') };
			template = _.template( $(this.template1).html(), variables);
			this.$el.html(template);
		}

    },


    events: {
        'click .back-root' : 'goRoot',
        'click .back-setup' : 'goToGameSetup',
        'click .back-history' : 'historyBack',
        'click .show-guide': 'showGuide',
        'click .startPotpuri': 'startPotpuri'
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
	},

    showGuide: function(){
        router.navigate('/guide', {trigger: true});
    },

    startPotpuri: function(ev){
        var reset = $(ev.currentTarget).data('reset');

        if (reset) {
            Settings.set({'potpuriId': null});
            Settings.set({'potpuriProgressIndex': 0});
        }

        router.navigate('/potpuri', true);
    }

});

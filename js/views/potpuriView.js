var PotpuriView = Backbone.View.extend({

    template: '#potpuriTemplate',
    className: 'game-item rounded',
    events: {
        'click': 'selectPotpuri'
	},

    render: function(){
        var vars = {
            title: this.model.get('title'),
            icon: this.model.get('icon'),
            lead: this.model.get('lead')
        };

		var template = _.template( $(this.template).html(), vars);

        this.$el.html(template);
        return this;
    },

    selectPotpuri: function(){
        console.log('selecting potprui', this.model.get('potpuriId'));
        router.navigate('potpuri/' +this.model.get('potpuriId'), true);
    }

});

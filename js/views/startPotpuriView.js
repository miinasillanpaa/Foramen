var StartPotpuriView = Backbone.View.extend({

    el: $("#content"),
    defaults: {
        potpuris: null
    },

    initialize: function(potpuris) {
        console.log('startPotpuriView init', potpuris);

        this.potpuris = new Potpuris(potpuris);
        this.$el.html('');
        this.render();
    },

    render: function() {
        var self = this;
        this.potpuris.forEach(function(potpuri){
            self.renderPotpuri(potpuri);
        });

    },

    renderPotpuri: function(potpuri) {

        var potpuriView = new PotpuriView({model: potpuri});

        this.$el.append( potpuriView.render().el );
    }

});

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

        var introEl = '<div class="lead mikstuura-lead">Tiedonkäsittelytoimintojen harjoittelussa - kuten kaikessa muussakin treenaamisessa - on monipuolisuus valttia! FORAMENCognitiveTablet –ohjelmistosta on sekoiteltu kolme mikstuuraa, joihin on koottu monipuolinen seos harjoitteita edistämään ja ylläpitämään tarkkaavuutta, muistitoimintoja, toiminnanohjausta ja ongelmanratkaisukykyä sekä näönvaraista hahmottamista. Nauti mikstuuroja 2-5 kertaa viikossa.</div>'

        this.$el.prepend( introEl );

    },

    renderPotpuri: function(potpuri) {

        var potpuriView = new PotpuriView({model: potpuri});
        this.$el.append( potpuriView.render().el );
    }

});

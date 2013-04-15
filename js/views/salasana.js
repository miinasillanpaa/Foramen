var Salasana = Backbone.View.extend({
    el: $(' #content '),
    template: '#salasanaTemplate',

    render: function () {

        var serials = this.createSerial();

        var template = _.template( $(this.template).html() ) ;
        this.$el.html(template);
        return this;
    },

    createSerial: function() {
        var difficulty = Settings.get('difficulty');
        var serials = Settings.get('salasanat');

        if(difficulty === 'easy' ){

            var easy = serials.easy;
            var random = Math.floor(Math.random() * easy.length);
            console.log(easy[random]);

        }else if(difficulty === 'medium'){

        }else{

        }
    }
});
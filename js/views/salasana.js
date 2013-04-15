var Salasana = Backbone.View.extend({
    el: $(' #content '),
    template: '#salasanaTemplate',

    render: function () {

        $('#header').empty();

        var serial = this.createSerial();
        Settings.set({serial:serial});

        var template = _.template( $(this.template).html() ) ;
        this.$el.html(template);

    },

    events : {
        'click .submit' : 'checkGuess'
    },

    createSerial: function() {
        var difficulty = Settings.get('difficulty');
        var serials = Settings.get('salasanat');

        if(difficulty === 'easy' ){

            var easy = serials.easy;
            var random = Math.floor(Math.random() * easy.length);
            return easy[random];

        }else if(difficulty === 'medium'){

        }else{

        }
    },

    checkGuess: function () {
        console.log('check');
        var guess = $('.serial-input').val().toUpperCase();
        $('.guesses').append('<p>'+guess+'</p>');
        $('.serial-input').val('');
        $('.serial-input').focus();





    }



});
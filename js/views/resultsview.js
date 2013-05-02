var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {

        $('#header').show();

        var myView = this;
        console.log(this);
        var difficulty = '';
        if( this.options.results.difficulty == 'easy' ){
            difficulty = 'Taso I';
        }else if( this.options.results.difficulty == 'medium' ){
            difficulty = 'Taso II';
        }else{
            difficulty = 'Taso III';
        }

        var  results = {
                         pvm : this.options.results.pvm,
                         klo : this.options.results.klo,
                         difficulty : difficulty,
                         data : this.options.results.data,
                         hiddenData : this.options.results.hiddenData,
                         title : this.model.get('title'),
                         gameId : this.model.get('gameId')
        };


        var template = _.template( $(this.template).html(), results  );
        this.$el.html(template);

        $('.back-root').click( function() {
            myView.undelegateEvents();

        });

        $('#content').css('overflow-y','scroll');

        return this;
    },

    events:{
        'click .screen' : 'viewSnapshot',
        'click .new-game' : 'startNewGame'
    },

    viewSnapshot: function () {

        this.undelegateEvents();

        var difficulty = '';
        if( this.options.results.difficulty == 'easy' ){
            difficulty = 'Helppo';
        }else if( this.options.results.difficulty == 'medium' ){
            difficulty = 'Keskivaikea';
        }else{
            difficulty = 'Vaikea';
        }

        var  results = {
            pvm : this.options.results.pvm,
            klo : this.options.results.klo,
            difficulty : difficulty,
            data : this.options.results.data,
            hiddenData : this.options.results.hiddenData,
            title : this.model.get('title'),
            gameId : this.model.get('gameId')
        };

        if(this.model.get('gameId') === 1 ){
            var view = new PlayedGameView({ model: this.model, results: results });
            view.render();
            router.navigate('game/' + this.model.get('gameId') + '/results/screen', true);
        }
    },

    startNewGame: function () {
        Settings.set({results:[]});
        this.undelegateEvents();
        //this.unbind();
        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId + '/play', {trigger: true});


    }


});
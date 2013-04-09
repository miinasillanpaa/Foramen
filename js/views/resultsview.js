var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {

        var myView = this;

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

        new HeaderView({id:2});
        var template = _.template( $(this.template).html(), results  );
        this.$el.html(template);

        $('.back-root').click( function() {
            myView.undelegateEvents();

        });

        return this;
    },

    events:{
        'click .screen' : 'viewSnapshot'
    },

    viewSnapshot: function () {

        this.undelegateEvents();

        console.log('view snapshot');
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


        var view = new PlayedGameView({ model: this.model, results: results });
        view.render();

       router.navigate('game/' + this.model.get('gameId') + '/results/screen', true);

    }


});
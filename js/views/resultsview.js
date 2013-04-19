var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {

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

        new HeaderView({id:2});
        var template = _.template( $(this.template).html(), results  );
        this.$el.html(template);

        $('.back-root').click( function() {
            myView.undelegateEvents();

        });

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


        var view = new PlayedGameView({ model: this.model, results: results });
        view.render();

       router.navigate('game/' + this.model.get('gameId') + '/results/screen', true);

    },

    startNewGame: function () {
        Settings.set({results:[]});
        this.undelegateEvents();
        this.unbind();
        var gameId = this.model.get('gameId');


        if( gameId === 1 ){
            router.navigate('game/' + gameId + '/play', {trigger: true});

        } else if( gameId === 2){
            var view2 = new TekstiviestiGameView({ model:this.model });
            router.navigate('game/' + gameId);
            view2.render();

        }else if( gameId === 3){
            var view3 = new SanojenTunnistaminen({ model:this.model });
            router.navigate('game/' + gameId);
            view3.render();

        }else if( gameId === 4){
            var view4 = new Sarjamuisti({ model:this.model });
            router.navigate('game/' + gameId);
            view4.render();

        }else if( gameId === 6){
            var view8 = new KIM({ model:this.model });
            router.navigate('game/' + gameId);
            view8.render();

        }else if( gameId === 7){
            var view7 = new Salasana({ model:this.model });
            router.navigate('game/' + gameId);
            view7.render();

        }else if( gameId === 9){
            var view9 = new Konstruointi({ model:this.model });
            router.navigate('game/' + gameId);
            view9.render();

        }
    }


});
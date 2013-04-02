var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {
        console.log(this.model.get('gameId'));

        var difficulty = '';
        if( this.options.results.difficulty == 'easy' ){
            difficulty = 'Helppo';
        }else if( this.options.results.difficulty == 'medium' ){
            difficulty = 'Keskivaikea';
        }else{
            difficulty = 'Vaikea';
        }

        //todo: Palaute: verrataan samalla tasolla (I, II, III) pelattujen keskiarvoon. Lisäksi: HIENOA! Teit parhaan
        // tuloksesi! tai Paransit ennätystäsi! kommentti olisi kannustava


        var  variables = {
                         pvm : this.options.results.pvm,
                         klo : this.options.results.klo,
                         difficulty : difficulty,
                         time : this.options.results.timeSpent,
                         targets : this.options.results.targets,
                         correct : this.options.results.correct,
                         wrong : this.options.results.wrong,
                         missing : this.options.results.missing,
                         allWrongs : this.options.results.allWrongs,
                         gameScreen : this.options.results.gameScreen,

                         title : this.model.get('title'),
                         gameId : this.model.get('gameId')
        };



        new HeaderView({id:2});
        var template = _.template( $(this.template).html(), variables  );
        this.$el.html(template);
        //$('.testi').html(this.options.results.gameScreen);
        return this;

    },

    events:{
        'click .screen' : 'viewSnapshot'
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

        var  variables = {
            pvm : this.options.results.pvm,
            klo : this.options.results.klo,
            difficulty : difficulty,
            timeSpent : this.options.results.timeSpent,
            targets : this.options.results.targets,
            correct : this.options.results.correct,
            wrong : this.options.results.wrong,
            missing : this.options.results.missing,
            allWrongs : this.options.results.allWrongs,
            gameScreen : this.options.results.gameScreen,

            title : this.model.get('title'),
            gameId : this.model.get('gameId')
        };


        var view = new PlayedGameView({ model: this.model, variables: variables })
        view.render();

       router.navigate('game/' + this.model.get('gameId') + '/results/screen', true);

    }


});
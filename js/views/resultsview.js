var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {

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
                         time : this.options.results.timeSpent,
                         targets : this.options.results.targets,
                         correct : this.options.results.correct,
                         wrong : this.options.results.wrong,
                         missing : this.options.results.missing,
                         allWrongs : this.options.results.allWrongs,

                         title : this.model.get('title')
        };


        new HeaderView({id:1});
        var template = _.template( $(this.template).html(), variables  );
        this.$el.html(template);
        return this;

    }


});
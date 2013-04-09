var PlayedGameView = Backbone.View.extend({
    el: $( '#content' ),

    render: function () {


        $('#header').html('');

        console.log(this);

        $('#content').empty();
        $('#content').html(this.options.results.hiddenData.gameScreen);

        $('.quit').hide();
        $('.finish').hide();

        $('#content').append("<button class='btn btn-large bottom-left toResults'><i class='icon-chevron-left'></i> Takaisin</button>")

    },
    events: {
        'click .toResults' : 'toResults'
    },

    toResults : function () {

        this.undelegateEvents();

        router.navigate( '/game/' + this.options.results.gameId + '/results', true );
        var view = new ResultsView({ model: this.model, results: this.options.results });
        new HeaderView({id:2, gameId: this.options.results.gameId });
        view.render();
    }
});
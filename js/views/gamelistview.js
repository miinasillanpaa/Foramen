var GameListView = Backbone.View.extend({
    el: $( '#content' ),

    initialize: function (initGames){
        this.collection = new Games(initGames);
        this.render();
    },

    render: function() {
        _.each( this.collection.models, function( item ){
            this.renderGame( item );
        }, this);
    },

    renderGame: function( item ) {
        var gameView = new GameView({
            model: item
        });
        this.$el.append( gameView.render().el );
    }
});
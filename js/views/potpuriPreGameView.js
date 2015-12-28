var PotpuriPreGameView = Backbone.View.extend({
    el: $("#content"),
    template: '#potpuriPreGameTemplate',
    events: {
        'click .goNext': 'goNext',
        'click .goBeginning': 'goBeginning'
    },

    render: function(){

        $('#header').show();

        var potpuri = potpuris[Settings.get('potpuriId')-1];


        var vars = {
            title: this.model.get('title'),
            exerciseTarget: this.model.get('exerciseTarget'),
            progressIndex: Settings.get('potpuriProgressIndex')+1,
            potpuriLength: potpuri.gamesArray.length,
            potpuriId: Settings.get('potpuriId')
        };
        var template = _.template( $(this.template).html(), vars );
        this.$el.html(template);

        return this;
    },

    goNext: function(){
        this.undelegateEvents();

        var gameId = this.model.get('gameId');
        router.navigate('game/'+gameId, true);
    },

    goBeginning: function(){

        //reset
        Settings.set({'potpuriId': null});
        Settings.set({'potpuriProgressIndex': 0});
        router.navigate('/potpuri', true);

    }

});

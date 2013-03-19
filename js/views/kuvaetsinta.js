var KuvaEtsinta = Backbone.View.extend({
    el: $( "#content" ),
    template: '#kuvaEtsintaTemplate',

    render: function () {

        //remove headerview
        $('#header').html('');


        //TODO: measure time
        var startTime = new Date().getTime();

        console.log('kuvaetsinta diff: ' + this.model.get('difficulty'));

        var category = 'kalat';
        var random = Math.floor((Math.random()*20)+1);
        var targetPic = './pics/'+category+'/'+random+'.png';

        //TODO: KAlapelissä yht. 54 kalaa joista 18 oikeita vastauksia, joka kolmas on targettikala
        var arr = [];
        for(i=0; i<32; i++) {
            var random = Math.floor((Math.random()*20)+1);
            var itemPic = './pics/'+category+'/'+random+'.png';

            var obj= {itemPic:itemPic};

            arr.push(obj);
            //console.log(arr);
        }
        //var myArr = JSON.stringify(arr);
        //console.log(myArr);

       // _.each(arr.itemPic, function(itemPic){});


        var variables = {targetPic: targetPic, myArr: arr };
        //console.log(variables);
        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);

        return this;

    },

    renderEasyGame: function() {

    },

    renderMediumGame: function() {

    },

    renderHardGame: function() {

    },

    events: {
        'click .selectable' : 'selectItem',
        'click .finish' : 'gameFinish',
        'click .quit' : 'quitGame'
    },

    selectItem: function () {
        var $target = $(event.target);
        $target.toggleClass('selected');
    },

    quitGame: function () {
        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, true);
    },

    gameFinish: function () {
        //TODO : gather results

        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId + '/results', true);


    }




});
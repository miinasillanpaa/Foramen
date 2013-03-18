var KuvaEtsinta = Backbone.View.extend({
    el: $( "#content" ),
    template: '#kuvaEtsintaTemplate',

    render: function () {

        //remove headerview
        $('#header').html('');

        var category = 'kalat';
        var random = Math.floor((Math.random()*20)+1);
        var targetPic = './pics/'+category+'/'+random+'.png';

        //TODO: KAlapelissä yht. 54 kalaa joista 18 oikeita vastauksia
        var arr = [];
        for(i=0; i<14; i++) {
            var random = Math.floor((Math.random()*20)+1);
            var itemPic = './pics/'+category+'/'+random+'.png';
            var obj= {itemPic:itemPic};

            arr.push(obj);

        }
        var myArr = JSON.stringify(arr);
        console.log(myArr);




        var variables = {targetPic: targetPic, arr: myArr};
        //console.log(variables);
        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);

        return this;

    }



});
var PotpuriEndedView = Backbone.View.extend({
    el: $('#content'),
    template: '#potpuriEndedTemplate',

    events: {
        'click .goBeginning': 'goBeginning'
    },

    render: function(){

        $('#header').show();

        var template = _.template($(this.template).html());
        this.$el.html(template);
        return this;

    },

    goBeginning: function(){
        router.navigate('/potpuri', true);
    }

});

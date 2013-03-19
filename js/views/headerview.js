var HeaderView = Backbone.View.extend({
   el: '#header',

    template0: _.template($('#mainHeaderTmpl').html()),
    template1: _.template($('#gameHeaderTmpl').html()),



    initialize: function () {
        this.render();
    },

    render: function () {
        if(this.id === 0){
            this.$el.html(this.template0);
            return this;
        }else{
            this.$el.html(this.template1);
            return this;
        }
    },
    events: {
        'click .back' : 'goBack'
    },

    goBack: function() {
        router.navigate('/', true);
    }


});
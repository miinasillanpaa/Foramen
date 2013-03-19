var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {
        var variables = { title: this.model.get('title')

                        };

        new HeaderView({id:1});
        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);
        return this;

    }


});
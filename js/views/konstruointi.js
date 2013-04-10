var Konstruointi = Backbone.View.extend({
   el: $('#content'),
   template: '#konstruointiTemplate',

    render: function () {
        $('#header').empty();

        var template = _.template($(this.template).html());
        this.$el.html(template);
        return this;

    }
});
var GameView = Backbone.View.extend({
    tagName: 'div',
    className: 'game-item span2 rounded',
    template: $( '#gameTemplate' ).html(),

    render: function() {
        var tmpl = _.template(this.template);
        this.$el.html( tmpl( this.model.toJSON() ) );
        return this;
    }
});
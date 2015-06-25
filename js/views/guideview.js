var GuideView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#guideTemplate',

    render: function() {

		var template = _.template( $(this.template).html());
		this.$el.html(template);

        return this;
    }


});

var GuideView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#guideTemplate',

    render: function() {

        var vars = {guide: "Here be dragons"};

		var template = _.template( $(this.template).html(), vars);
		this.$el.html(template);

        return this;
    }


});

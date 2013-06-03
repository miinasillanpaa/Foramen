var VideoView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#videoTemplate',

    render: function() {

        var video = { video: this.model.get('video') };

		var template = _.template( $(this.template).html(), video);
		this.$el.html(template);

        return this;
    }


});

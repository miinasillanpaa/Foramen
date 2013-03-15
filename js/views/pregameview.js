var PreGameView = Backbone.View.extend({
	el: $( '#content' ),
	template: '#preGameTemplate',

	render: function() {
		console.log(this.model);

		var variables = {title: this.model.get('title')};

		var template = _.template( $(this.template).html(), variables );

		this.$el.html(template);
		return this;
	}
});
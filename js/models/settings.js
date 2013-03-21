var Settings = Backbone.Model.extend({
	defaults: {
		currentUserId: '',
		returnUrl: 'https://pienipiiri.fi/mobile/?userId=',
		difficulty: 'easy'
	},

	initialize: function() {

	}
});

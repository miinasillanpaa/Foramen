var Session = Backbone.Model.extend({
	defaults: {
		token: null,
		userId: null,
		gameId: null,
		difficultyLevel: 'easy',
		gameSessionStarted: null,
		gameSessionEnded: null,
		exampleWatched: false,
		score: null,
		data: null
	},

	url: 'http://localhost/trackEvent'
});
var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {

        $('#header').show();
		clearInterval(App.knobTimer);

        var myView = this;
        var difficulty, difficultyLevel;
        if( this.options.results.difficulty == 'easy' ){
            difficulty = 'Taso I';
			difficultyLevel = 1;
        }else if( this.options.results.difficulty == 'medium' ){
            difficulty = 'Taso II';
			difficultyLevel = 2;
        }else if( this.options.results.difficulty == 'hard' ){
            difficulty = 'Taso III';
			difficultyLevel = 3;
        }else if( this.options.results.difficulty == 'joker' ){
            difficulty = 'Jokeri';
			difficultyLevel = 4;
        }

        var  results = {
                         pvm : this.options.results.pvm,
                         klo : this.options.results.klo,
                         difficulty : difficulty,
                         data : this.options.results.data,
                         hiddenData : this.options.results.hiddenData,
                         title : this.model.get('title'),
                         gameId : this.model.get('gameId')
        };


		var score = {};
		for(i=0; i< results.data.length; i++) {
			if(results.data[i].name === ""){
				//strips the show screen thingys
			}else{
				var name = results.data[i].name;
				var chopd = name.substring(0,name.length-1);
				score[chopd] = results.data[i].value;
			}
		}

		Settings.set({'score':score});
		if( !this.options.fromPlayedGameView ) {
			window.saveGameEnd();
		}

		function keyAt(obj, index) {
			var i = 0;
			for (var key in obj) {
				if ((index || 0) === i++) return key;
			}
		}

		//console.log(score);

		var userId = Settings.get('currentUserId');
		var gameId = this.model.get('gameId');

		$.get( 'http://stage.pienipiiri.fi/frGetScores?userId='+userId+'&difficultyLevel='+difficultyLevel+'&gameId='+gameId,
			function(data) {
				console.log(data);

				var i,key,val,len;
				var elem = $(".record-well");

				//best _score per _game per _difficulty per _user
				//todo fetch the BEST result of the game and show it to user
				//todo also compare if just played result was the best

				if ( data.length !== 0 ) {
					console.log('show record from db');
					$(".record-box").addClass('alert-info').text("Hyvä suoritus!");
					len = Object.keys(data).length;
					for(i=0; i<len; i++) {

						key = keyAt(data, i);
						val = data[key];

						elem.find(".results.pull-left").append( '<p>'+key+'</p>' );
						elem.find(".results.align-right").append( '<p>'+val+'</p>' );

					}
				}else{
					console.log('show result of just played game, no data from db');
					$(".record-box").addClass('alert-success').text("Paransit omaa ennätystäsi!");
					len = Object.keys(score).length;
					for(i=0; i<len; i++) {

						key = keyAt(score, i);
						val = score[key];

						elem.find(".results.pull-left").append( '<p>'+key+'</p>' );
						elem.find(".results.align-right").append( '<p>'+val+'</p>' );

					}
				}
			},'json'
		);

        var template = _.template( $(this.template).html(), results );
        this.$el.html(template);

		if( Settings.get('showFeedbackModal') === true) {
			if ( !this.options.fromPlayedGameView ) {
				this.showModal();
			}
		}

		$('.back-root').click( function() {
            myView.undelegateEvents();
        });

        $('#content').css('padding-bottom','50px');
        $('#content').css('overflow-y','auto');

        return this;
    },

    events:{
        'click .screen' : 'viewSnapshot',
        'click .new-game' : 'startNewGame',
		'click .btn-feedback' : 'showModal'
    },

    viewSnapshot: function () {

        this.undelegateEvents();

        var  results = {
            pvm : this.options.results.pvm,
            klo : this.options.results.klo,
            difficulty : this.options.results.difficulty,
            data : this.options.results.data,
            hiddenData : this.options.results.hiddenData,
            title : this.model.get('title'),
            gameId : this.model.get('gameId')
        };


        if( this.model.get('gameId') === 1 || this.model.get('gameId') === 8 || this.model.get('gameId') === 10 ){
            var view = new PlayedGameView({ model: this.model, results: results });
            view.render();
            router.navigate('game/' + this.model.get('gameId') + '/results/screen', true);
        }
    },

    startNewGame: function () {
		this.undelegateEvents();
		App.currentGameView.undelegateEvents();

        Settings.set({results:[]});

        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId + '/play', {trigger: true});
    },

	showModal: function () {

		var el = '<h2>Mikä on fiiliksesi?</h2>' +
				'<div class="mood-meter">' +
				'<button onclick="window.hideFeedbackModal(1);" class="btn btn-success btn-smiley"><img class="smiley" src="img/face_happy.png"/></button>' +
				'<button onclick="window.hideFeedbackModal(2);" class="btn btn-default btn-smiley"><img class="smiley" src="img/face_neutral.png"/></button>' +
				'<button onclick="window.hideFeedbackModal(3);" class="btn btn-danger btn-smiley"><img class="smiley" src="./img/face_sad.png"/></button>' +
				'</div>' +
				'<p class="checkbox checkbox-moodmeter pull-left"> <input id="checkboxFeedback" type="checkbox" onclick="window.toggleFeedbackCheckbox();"> &nbsp;&nbsp; Älä näytä tätä enää</p> ';

		$('.overlay').css('display','block');
		$('.back-root').attr('disabled','disabled');
		$('#content').find('button').attr('disabled','disabled');

		$('.modal')
			.css('display','block')
			.html(el);

		var checkboxNotChecked = Settings.get('showFeedbackModal');

		if(checkboxNotChecked == false) {
			$('#checkboxFeedback').attr('checked',true)
		}
	}

});
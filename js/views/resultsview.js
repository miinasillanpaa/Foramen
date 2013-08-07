var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {

        $('#header').show();


        var myView = this;
        var difficulty;
        if( this.options.results.difficulty == 'easy' ){
            difficulty = 'Taso I';
        }else if( this.options.results.difficulty == 'medium' ){
            difficulty = 'Taso II';
        }else if( this.options.results.difficulty == 'hard' ){
            difficulty = 'Taso III';
        }else if( this.options.results.difficulty == 'joker' ){
            difficulty = 'Jokeri';
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
		window.saveGameEnd();


        var template = _.template( $(this.template).html(), results  );
        this.$el.html(template);


		//todo do not show this every time user enters results
		if(Settings.get('showFeedbackModal') === true) {
			this.showModal();
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
        Settings.set({results:[]});
        this.undelegateEvents();
        App.currentGameView.undelegateEvents();
        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId + '/play', {trigger: true});
    },

	/*hideModal: function () {
		console.log('smiley clickd');
		$('.overlay').css('display','none');
		$('.back-root').removeAttr('disabled');

		$('.modal')
			.css('display','none')
			.html("");
	}, */

	showModal: function () {


		var el = '<h3>Mikä on fiiliksesi?</h3>' +
				'<div class="mood-meter">' +
				'<button onclick="window.hideFeedbackModal(1);" class="btn btn-success btn-smiley"><img class="smiley" src="img/face_happy.png"/></button>' +
				'<button onclick="window.hideFeedbackModal(2);" class="btn btn-default btn-smiley"><img class="smiley" src="img/face_neutral.png"/></button>' +
				'<button onclick="window.hideFeedbackModal(3);" class="btn btn-danger btn-smiley"><img class="smiley" src="./img/face_sad.png"/></button>' +
				'<p class="checkbox checkbox-moodmeter pull-left"> <input id="checkboxFeedback" type="checkbox" onmousedown="window.toggleFeedbackCheckbox();"> Älä näytä tätä enää</p> ' +
				'</div>';

		$('.overlay').css('display','block');
		$('.back-root, .btn-feedback').attr('disabled','disabled');

		$('.modal')
			.css('background','#fff').css('display','block')
			.html(el);

		var checkboxNotChecked = Settings.get('showFeedbackModal');

		if(checkboxNotChecked == false) {
			$('#checkboxFeedback').attr('checked',true)
		}
	}

});
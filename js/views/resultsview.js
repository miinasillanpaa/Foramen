var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {

        $('#header').show();
		clearInterval(App.knobTimer);

        var myView = this;
        var difficulty;
        window.difficultyLevel;
        if( this.options.results.difficulty == 'easy' ){
            difficulty = 'Taso I';
			window.difficultyLevel = 1;
        }else if( this.options.results.difficulty == 'medium' ){
            difficulty = 'Taso II';
			window.difficultyLevel = 2;
        }else if( this.options.results.difficulty == 'hard' ){
            difficulty = 'Taso III';
			window.difficultyLevel = 3;
        }else if( this.options.results.difficulty == 'joker' ){
            difficulty = 'Jokeri';
			window.difficultyLevel = 4;
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

		var resultsToDB = [];
		for(var i=0; i< results.data.length; i++) {
			if(results.data[i].name !== ""){
				resultsToDB.push(results.data[i]);
			}
		}
		Settings.set({'score':resultsToDB});
		if( !this.options.fromPlayedGameView ) {
			window.saveGameEnd();
		}
		var self = this;
		var userId = Settings.get('currentUserId');
		var gameId = this.model.get('gameId');

		$.get( 'http://stage.pienipiiri.fi/frGetHighscore?&gameId='+gameId+'&userId='+userId+'&difficultyLevel='+difficultyLevel,
			function(data) {
							
				if ( data.length !== 0  ) { //something was gotten from backend
					var data = JSON.parse(data.score);


					console.warn('record from db', data);
					console.warn('previous gamescore',results.data);

					var len;
					var elem = $(".record-well");
					var record = false;

					var currGameCorrects;
					var currGameTime;
					var oldRecordCorrects;
					var oldRecordTime;

					
					switch(gameId){
						//etsi kuvat
						case 1:
							currGameCorrects = parseInt(results.data[3].value.replace(/\D/g,''));
							currGameTime = parseInt(results.data[0].value.replace(/\D/g,''));
							oldRecordCorrects = parseInt(data[3].value.replace(/\D/g,''));
							oldRecordTime = parseInt(data[0].value.replace(/\D/g,''));

							console.log('corrs: '+ currGameCorrects +" vs "+ oldRecordCorrects);
							console.log('time: '+ currGameTime + " vs "+oldRecordTime);

							if( currGameCorrects > oldRecordCorrects ){
								console.log('record with more corrects');
								record = true;
								self.displayRecord(results, true);
								
							}else if(currGameCorrects === oldRecordCorrects){
								if(oldRecordTime > currGameTime){
									console.log('record with same amout of corrects but better time');
									record = true;
									self.displayRecord(results, true);
								}
							}
							break;

						//muista viesti	
						case 2:
							currGameCorrects = parseInt(results.data[0].value.replace(/\D/g,''));
							oldRecordCorrects = parseInt(data[0].value.replace(/\D/g,''));

							if(Settings.get('difficulty') !== "hard" ){
								console.log('easy & medium, compare corrects');
								if(currGameCorrects > oldRecordCorrects){
									record = true;
									self.displayRecord(results, true);
								}

							}else{
								console.log('hard, compare corrects and if equal amount compare time');
								currGameTime = parseInt(results.data[2].value.replace(/\D/g,''));
								oldRecordTime = parseInt(data[2].value.replace(/\D/g,''));
								
								console.warn('times cur vs old', currGameTime, oldRecordTime);
								console.warn('corrects cur vs old', currGameCorrects, oldRecordCorrects);

								if(currGameCorrects > oldRecordCorrects){
									console.log('record with more corrects');
									record = true;
									self.displayRecord(results, true);
								}else if(currGameCorrects === oldRecordCorrects){
									if(currGameTime < oldRecordTime){
										console.log('record with equal corrects but better time');
										record = true;
										self.displayRecord(results, true);
									}
								}
							}
							break;

						//tunnista sanat
						case 3:
							currGameCorrects = parseInt(results.data[2].value.replace(/\D/g,''));
							oldRecordCorrects = parseInt(data[2].value.replace(/\D/g,''));
							console.warn('corrects cur vs old', currGameCorrects, oldRecordCorrects);

							if(currGameCorrects >= oldRecordCorrects){
								record = true;
								self.displayRecord(results, true);
							}
							break;

						//muista näkemäsi numerosarja
						case 4:
							currGameCorrects = parseInt(results.data[2].value);
							oldRecordCorrects = parseInt(data[2].value);
							console.warn('corrects cur vs old', currGameCorrects, oldRecordCorrects);

							if(currGameCorrects >= oldRecordCorrects){
								record = true;
								self.displayRecord(results, true);
							}
							break;

						//muista kuulemasi sanat
						case 5:
							currGameCorrects = parseInt(results.data[0].value.replace(/\D/g,''));
							oldRecordCorrects = parseInt(data[0].value.replace(/\D/g,''));
							console.warn('correct sounds cur vs old', currGameCorrects, oldRecordCorrects);
							
							if(currGameCorrects >= oldRecordCorrects){
								record = true;
								self.displayRecord(results, true);
							}
							break;

						//muita näkemäsi esineet
						case 6:
							//compares rounds
							currGameCorrects = parseInt(results.data[0].value);
							oldRecordCorrects = parseInt(data[0].value);
							console.warn('played rounds cur vs old', currGameCorrects, oldRecordCorrects);

							if(currGameCorrects <= oldRecordCorrects){
								record = true;
								self.displayRecord(results, true);
							}
							break;

						//päättele salasana
						case 7:
							currGameCorrects = parseInt(results.data[1].value.replace(/\D/g,''));
							oldRecordCorrects = parseInt(data[1].value.replace(/\D/g,''));
							console.warn('password guesses cur vs old', currGameCorrects, oldRecordCorrects);

							if(currGameCorrects <= oldRecordCorrects){
								record = true;
								self.displayRecord(results, true);
							}
							break;

						//sudoku
						case 8:
							currGameTime = parseInt(results.data[0].value.replace(/\D/g,''));
							oldRecordTime = parseInt(data[0].value.replace(/\D/g,''));
							console.warn('sudoku time cur vs old', currGameTime, oldRecordTime);

							if(currGameTime <= oldRecordTime){
								record = true;
								self.displayRecord(results, true);
							}
							break;

						//rakenna kuvio mallista
						case 9:
							var newDoneCorrectly = results.data[0].value;
							var oldRecordDoneCorrectly = data[0].value;

							currGameTime = parseInt(results.data[1].value.replace(/\D/g,''));
							oldRecordTime = parseInt(data[1].value.replace(/\D/g,''));

							if(oldRecordDoneCorrectly === "Oikein" && newDoneCorrectly === "Oikein"){
								console.warn('corrected in time cur vs old', currGameTime, oldRecordTime);
								if(currGameTime <= oldRecordTime){
									record = true;
									self.displayRecord(results, true);
								}
							}else if(newDoneCorrectly === "Oikein" && oldRecordDoneCorrectly !== "Oikein"){
								record = true;
								self.displayRecord(results, true);
							}
							break;

						//jätkänshakki
						case 10:
							currGameTime = parseInt(results.data[0].value.replace(/\D/g,''));
							var curMoves = parseInt(results.data[1].value);
							var curWins = parseInt(results.data[2].value.substr(0,1));

							oldRecordTime = parseInt(data[0].value.replace(/\D/g,''));
							var recordMoves = parseInt(data[1].value);
							var recordWins = parseInt(data[2].value.substr(0,1));

							console.warn('wins over computer cur vs old', curWins, recordWins);
							console.warn('moves made cur vs old', curMoves, recordMoves);
							console.warn('time spent cur vs old', currGameTime, oldRecordTime);

							if(curWins === 1 && recordWins === 1){
								if(curMoves <= recordMoves){
									if(currGameTime <= oldRecordTime){
										console.log('record with victory & less or equal moves & less or equal time spent');
										record = true;
										self.displayRecord(results, true);
									}else{
										console.log('record with victory & less or equal moves');
										record = true;
										self.displayRecord(results, true);
									}
								}	
							}else if(curWins === 1 && recordWins < 1){
								console.log('record with first victory over computer');
								record = true;
								self.displayRecord(results, true);
							}
							break;

					}

					//not a new record
					if(!record){
						console.log('not a record');
						$(".record-box").addClass('alert-info').text("Hyvä suoritus!");
						self.displayRecord(data, false)
					}
					
				}else{
					//nothing yet in backend, display as a record - not sure if this thing ever goes here
					console.log('nothing yet in backend, display previous game as record');
					self.displayRecord(results, true);	
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

    displayRecord: function (results, newRecord) {
    	var len;
    	var obj;

    	if(newRecord){
    		$(".record-box").removeClass('alert-info').addClass('alert-success').text("Paransit omaa ennätystäsi!");
    		obj = results.data;
    		len = Object.keys(results.data).length;

    		//save new record to backend
    		//parameters gameId & difficultyLevel & scoreObj
    		window.saveHighScore(this.model.get('gameId'), window.difficultyLevel, results.data);

    	}else{
    		obj = results;
    		len = Object.keys(results).length;
    	}

		var elem = $(".record-well");

		for(var i=0; i<len; i++) {
			if( obj[i].name !== "" ) {
				elem.find(".results.pull-left").append( '<p>'+ obj[i].name +'</p>' );
				elem.find(".results.align-right").append( '<p>'+ obj[i].value +'</p>' );
			}
		}	
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
		var results = new Array();
        Settings.set({ results:results });

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
			.html(el)
			.css('display','block');

		var checkboxNotChecked = Settings.get('showFeedbackModal');

		if(checkboxNotChecked == false) {
			$('#checkboxFeedback').attr('checked',true)
		}
	}

});
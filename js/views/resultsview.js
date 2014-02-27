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

		$.get( 'http://stage.pienipiiri.fi/frGetScores?userId='+userId+'&difficultyLevel='+difficultyLevel+'&gameId='+gameId,
			function(data) {
				console.log(data);
				console.log(results.data);
				var len;
				var elem = $(".record-well");
				var record = false;
				//override record-box classes if record was made
				$(".record-box").addClass('alert-info').text("Hyvä suoritus!");
				if ( data.length !== 0 ) { //something was gotten from backend
					//actually compare results from backend and new result to actully show new records.
					
					var currGameCorrects;
					var currGameTime;
					var oldRecordCorrects;
					var oldRecordTime;

					//etsi kuvat
					if(gameId === 1){

						currGameCorrects = parseInt(results.data[2].value.replace(/\D/g,''));
						currGameTime = parseInt(results.data[0].value.replace(/\D/g,''));
						oldRecordCorrects = parseInt(data[2].value.replace(/\D/g,''));
						oldRecordTime = parseInt(data[0].value.replace(/\D/g,''));

						if( currGameCorrects >= oldRecordCorrects && currGameTime <= oldRecordTime ){
							record = true;
							self.displayRecord(results, true);
						}
					
					//muista viesti
					}else if(gameId === 2){

						currGameCorrects = parseInt(results.data[0].value.replace(/\D/g,''));
						oldRecordCorrects = parseInt(data[0].value.replace(/\D/g,''));

						if(currGameCorrects >= oldRecordTime ){	
							if(Settings.get('difficulty') === "hard"){

								currGameTime = parseInt(results.data[2].value.replace(/\D/g,''));
								oldRecordTime = parseInt(data[2].value.replace(/\D/g,''));

								if(currGameTime >= oldRecordTime){
									record = true;
									self.displayRecord(results, true);	
								}

							}else{
								record = true;
								self.displayRecord(results, true);	
							}
						}

					//tunnista sanat	
					}else if(gameId === 3){

						currGameCorrects = parseInt(results.data[0].value.replace(/\D/g,''));
						oldRecordCorrects = parseInt(data[0].value.replace(/\D/g,''));

						if(currGameCorrects >= oldRecordCorrects){
							record = true;
							self.displayRecord(results, true);
						}

					//muista näkemäsi numerosarja
					}else if(gameId === 4){

						currGameCorrects = parseInt(results.data[2].value);
						oldRecordCorrects = parseInt(data[2].value);
						console.log(currGameCorrects +" "+ oldRecordCorrects);
						if(currGameCorrects >= oldRecordCorrects){
							record = true;
							self.displayRecord(results, true);
						}

					//muista kuulemasi sanat
					}else if(gameId === 5){
						//äänet
						currGameCorrects = parseInt(results.data[0].value.replace(/\D/g,''));
						oldRecordCorrects = parseInt(data[0].value.replace(/\D/g,''));
						console.log('sounds: '+currGameCorrects +" vs "+oldRecordCorrects);
						
						if(currGameCorrects >= oldRecordCorrects){
							record = true;
							self.displayRecord(results, true);
						}

					//muista näkemäsi esineet
					}else if(gameId === 6){
					//nothing is saved to backend as a highscore (?)
					//compare rounds if something

					//päättele salasana	
					}else if(gameId === 7){
					//nothing is saved to backedn but this is easy to implement
					//compare "yritteitä"

					//sudoku
					}else if(gameId === 8){
					//compare time


					//rakenna kuvio mallista
					}else if(gameId === 9){
						var newDoneCorrectly = results.data[0].value;
						var oldRecordDoneCorrectly = data[0].value;

						currGameTime = parseInt(results.data[1].value.replace(/\D/g,''));
						oldRecordTime = parseInt(data[1].value.replace(/\D/g,''));

						console.log('time: '+currGameTime+" "+oldRecordTime);

						if(oldRecordDoneCorrectly === "Oikein" && newDoneCorrectly === "Oikein"){
							if(currGameTime <= oldRecordTime){
								record = true;
								self.displayRecord(results, true);
							}
						
						}


					//jätkänshakki
					}else if(gameId === 10){
						//old stuff at backend, should compare first win and then used moves and then time
					}

					//not a new record
					if(!record){
						self.displayRecord(data, false)
					}
					
				}else{
					//nothing yet in backend, display as a record - not sure if this thing ever goes here
					console.log('nothing yet in backend');
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
    	console.log(results);
    	var len;
    	var obj;
    	console.log(newRecord);
    	if(newRecord){
    		$(".record-box").removeClass('alert-info').addClass('alert-success').text("Paransit omaa ennätystäsi!");
    		obj = results.data;
    		len = Object.keys(results.data).length;

    	}else{
    		obj = results;
    		len = Object.keys(results).length;
    	}
    	console.log(obj);
    	
    	console.log(len);
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
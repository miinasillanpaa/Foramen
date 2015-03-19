var ResultsView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#resultsViewTemplate',

    render: function () {
        $('#header').show();


        var myView = this;
        var difficulty;

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

        var results = {
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
    var self = this;
    var userId = Settings.get('currentUserId');
    var gameId = this.model.get('gameId');

		// if( !this.options.fromPlayedGameView ) {
		// 	window.saveGameEnd(gameId);
		// }
    //var backend = Settings.get('backendUrl');

    // $.get( backend+'/foramen/highscore/'+gameId+'/'+userId+'/'+difficultyLevel,
    //   function(data) {
	// 			if ( data.length !== 0 && $.isEmptyObject(data) === false ) { //something was gotten from backend
    //       data = JSON.parse(data.score);
    //     //   console.log('got results', data);
    //
	// 				var len, elem, record, currGameCorrects, currGameTime, oldRecordCorrects, oldRecordTime;
	// 				elem = $(".record-well");
	// 				record = false;
    //
	// 				switch(gameId){
	// 					//etsi kuvat
	// 					case 1:
	// 						currGameCorrects = parseInt(results.data[3].value.replace(/\D/g,''));
	// 						currGameTime = parseInt(results.data[0].value.replace(/\D/g,''));
	// 						oldRecordCorrects = parseInt(data[3].value.replace(/\D/g,''));
	// 						oldRecordTime = parseInt(data[0].value.replace(/\D/g,''));
    //
	// 						//console.log('corrs: '+ currGameCorrects +" vs "+ oldRecordCorrects);
	// 						//console.log('time: '+ currGameTime + " vs "+oldRecordTime);
    //
	// 						if( currGameCorrects > oldRecordCorrects ){
	// 							//console.log('record with more corrects');
	// 							record = true;
	// 							self.displayRecord(results, true);
    //
	// 						}else if(currGameCorrects === oldRecordCorrects){
	// 							if(oldRecordTime > currGameTime){
	// 								//console.log('record with same amout of corrects but better time');
	// 								record = true;
	// 								self.displayRecord(results, true);
	// 							}
	// 						}
	// 						break;
    //
	// 					//muista viesti
	// 					case 2:
	// 						currGameCorrects = parseInt(results.data[0].value.replace(/\D/g,''));
	// 						oldRecordCorrects = parseInt(data[0].value.replace(/\D/g,''));
    //
	// 						if(Settings.get('difficulty') !== "hard" ){
	// 							//console.log('easy & medium, compare corrects');
	// 							if(currGameCorrects > oldRecordCorrects){
	// 								record = true;
	// 								self.displayRecord(results, true);
	// 							}
    //
	// 						}else{
	// 							//console.log('hard, compare corrects and if equal amount compare time');
	// 							currGameTime = parseInt(results.data[2].value.replace(/\D/g,''));
	// 							oldRecordTime = parseInt(data[2].value.replace(/\D/g,''));
    //
	// 							//console.warn('times cur vs old', currGameTime, oldRecordTime);
	// 							//console.warn('corrects cur vs old', currGameCorrects, oldRecordCorrects);
    //
	// 							if(currGameCorrects > oldRecordCorrects){
	// 								console.log('record with more corrects');
	// 								record = true;
	// 								self.displayRecord(results, true);
	// 							}else if(currGameCorrects === oldRecordCorrects){
	// 								if(currGameTime < oldRecordTime){
	// 									//console.log('record with equal corrects but better time');
	// 									record = true;
	// 									self.displayRecord(results, true);
	// 								}
	// 							}
	// 						}
	// 						break;
    //
	// 					//tunnista sanat
	// 					case 3:
	// 						currGameCorrects = parseInt(results.data[2].value.replace(/\D/g,''));
	// 						oldRecordCorrects = parseInt(data[2].value.replace(/\D/g,''));
	// 						//console.warn('corrects cur vs old', currGameCorrects, oldRecordCorrects);
    //
	// 						if(currGameCorrects >= oldRecordCorrects){
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 					//muista näkemäsi numerosarja
	// 					case 4:
	// 						currGameCorrects = parseInt(results.data[2].value);
	// 						oldRecordCorrects = parseInt(data[2].value);
	// 						//console.warn('corrects cur vs old', currGameCorrects, oldRecordCorrects);
    //
	// 						if(currGameCorrects >= oldRecordCorrects){
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 					//muista kuulemasi sanat
	// 					case 5:
	// 						currGameCorrects = parseInt(results.data[0].value.replace(/\D/g,''));
	// 						oldRecordCorrects = parseInt(data[0].value.replace(/\D/g,''));
	// 						//console.warn('correct sounds cur vs old', currGameCorrects, oldRecordCorrects);
    //
	// 						if(currGameCorrects >= oldRecordCorrects){
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 					//muita näkemäsi esineet
	// 					case 6:
	// 						//compares rounds
	// 						currGameCorrects = parseInt(results.data[0].value);
	// 						oldRecordCorrects = parseInt(data[0].value);
	// 						//console.warn('played rounds cur vs old', currGameCorrects, oldRecordCorrects);
    //
	// 						if(currGameCorrects <= oldRecordCorrects){
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 					//päättele salasana
	// 					case 7:
	// 						currGameCorrects = parseInt(results.data[1].value.replace(/\D/g,''));
	// 						oldRecordCorrects = parseInt(data[1].value.replace(/\D/g,''));
	// 						//console.warn('password guesses cur vs old', currGameCorrects, oldRecordCorrects);
    //
	// 						if(currGameCorrects <= oldRecordCorrects){
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 					//sudoku
	// 					case 8:
	// 						currGameTime = parseInt(results.data[0].value.replace(/\D/g,''));
	// 						oldRecordTime = parseInt(data[0].value.replace(/\D/g,''));
	// 						//console.warn('sudoku time cur vs old', currGameTime, oldRecordTime);
    //
	// 						if(currGameTime <= oldRecordTime){
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 					//rakenna kuvio mallista
	// 					case 9:
	// 						var newDoneCorrectly = results.data[0].value;
	// 						var oldRecordDoneCorrectly = data[0].value;
    //
	// 						currGameTime = parseInt(results.data[1].value.replace(/\D/g,''));
	// 						oldRecordTime = parseInt(data[1].value.replace(/\D/g,''));
    //
	// 						if(oldRecordDoneCorrectly === "Oikein" && newDoneCorrectly === "Oikein"){
	// 							//console.warn('corrected in time cur vs old', currGameTime, oldRecordTime);
	// 							if(currGameTime <= oldRecordTime){
	// 								record = true;
	// 								self.displayRecord(results, true);
	// 							}
	// 						}else if(newDoneCorrectly === "Oikein" && oldRecordDoneCorrectly !== "Oikein"){
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 					//jätkänshakki
	// 					case 10:
	// 						currGameTime = parseInt(results.data[0].value.replace(/\D/g,''));
	// 						var curMoves = parseInt(results.data[1].value);
	// 						var curWins = parseInt(results.data[2].value.substr(0,1));
    //
	// 						oldRecordTime = parseInt(data[0].value.replace(/\D/g,''));
	// 						var recordMoves = parseInt(data[1].value);
	// 						var recordWins = parseInt(data[2].value.substr(0,1));
    //
	// 						//console.warn('wins over computer cur vs old', curWins, recordWins);
	// 						//console.warn('moves made cur vs old', curMoves, recordMoves);
	// 						//console.warn('time spent cur vs old', currGameTime, oldRecordTime);
    //
	// 						if(curWins === 1 && recordWins === 1){
	// 							if(curMoves <= recordMoves){
	// 								if(currGameTime <= oldRecordTime){
	// 									//console.log('record with victory & less or equal moves & less or equal time spent');
	// 									record = true;
	// 									self.displayRecord(results, true);
	// 								}else{
	// 									//console.log('record with victory & less or equal moves');
	// 									record = true;
	// 									self.displayRecord(results, true);
	// 								}
	// 							}
	// 						}else if(curWins === 1 && recordWins < 1){
	// 							//console.log('record with first victory over computer');
	// 							record = true;
	// 							self.displayRecord(results, true);
	// 						}
	// 						break;
    //
	// 				}
    //
	// 				//not a new record
	// 				if(!record){
	// 					//console.log('not a record');
	// 					$(".record-box").addClass('alert-info').text("Hyvä suoritus!");
	// 					self.displayRecord(data, false);
	// 				}
    //
	// 			}else{
	// 				//nothing yet in backend, display as a record - not sure if this thing ever goes here
	// 				//console.log('nothing yet in backend, display previous game as record');
	// 				self.displayRecord(results, true);
	// 			}
	// 		},'json'
	// 	);

        var template = _.template( $(this.template).html(), results );
        this.$el.html(template);

		$('.back-root').click( function() {
            myView.undelegateEvents();
        });

        $('#content').css('padding-bottom','50px');
        $('#content').css('overflow-y','auto');

        return this;
    },

    events:{
        'click .screen' : 'viewSnapshot',
        'click .new-game' : 'startNewGameWithDifficulty',
    },

    viewSnapshot: function () {

        this.undelegateEvents();

        var results = {
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

    startNewGameWithDifficulty: function(event){
        var difficulty = $(event.currentTarget).data('difficulty');
        this.undelegateEvents();
        App.currentGameView.undelegateEvents();
        Settings.set({results: []});
        Settings.set({difficulty: difficulty});
        router.navigate('game/'+ this.model.get('gameId') +'/play', {trigger: true});
    }

});

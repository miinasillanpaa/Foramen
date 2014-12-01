var Konstruointi = Backbone.View.extend({
   el: $('#content'),
   template: '#konstruointiTemplate',

	initialize: function () {
		$(".modal").css('display','block');
		$(".overlay").css('display','block');
	},

    render: function () {
        $('#header').empty().hide();

        var startTime = new Date().getTime();
        Settings.set({ startTime : startTime });

        var difficulty = Settings.get('difficulty');

        var construct = this.renderConstruct(difficulty);
        var answerChoices = this.renderAnswerChoices();
        var answerBlock = this.renderAnswerBlock(difficulty);

        var variables = { answerChoices: answerChoices,
                          firstRow : construct.firstRow,
                          secondRow : construct.secondRow,
                          thirdRow : construct.thirdRow,
                          answerFirstRow : answerBlock.answerFirstRow,
                          answerSecondRow : answerBlock.answerSecondRow,
                          answerThirdRow : answerBlock.answerThirdRow
        };

        var template = _.template($(this.template).html(), variables);
        this.$el.html(template);

        $('.answerblocks img:first-child').addClass('selected');

        if(difficulty === 'easy'){
            $('.construct-answer .firstRow').addClass('firstRow-answer');
            $('.construct .firstRow').addClass('firstRow-answer');
            $('.construct .secondRow').addClass('bordered-bottom');
            $('.construct-answer .secondRow').addClass('bordered-bottom');

            $('.construct img').addClass('bordered');

        }else if(difficulty === 'medium'){

            $('.construct .firstRow').addClass('firstRow-answer');

            $('.construct .secondRow img:first-child').css('border-left','2px solid black');
            $('.construct .secondRow img:last-child').css('border-right','2px solid black');

            $('.construct .thirdRow img').addClass('border-bottom');
            $('.construct .thirdRow img:first-child').css('border-left','2px solid black');
            $('.construct .thirdRow img:last-child').css('border-right','2px solid black');

            $('.construct-answer .firstRow').addClass('firstRow-answer');
            $('.construct-answer .secondRow').addClass('bordered-mid');
            $('.construct-answer .thirdRow').addClass('bordered-bottom');

            $('.construct img').addClass('bordered');

        }else{

            $('.construct .firstRow').addClass('firstRow-answer');

            $('.construct .secondRow img:first-child').css('border-left','2px solid black');
            $('.construct .secondRow img:last-child').css('border-right','2px solid black');

            $('.construct .thirdRow img').addClass('border-bottom');
            $('.construct .thirdRow img:first-child').css('border-left','2px solid black');
            $('.construct .thirdRow img:last-child').css('border-right','2px solid black');

            $('.construct-answer .firstRow').addClass('firstRow-answer');
            $('.construct-answer .secondRow').addClass('bordered-mid');
            $('.construct-answer .thirdRow').addClass('bordered-bottom');
        }

		$('#content').imagesLoaded( function () {
			$(".modal").css('display','none');
			$(".overlay").css('display','none');
		});

        return this;

    },

    events: {
      'click .selectable' : 'selectBlock',
      'click .answerBlock ' : 'placeBlock',
      'click .finish' :   'getResults',
      'click .continue' : 'continueGame',
      'click .quit' :     'quitGame'
    },

    quitGame: function () {
      var gameId = this.model.get('gameId');
      window.saveInterruptedGame(gameId, Settings.get('gameInstanceId'));
        this.undelegateEvents();
        Settings.set({ results: [] });
        router.navigate('/', true);
    },

    renderAnswerChoices: function () {
      var blocks = [];
      for(var i=1; i<10; i++){
          var block = './pics/konstruktio/'+i+'.png';
          blocks.push(block);
      }
     //to make this last in row
     var last = "./pics/konstruktio/0.png";
     blocks.push(last);
     return blocks;
    },

    renderConstruct: function (diff){

        var constructions = Settings.get('constructions');
        var construct;
        var thirdRow = null;
        var rand;
        if(diff === 'easy'){
            construct = constructions["2x2"];
            rand = Math.floor(Math.random() * construct.length);

        }else{
            construct = constructions["3x3"];
            rand = Math.floor(Math.random() * construct.length);
            thirdRow = construct[rand][rand][2];

        }

        var firstRow = construct[rand][rand][0];

        var secondRow = construct[rand][rand][1];

        Settings.set({construct: { firstRow:firstRow, secondRow:secondRow, thirdRow:thirdRow } });
        return { firstRow:firstRow, secondRow:secondRow, thirdRow:thirdRow }

    },

    renderAnswerBlock: function (diff) {
        var construct;
        var answerThirdRow = null;
        if(diff === 'easy'){
            construct = [[10,10],[10,10]];
        }else if(diff === 'medium'){
            construct = [[10,10,10],[10,10,10],[10,10,10]];
            answerThirdRow = construct[2];

        }else{
            construct = [[10,10,10],[10,10,10],[10,10,10]];
            answerThirdRow = construct[2];
        }

        return { answerFirstRow: construct[0], answerSecondRow: construct[1], answerThirdRow: answerThirdRow };
    },

    selectBlock: function () {
        $('.answerblocks img').removeClass('selected');
        var target = $(event.target);
        target.addClass('selected');
    },

    placeBlock: function () {
        var target = $(event.target);
        var selected =  $('img.selected').attr('src');
        target.attr('src',selected);
    },

    arraysIdentical: function (arr1,arr2) {
        for ( var i = arr1.length; i--; ) {
            if(arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    },

    getResults: function () {

        var difficulty = Settings.get('difficulty');
        var firstRow = [];
        var secondRow = [];
        var thirdRow  = null;
        var results = [];

        var button = $(event.target);
        button.removeClass('finish').addClass('continue btn-success');
        button.text("Jatka");

        var firstRowfirst = parseInt( $('.construct-answer .firstRow img:first-child').attr('src').replace(/\D/g,'') );
        firstRow.push(firstRowfirst);

        var secondRowfirst = parseInt( $('.construct-answer .secondRow img:first-child').attr('src').replace(/\D/g,'') );
        secondRow.push(secondRowfirst);

        if( difficulty === 'medium' || difficulty === 'hard' ){
            var firstRowsecond = parseInt( $('.construct-answer .firstRow img:nth-child(2)').attr('src').replace(/\D/g,'') );
            firstRow.push(firstRowsecond);

            var secondRowsecond = parseInt( $('.construct-answer .secondRow img:nth-child(2)').attr('src').replace(/\D/g,'') );
            secondRow.push(secondRowsecond);

            thirdRow = [];
            var thirdRowfirst = parseInt( $('.construct-answer .thirdRow img:first-child').attr('src').replace(/\D/g,'') );
            thirdRow.push(thirdRowfirst);
            var thirdRowsecond = parseInt( $('.construct-answer .thirdRow img:nth-child(2)').attr('src').replace(/\D/g,'') );
            thirdRow.push(thirdRowsecond);
            var thirdRowlast = parseInt( $('.construct-answer .thirdRow img:last-child').attr('src').replace(/\D/g,'') );
            thirdRow.push(thirdRowlast);
        }

        var firstRowlast = parseInt( $('.construct-answer .firstRow img:last-child').attr('src').replace(/\D/g,'') );
        firstRow.push(firstRowlast);

        var secondRowlast = parseInt( $('.construct-answer .secondRow img:last-child').attr('src').replace(/\D/g,'') );
        secondRow.push(secondRowlast);

        var correctConstruct = Settings.get('construct');

        var startTime = Settings.get('startTime');
        var endTime = new Date().getTime();
        var time = endTime - startTime;
        var timeSpent = msToStr(time);


        var wrong = './pics/konstruktio/11.png';

        for( var j = 0; j < firstRow.length+1; j++ ){
            if( correctConstruct.firstRow[j] !== firstRow[j] ){
                $('.construct-answer .firstRow img:nth-child('+ (j+1) +')').attr('src',wrong);
            }
        }

        for( var k = 0; k < secondRow.length+1; k++ ){
            if( correctConstruct.secondRow[k] !== secondRow[k] ){
                $('.construct-answer .secondRow img:nth-child('+ (k+1) +')').attr('src',wrong);
            }
        }

        if(difficulty !== 'easy') {
            for( var n = 0; n < thirdRow.length+1; n++ ){
                if( correctConstruct.thirdRow[n] !== thirdRow[n] ){
                    $('.construct-answer .thirdRow img:nth-child('+ (n+1) +')').attr('src',wrong);
                }
            }
        }

        var roundResults;

        if(difficulty === 'easy'){
            if( (this.arraysIdentical(correctConstruct.firstRow, firstRow) === true) &&
                (this.arraysIdentical(correctConstruct.secondRow, secondRow) === true) ) {

                roundResults = [ { 'correct' : 'Oikein' },
                                 { 'time' : timeSpent } ];
                results.push(roundResults);
            }else{
                roundResults = [ { 'correct' : 'Väärin' },
                                 { 'time' : timeSpent }];
                results.push(roundResults);
            }
        }else{
            if( (this.arraysIdentical(correctConstruct.firstRow, firstRow) === true) &&
                (this.arraysIdentical(correctConstruct.secondRow, secondRow) === true) &&
                (this.arraysIdentical(correctConstruct.thirdRow, thirdRow) === true) ){
                roundResults = [ { 'correct' : 'Oikein' },
                                 { 'time' : timeSpent } ];
                results.push(roundResults);
            }else{
                roundResults = [ { 'correct' : 'Väärin' },
                                 { 'time' : timeSpent }];
                results.push(roundResults);
            }
        }
        Settings.set({ results:results });

    },

    continueGame: function () {

            var res = Settings.get('results');
            Settings.set({ 'results' : [] });
            var date = getDateTime();
            var pvm = date.pvm;
            var klo = date.klo;

            var results = {
                'pvm' : pvm,
                'klo' : klo,
                'difficulty' : Settings.get('difficulty'),
                'data' : [
                    {
                        'name' : 'Konstruointi suoritettu:',
                        'value' : res[0][0].correct
                    },
                    {
                        'name' : 'Käytetty aika:',
                        'value' : res[0][1].time
                    }
                ]
            };

            this.undelegateEvents();

			router.navigate('game/' + this.model.get('gameId') + '/results', true);
            var view = new ResultsView({ model: this.model, results:results });
            view.render();

        }

});

var Konstruointi = Backbone.View.extend({
   el: $('#content'),
   template: '#konstruointiTemplate',

    render: function () {
        $('#header').empty();

        var startTime = new Date().getTime();
        Settings.set({ startTime : startTime });

        //todo 5 in row

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
            $('.construct .firstRow').addClass('bordered');
            $('.construct .secondRow').addClass('bordered-bottom');
            $('.construct-answer .secondRow').addClass('bordered-bottom-answer');
        }else if(difficulty === 'medium'){

            $('.construct-answer .secondRow').addClass('bordered-mid-answer');
            $('.construct-answer .thirdRow').addClass('bordered-bottom-answer');
        }else{
            $('.construct-answer .secondRow').addClass('bordered-mid-answer');
            $('.construct-answer .thirdRow').addClass('bordered-bottom-answer');
        }

        return this;

    },

    events: {
      'click .selectable' : 'selectBlock',
      'click .answerBlock ' : 'placeBlock',
      'click .finish' : 'getResults',
      'click .continue' : 'continueGame'
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
       // var firstRow = constructions.get('2x2')

        //console.log(easy);
        console.log(firstRow);
        console.log(secondRow);
        console.log(thirdRow);
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

    getResults: function () {
        var difficulty = Settings.get('difficulty');
        var firstRow = [];
        var secondRow = [];
        var thirdRow  = null;
        var results = Settings.get('results');

        var button = $(event.target);
        button.removeClass('finish').addClass('continue btn-success')
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

        function msToStr(ms){
            var sec = ms / 1000;
            var nummin = Math.floor((((sec % 31536000) % 86400) % 3600) / 60);
            var numsec = Math.floor(((sec % 31536000) % 86400) % 3600) % 60;

            if(nummin){
                return nummin +' min ' + numsec +' s';
            }else{
                return numsec + ' s';
            }
        }

        var timeSpent = msToStr(time);


        function arraysIdentical (arr1,arr2) {
            for ( var i = arr1.length; i--; ) {
                if(arr1[i] !== arr2[i]){
                    return false;
                }
                return true;
            }
        }
        var wrong = './pics/konstruktio/X.png';

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
            if( (arraysIdentical(correctConstruct.firstRow, firstRow) === true) &&
                (arraysIdentical(correctConstruct.secondRow, secondRow) === true) ) {

                roundResults = [ { 'correct' : 'Oikein' },
                                 { 'time' : timeSpent } ];
                results.push(roundResults);
            }else{
                roundResults = [ { 'correct' : 'Väärin' },
                                 { 'time' : timeSpent }];
                results.push(roundResults);
            }
        }else{
            if( (arraysIdentical(correctConstruct.firstRow, firstRow) === true) &&
                (arraysIdentical(correctConstruct.secondRow, secondRow) === true) &&
                (arraysIdentical(correctConstruct.thirdRow, thirdRow) === true) ){
                roundResults = [ { 'correct' : 'Oikein' },
                                 { 'time' : timeSpent } ];
                results.push(roundResults);
            }else{
                roundResults = [ { 'correct' : 'Väärin' },
                                 { 'time' : timeSpent }];
                results.push(roundResults);
            }
        }
    console.log(results);
    Settings.set({ results:results });
    },

    continueGame: function () {
        this.undelegateEvents();
        var playThruNum = Settings.get('playThruNum');

        console.log(playThruNum);
        var view;

        if(playThruNum < 4){
            playThruNum++;
            Settings.set({ playThruNum : playThruNum })
            view = new Konstruointi({ model:this.model });
            view.render();
        }else{
            Settings.set({ playThruNum : 0 });

            var preResults = Settings.get('results');

            //time & date
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;//January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){dd='0'+dd}
            if(mm<10){mm='0'+mm}
            var hours = today.getHours();
            var minutes = today.getMinutes();

            function pad2(number){
                return (number < 10 ? '0' : '') + number
            }

            var h = pad2(hours);
            var m = pad2(minutes);

            var results = {
                'pvm' : dd+'/'+mm+'/'+yyyy,
                'klo' : h+':'+m,
                'difficulty' : Settings.get('difficulty'),
                'data' : [
                    {
                        'name' : 'Tehtävä 1:',
                        'value' : preResults[0][0].correct + ", ajassa "+preResults[0][1].time
                    },
                    {
                        'name' : 'Tehtävä 2:',
                        'value' : preResults[1][0].correct + ", ajassa "+preResults[1][1].time
                    },
                    {
                        'name' : 'Tehtävä 3:',
                        'value' : preResults[2][0].correct + ", ajassa "+preResults[2][1].time
                    },
                    {
                        'name' : 'Tehtävä 4:',
                        'value' : preResults[3][0].correct + ", ajassa "+preResults[3][1].time
                    },
                    {
                        'name' : 'Tehtävä 5:',
                        'value' : preResults[4][0].correct + ", ajassa "+preResults[4][1].time
                    }
                ]
            }

            Settings.set({ results: [] });
            view = new ResultsView({ model: this.model, results:results });
            view.render();
        }


    }


});
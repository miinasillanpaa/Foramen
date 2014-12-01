var Salasana = Backbone.View.extend({
    el: $(' #content '),
    template: '#salasanaTemplate',

    render: function () {

        $('#header').empty().hide();

        var startTime = new Date().getTime();
        Settings.set({ startTime : startTime });

        var serial = this.createSerial();
        Settings.set({ serial:serial });

        var textnum;
            if(serial.length === 3){
                textnum = 'kolmen';
            }else if(serial.length === 4){
                textnum = 'neljän';
            }else{
                textnum = 'viiden';
            }
        var variables = {hint: 'Kirjoita päättelemäsi '+textnum+' kirjaimen pituinen salasana'}
        var template = _.template( $(this.template).html(), variables ) ;
        this.$el.html(template);

        //hack but does the trick
        $('.myForm input[type=text]').keyup(function() {
            $(this).val($(this).val().toUpperCase());
        });
        return this;
    },

    events : {
        'click .submit' : 'checkGuess',
        'click .quit' : 'quitGame'
    },

    quitGame : function () {
      var gameId = this.model.get('gameId');
      window.saveInterruptedGame(gameId, Settings.get('gameInstanceId'));
        this.undelegateEvents();
        Settings.set({ 'checks' : 0 });
        Settings.set({ 'scrollerChecks': 0 });
        router.navigate('/', true);
    },

    goToResults: function () {
        var date = getDateTime();
        var pvm = date.pvm;
        var klo = date.klo;
        var startTime = Settings.get('startTime');
        var endTime = new Date().getTime();
        var time = endTime - startTime;
        var timeSpent = msToStr(time);
        var checks = Settings.get('checks');


        var results = {
            'pvm' : pvm,
            'klo' : klo,
            'difficulty' : Settings.get('difficulty'),
            'data' : [
                {
                    'name' : 'Etsitty sana:',
                    'value' : Settings.get('serial')
                },
                {
                    'name' : 'Yritteitä:',
                    'value' : checks +" kpl"
                },
                {
                    'name' : 'Käytetty aika:',
                    'value' : timeSpent
                }
            ]
        };

        Settings.set({ 'checks' : 0 });
        Settings.set({ 'scrollerChecks' : 0 });

        this.undelegateEvents();
		router.navigate('game/' + this.model.get('gameId') + '/results', true);
        var view = new ResultsView({ model:this.model, results:results });
        view.render();

    },

    createSerial: function() {

        var difficulty = Settings.get('difficulty');
        var serials = Settings.get('salasanat');
        var serial;
        var random;

        if(difficulty === 'easy' ){
            var easy = serials.easy;
            random = Math.floor(Math.random() * easy.length);
            serial = easy[random];

        }else if(difficulty === 'medium'){
             var medium = serials.medium;
             random = Math.floor(Math.random() * medium.length);
             serial = medium[random];

        }else{
            var hard = serials.hard;
                random = Math.floor(Math.random() *hard.length);
                serial = hard[random];
        }
        return serial;
    },


    checkGuess: function () {

        var difficulty = Settings.get('difficulty');
        var guess = $('.serial-input').val().toUpperCase();
        $('.serial-input').focus();


        var serial = Settings.get('serial');

        var guessArr = [];
        for(var i=0; i<guess.length; i++){
            var guessChar = guess.charAt(i);
            guessArr.push(guessChar);
        }

        var serialArr = [];
        for(var j=0; j<serial.length; j++){
            var serialChar = serial.charAt(j);
            serialArr.push(serialChar);
        }

        var textnum;
        if(serial.length === 3){
            textnum = 'kolmen';
        }else if(serial.length === 4){
            textnum = 'neljän';
        }else{
            textnum = 'viiden';
        }

        if(guess.length !== serial.length){
            $('.pw-hint span').addClass('danger').text('Tarkista arvauksen pituus! Salasana on '+textnum+' kirjaimen pituinen');
            console.log(textnum);
        }else{

            $('.pw-hint span').removeClass('danger').text('Kirjoita päättelemäsi '+textnum+ ' kirjaimen pituinen salasana');
            var checks = Settings.get('checks');
            checks++;
            Settings.set({checks:checks});

            var scrollerChecks = Settings.get('scrollerChecks');

            scrollerChecks++;
            Settings.set({scrollerChecks:scrollerChecks});
            if(scrollerChecks > 6){
                $('.guesses').transition({ y: '-=44' });
            }

            if(difficulty === 'easy'){

                if(guess === serial){
                    this.goToResults();

                }else{

                    $('.guesses').append('<p>'+guess+'</p>');
                    $('.serial-input').val('');

                    if(guessArr[0] === serialArr[0]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[0];
                        delete guessArr[0];
                    }

                    if(guessArr[1] === serialArr[1]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[1];
                        delete guessArr[1];
                    }

                    if(guessArr[2] === serialArr[2]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[2];
                        delete guessArr[2];
                    }

                    for(var k=0; k<guessArr.length; k++){
                        if(( $.inArray(guessArr[k], serialArr.filter(function(e){return e}) ) )  !== -1 ){

                            removeA(serialArr,guessArr[k]);
                            $('.guesses p:last-child').append('&#9702;');

                        }
                    }
                }
            }else if(difficulty === 'medium'){

                if(guess === serial) {
                    this.goToResults();

                }else{

                    $('.guesses').append('<p>'+guess+'</p>');
                    $('.serial-input').val('');

                    if(guessArr[0] === serialArr[0]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[0];
                        delete guessArr[0];
                    }

                    if(guessArr[1] === serialArr[1]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[1];
                        delete guessArr[1];
                    }

                    if(guessArr[2] === serialArr[2]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[2];
                        delete guessArr[2];
                    }

                    if(guessArr[3] === serialArr[3]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[3];
                        delete guessArr[3];
                    }

                    for(var k=0; k<guessArr.length; k++){
                        if(( $.inArray(guessArr[k], serialArr.filter(function(e){return e}) ) )  !== -1 ){

                            removeA(serialArr,guessArr[k]);
                            $('.guesses p:last-child').append('&#9702;');

                        }
                    }
                }
        }else{ //hard

                if(guess === serial){
                    this.goToResults();

                }else{

                    $('.guesses').append('<p>'+guess+'</p>');
                    $('.serial-input').val('');

                    if(guessArr[0] === serialArr[0]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[0];
                        delete guessArr[0];
                    }

                    if(guessArr[1] === serialArr[1]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[1];
                        delete guessArr[1];
                    }

                    if(guessArr[2] === serialArr[2]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[2];
                        delete guessArr[2];
                    }

                    if(guessArr[3] === serialArr[3]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[3];
                        delete guessArr[3];
                    }

                    if(guessArr[4] === serialArr[4]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[4];
                        delete guessArr[4];
                    }

                    for(var k=0; k<guessArr.length; k++){
                        if(( $.inArray(guessArr[k], serialArr.filter(function(e){return e}) ) )  !== -1 ){

                            removeA(serialArr,guessArr[k]);
                            $('.guesses p:last-child').append('&#9702;');

                        }
                    }
                }
            }
        }
    }
});

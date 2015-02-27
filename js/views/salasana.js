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

            var k, l;
            if(guess === serial) {
                console.log('strings equal', guess, serial);
                this.goToResults();

            }else{

                $('.guesses').append('<p>'+guess+'</p>');
                $('.serial-input').val('');

                for(k = 0; k < serialArr.length; k++){
                    if(guessArr[k] === serialArr[k]){
                        $('.guesses p:last-child').append('&bull;');
                        delete serialArr[k];
                        delete guessArr[k];

                    }
                }

                var t = [];
                for(l = 0; l < guessArr.length; l++){
                    if( ($.inArray(guessArr[l], serialArr ) > -1)){
                        var index = serialArr.indexOf(guessArr[l]);
                        delete serialArr[index];
                        t.push(index);
                    }
                }

                var tUniq = _.uniq(t);
                for(k = 0; k < tUniq.length; k++){
                    $('.guesses p:last-child').append('&#9702;');
                }
            }
        }
    }
});

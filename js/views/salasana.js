var Salasana = Backbone.View.extend({
    el: $(' #content '),
    template: '#salasanaTemplate',

    render: function () {

        $('#header').empty();

        var startTime = new Date().getTime();
        Settings.set({ startTime : startTime });

        if(Settings.get('playThruNum') === 0){
            var serialsArr = this.createSerials();
            Settings.set({ serialsArr:serialsArr });
        }else{
            var serialsArr = Settings.get('serialsArr')
        }

        console.log(serialsArr);

        var template = _.template( $(this.template).html() ) ;
        this.$el.html(template);
        $('.serial-input').focus();


    },

    events : {
        'click .submit' : 'checkGuess',
        'click .continue' : 'continueGame',
        'click .quit' : 'quitGame'
    },

    quitGame : function () {
        this.undelegateEvents();
        Settings.set({ 'pwGameChecks' : [] });
        Settings.set({ 'playThruNum' : 0 });
        Settings.set({ 'pwChecks' : 0 });
        Settings.set({ 'scrollerChecks' : 0 });

        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, {trigger:true});
    },

    goToResults: function () {
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

        var startTime = Settings.get('startTime');
        var endTime = new Date().getTime();
        var time = endTime - startTime;
        var timeSpent = msToStr(time);


        var round1score = Settings.get('pwGameChecks')[0].checks
        var round2score = Settings.get('pwGameChecks')[1].checks - round1score;
        var round3score = Settings.get('pwGameChecks')[2].checks - round2score-round1score;

        var results = {'pvm' : dd+'/'+mm+'/'+yyyy,
            'klo' : h+':'+m,
            'difficulty' : Settings.get('difficulty'),
            'data' : [
                {
                    'name' : 'Yritteiden <br/> kokonaismäärä:',
                    'value' : "<br /> &nbsp;"+ Settings.get('pwChecks')  + " kpl"
                },
                {
                    'name' : 'Käytetty aika:',
                    'value' : timeSpent
                },
                {
                    'name' : 'Tehtävä 1:',
                    'value' : Settings.get('serialsArr')[0] + ", yritteitä: " + round1score
                },
                {
                    'name' : 'Tehtävä 2:',
                    'value' : Settings.get('serialsArr')[1] + ", yritteitä: "  + round2score
                },
                {
                    'name' : 'Tehtävä 3:',
                    'value' : Settings.get('serialsArr')[2] + ", yritteitä: " + round3score
                }
            ]
        };

        Settings.set({ 'pwGameChecks' : [] });
        Settings.set({ 'playThruNum' : 0 });
        Settings.set({ 'pwChecks' : 0 });
        Settings.set({ 'scrollerChecks' : 0 });

        this.undelegateEvents();
        router.navigate
        var view = new ResultsView({ model:this.model, results:results });
        view.render();
        router.navigate('game/' + this.model.get('gameId') + '/results', true);
    },
    continueGame: function () {
        this.undelegateEvents();

        var playThruNum = Settings.get('playThruNum');
        playThruNum++;
        Settings.set({playThruNum:playThruNum});
        Settings.set({scrollerChecks:0});


        view = new Salasana({ model:this.model});
        view.render();
    },

    createSerials: function() {
        var difficulty = Settings.get('difficulty');
        var serials = Settings.get('salasanat');
        var arr = [];
        var random;
        if(difficulty === 'easy' ){
            var easy = serials.easy;
            for( var i=0; i<3; i++ ) {
                random = Math.floor(Math.random() * easy.length);
                arr.push(easy[random]);
            }

        }else if(difficulty === 'medium'){
             var medium = serials.medium;
            for( var j=0; j<3; j++ ) {
                random = Math.floor(Math.random() * medium.length);
                arr.push(medium[random]);
            }
        }else{
            var hard = serials.hard;
            for( var k=0; k<3; k++ ) {
                random = Math.floor(Math.random() *hard.length);
                arr.push(hard[random]);
            }
        }
        return arr;
    },


    checkGuess: function () {
        var playThruNum = Settings.get('playThruNum');
        var difficulty = Settings.get('difficulty');
        var guess = $('.serial-input').val().toUpperCase();
        $('.serial-input').focus();
        var serial;

        if(playThruNum === 0 ){
            serial = Settings.get('serialsArr')[0];
        }else if( playThruNum === 1){
            serial = Settings.get('serialsArr')[1];
        }else{
            serial = Settings.get('serialsArr')[2];
        }


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



        if(guess.length !== serial.length){
            $('.myForm span').text('Tarkista arvauksen pituus');
        }else{


            var checks = Settings.get('pwChecks');

            var scrollerChecks = Settings.get('scrollerChecks');

            scrollerChecks++;
            Settings.set({scrollerChecks:scrollerChecks});

            checks = checks+1;
            console.log("checks: "+checks);
            console.log("playthrus: "+playThruNum);
            Settings.set({pwChecks:checks});


            console.log(scrollerChecks);
            if(scrollerChecks > 5){
                $('.guesses').transition({ y: '-=54' });
            }




            var gameChecks;
            var obj;
            if(difficulty === 'easy'){

                if( (guess === serial) && (playThruNum !== 2) ) {

                    $('.guesses').append('<p>'+guess+'</p>');
                    $('.serial-input').val('');
                    $('.guesses p:last-child').append('&bull;&bull;&bull;');
                    $('.guesses p:last-child').addClass("alert-success alert-password");
                    $('.myForm input').attr("disabled","disabled");
                    $('.myForm input').attr("placeholder", "Vastasit oikein!")
                    $('.myForm button').removeClass('submit').addClass('continue btn-success');
                    $('.myForm button').text("Jatka");

                    gameChecks = Settings.get('pwGameChecks');
                    obj = {playThruNum:playThruNum, checks: Settings.get('pwChecks')};
                    gameChecks.push(obj);
                    Settings.set({pwGameChecks:gameChecks});

                }else if( (guess === serial) && (playThruNum === 2) ){

                    gameChecks = Settings.get('pwGameChecks');
                    obj = {playThruNum:playThruNum, checks: Settings.get('pwChecks')};
                    gameChecks.push(obj);
                    Settings.set({pwGameChecks:gameChecks});
                    console.log(gameChecks);

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
                if( (guess === serial) && (playThruNum !== 2) ) {

                    $('.guesses').append('<p>'+guess+'</p>');
                    $('.serial-input').val('');
                    $('.guesses p:last-child').append('&bull;&bull;&bull;');
                    $('.guesses p:last-child').addClass("alert-success alert-password");
                    $('.myForm input').attr("disabled","disabled");
                    $('.myForm input').attr("placeholder", "Vastasit oikein!")
                    $('.myForm button').removeClass('submit').addClass('continue btn-success');
                    $('.myForm button').text("Jatka");

                    gameChecks = Settings.get('pwGameChecks');
                    obj = {playThruNum:playThruNum, checks: Settings.get('pwChecks')};
                    gameChecks.push(obj);
                    Settings.set({pwGameChecks:gameChecks});

                }else if( (guess === serial) && (playThruNum === 2) ){

                    gameChecks = Settings.get('pwGameChecks');
                    obj = {playThruNum:playThruNum, checks: Settings.get('pwChecks')};
                    gameChecks.push(obj);
                    console.log(gameChecks);

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

                    console.log(serialArr);
                    for(var k=0; k<guessArr.length; k++){
                        if(( $.inArray(guessArr[k], serialArr.filter(function(e){return e}) ) )  !== -1 ){

                            removeA(serialArr,guessArr[k]);
                            $('.guesses p:last-child').append('&#9702;');

                        }
                    }
                }
        }else{ //hard
                if( (guess === serial) && (playThruNum !== 2) ) {

                    $('.guesses').append('<p>'+guess+'</p>');
                    $('.serial-input').val('');
                    $('.guesses p:last-child').append('&bull;&bull;&bull;');
                    $('.guesses p:last-child').addClass("alert-success alert-password");
                    $('.myForm input').attr("disabled","disabled");
                    $('.myForm input').attr("placeholder", "Vastasit oikein!")
                    $('.myForm button').removeClass('submit').addClass('continue btn-success');
                    $('.myForm button').text("Jatka");

                    gameChecks = Settings.get('pwGameChecks');
                    obj = {playThruNum:playThruNum, checks: Settings.get('pwChecks')};
                    gameChecks.push(obj);
                    Settings.set({pwGameChecks:gameChecks});

                }else if( (guess === serial) && (playThruNum === 2) ){

                    gameChecks = Settings.get('pwGameChecks');
                    obj = {playThruNum:playThruNum, checks: Settings.get('pwChecks')};
                    gameChecks.push(obj);
                    console.log(gameChecks);

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

                    console.log(serialArr);
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
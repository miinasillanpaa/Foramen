var AudatiivinenInterferenssi = Backbone.View.extend({
    el: $("#content"),
    template: "#audInterTemplate",

    render: function () {
        $('#header').empty().hide();

        var template = _.template($(this.template).html() );
        this.$el.html(template);

        var sounds = this.playSounds();
        var distractions = this.createDistraction();
        var changes = 0;
        var self = this;

        var startInterval = function() {
			$('.sounds-tip').hide();
			var interval = window.setInterval(
                function () {
                    if( $('.image').hasClass('hidden') ) {
                        $('.image').removeClass('hidden');
                    }

                    self.changeDistract(distractions,changes);
                    changes++;
                    if(changes === 18){
                        window.clearInterval(interval);
                        $('.distractions').hide();
                        $('.input-container').removeClass('hidden');
                    }},3500);

            $('.quit').click( function () {
                window.clearInterval(interval);
            });
        };
        var i;
        var timer;
        var soundElem;
        var soundElems = [];
        var inputElem;
        for(i=0; i<sounds.length; i++){
           if( i=== 0){
                soundElem = '<audio id="audio_'+i+'" autoplay="autoplay" src='+sounds[i]+' type="audio/mpeg"></audio>';
                inputElem = '<input class="input input_'+i+'" type="text" placeholder="Kosketa tähän" />';
            }else{
                soundElem = '<audio id="audio_'+i+'" autoplay="autoplay"  src='+sounds[i]+' type="audio/mpeg"></audio>';
                inputElem = '<input class="input input_'+i+'" type="text" />';
            }
            soundElems.push(soundElem);
            $('.inputs').append(inputElem);

        }

        var appendSound = function(item){
          $('.sounds').append(soundElems[item]);
        };

        var timeouts = [];
        if(sounds.length === 2){
          appendSound(0);
          timeouts.push( setTimeout( function(){ appendSound(1); }, 3500) );
          timeouts.push( setTimeout(startInterval, 7000) );

        }else if(sounds.length === 3){
          appendSound(0);
          timeouts.push( setTimeout( function(){ appendSound(1); }, 3500) );
          timeouts.push( setTimeout( function(){ appendSound(2); }, 7000) );
          timeouts.push( setTimeout(startInterval, 10500) );

        }else{
          appendSound(0);
          timeouts.push( setTimeout( function(){ appendSound(1); }, 3500) );
          timeouts.push( setTimeout( function(){ appendSound(2); }, 7000) );
          timeouts.push( setTimeout( function(){ appendSound(3); }, 10500) );
          timeouts.push( setTimeout(startInterval, 14000) );
        }

        $('.quit').click( function () {
          for(i = 0; i < timeouts.length; i++){
            clearTimeout(timeouts[i]);
          }
        });

        var diff = Settings.get('difficulty');
        if( diff === 'medium' ){
            $('.below').css('padding','76px 0 77px 0');
        }else if( diff === 'hard'){
            $('.below').css('padding','107px 0 107px 0');
        }

        return this;
    },

    events: {
        'click .quit' : 'quitGame',
        'click .check' : 'checkImg',
        'click .finish' : 'checkTextAnswers',
        'click .end' : 'toResults'
    },

    toResults: function () {

        var stringCorrects = Settings.get('stringCorrects');
        var audStrings = Settings.get('audStrings').length;
        var wrong = audStrings-stringCorrects;
        var corrects = Settings.get('corrects');
        var date = getDateTime();
        var pvm = date.pvm;
        var klo = date.klo;



        var results = {
              'pvm' : pvm,
              'klo' : klo,
              'difficulty' : Settings.get('difficulty'),
              'data' : [
                  {
                      'name' : 'Äänisarja - oikein:',
                      'value' : stringCorrects+" kpl"
                  },
                  {
                      'name' : 'Äänisarja  - väärin:',
                      'value' : wrong+" kpl"
                  },
                  {
                      'name' : 'Häirintä - oikein:',
                      'value' : corrects +" / 5 kpl"
                  },
                  {
                      'name' : 'Häirintä - väärin:',
                      'value' : Settings.get('wrongs') + " kpl"
                  }

              ]
        };

        this.undelegateEvents();
        Settings.set({corrects:0});
        Settings.set({stringCorrects:0});

		router.navigate('game/' +this.model.get('gameId') + '/results', true);
        var view = new ResultsView({ model:this.model, results:results });
        view.render();


    },

    checkTextAnswers: function () {
        var strings = Settings.get('audStrings');
        var stringCorrects = Settings.get('stringCorrects');
        var diff = Settings.get('difficulty');

        var inputs = [];
        for(var i=0; i<strings.length; i++) {
            input = $('.input_'+i).val().toLowerCase();
            inputs.push(input);
        }

        var correct = 0;
        var j;
        if( diff === 'easy'){

            for(j=0; j<strings.length; j++){
                if( inputs[0] === strings[j] ){
                    $('.input_0').addClass('input-success');
                    correct++;
                    delete strings[j];
                }

                if( inputs[1] === strings[j]){
                    $('.input_1').addClass('input-success');
                    correct++;
                    delete strings[j];
                }
            }

        }else if( diff === 'medium'){


            for(j=0; j<strings.length; j++){
                if( inputs[0] === strings[j] ){
                    $('.input_0').addClass('input-success');
                    correct++;
                    delete strings[j];
                }

                if( inputs[1] === strings[j]){
                    $('.input_1').addClass('input-success');
                    correct++;
                    delete strings[j];
                }

                if( inputs[2] === strings[j]){
                    $('.input_2').addClass('input-success');
                    correct++;
                    delete strings[j];
                }
            }

        }else{

            for(j=0; j<strings.length; j++){
                if( inputs[0] === strings[j] ){
                    $('.input_0').addClass('input-success');
                    correct++;
                    delete strings[j];
                }

                if( inputs[1] === strings[j]){
                    $('.input_1').addClass('input-success');
                    correct++;
                    delete strings[j];
                }

                if( inputs[2] === strings[j]){
                    $('.input_2').addClass('input-success');
                    correct++;
                    delete strings[j];
                }

                if( inputs[3] === strings[j]){
                    $('.input_3').addClass('input-success');
                    correct++;
                    delete strings[j];
                }
            }

        }

        Settings.set({ stringCorrects:correct });
        $('.finish').addClass('end').removeClass('finish');
        $('.end').text('Tuloksiin');
        $('.input').attr('disabled','disabled');
        $('.input').attr('placeholder',' ');

    },

    checkImg: function () {
        var corrects = Settings.get('corrects');
        var wrongs = Settings.get('wrongs');
        var correctsArr = Settings.get('correctsArr');
        var imgEl = $('img');
        var img = $('.image img').attr('src');

        var correct = false;
        for(var i=0; i<correctsArr.length; i++){
            if(img === correctsArr[i]){
                correct = true;
                delete correctsArr[i];
            }
        }
        console.log('clicked', correct);

        if(correct){
            corrects++;
            Settings.set({ corrects:corrects });
            //imgEl.css("border","1px solid green");
        }else{
            wrongs++;
            Settings.set({ wrongs:wrongs });
            //imgEl.css("border","1px solid orange");
        }
        $('.check').prop('disabled', true);

    },

    quitGame: function () {
        var gameId = this.model.get('gameId');
        Settings.set({corrects:0});
        this.undelegateEvents();

        if (Settings.get('isPotpuriGame')) {
            router.navigate('/potpuri/'+Settings.get('potpuriId'), true);
        }else{
            router.navigate('/', true);
        }

    },

    playSounds: function () {
        var category = 'elaimet';
        var diff = Settings.get('difficulty');
        var animals = Settings.get('categories').eläimet;
        var amount;

        if( diff === 'easy' ){
            amount = 2;
        }else if( diff === 'medium' ){
            amount = 3;
        }else{
            amount = 4;
        }

        var strings = [];
        var randomSounds = [];
        for( var i=0; i<amount; i++){
            var unique = true;
            var random = Math.floor(Math.random() * animals.length);
            var str = animals[random].toLowerCase();
            var randomItem = str.replace(/ä/g,'a').replace(/ö/g,'o');
            var randomSound = "./assets/sounds/audio/"+category+"/"+randomItem+".mp3";

            for( var j=0; j<amount; j++ ){
                if(randomSounds[j] === randomSound){
                    unique = false;
                }
            }
            if(unique){
                randomSounds.push(randomSound);
                strings.push(str);
            }else{
                i--;
            }
        }
        Settings.set({audStrings:strings});
        return randomSounds;

    },

    createDistraction: function () {
        var distractionArr = [];
        var correctsArr = [];
        var correctCat = ["elaimet","kalat","linnut"];
        var i;
        for ( i=0; i<5; i++ ){
            var corrRandCat = correctCat[Math.floor(Math.random() * correctCat.length)];
            var unique = true;
            var randCorrect = Math.floor((Math.random() * 20) +1);
            var img = "./assets/pics/"+corrRandCat+"/"+randCorrect+".png";

            for( var j=0; j<5; j++){
                if(distractionArr[j] === img){
                    unique = false;
                }
            }

            if(unique){
                distractionArr.push(img);
                correctsArr.push(img);
            }else{
                i--;
            }
        }
        Settings.set({correctsArr:correctsArr});

        var categories = ["hedelmat","kansallispuvut","kasvit","liput","soittimet","tyokalut","urheiluvalineet"];
        for ( i=0; i<12; i++){
            var randCat = categories[Math.floor(Math.random() * categories.length)];
            var randIndex = Math.floor((Math.random()*20)+1);
            var randImg = "./assets/pics/"+randCat+"/"+randIndex+".png";
            distractionArr.push(randImg);
        }

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

    var shuffled = shuffleArray(distractionArr);
    $(shuffled).preload();
    return shuffled;
    },

    changeDistract: function (arr,i) {
        $('.image img').attr('src',arr[i]);
        //$('img').css('border','none');
        $('.check').prop('disabled', false);
    }
});

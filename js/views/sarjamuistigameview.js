var Sarjamuisti = Backbone.View.extend({
    el: $("#content"),
    template: '#sarjamuistiTemplate',

    render: function () {
        $('#header').empty().hide();

        var choices = [0,1,2,3,4,5,6,7,8,9];
        var numArray = [];
        var timePerNum = 1500;
        var time;
        var arrLength;

        if(Settings.get('difficulty') == 'easy'){
            arrLength = 3;
            time = arrLength*timePerNum;
        }else if(Settings.get('difficulty') == 'medium'){
            arrLength = 4;
            time = arrLength*timePerNum;
        }else{
            arrLength = 5;
            time = arrLength*timePerNum;
        }

        for(i=0; i<arrLength; i++){
            var num = Math.floor(Math.random() * 10);
            numArray.push(num);
        }

        var timer = setTimeout(
            function () {

                $('.box').addClass('black');

                var rand = Math.floor(Math.random() * arrLength);
                var wait = setTimeout(
                    function() {
                        $('.numOptions').removeClass('hidden');
                        $('.box:eq(' + rand + ')').addClass('actived').removeClass('available');
                        $('.next').removeAttr("disabled");
                        $('.ser-check').removeAttr("disabled");
                }, 1600);
            },time);

        var variables = { numArray : numArray, choices : choices };

        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);

        $('.quit').click( function () {
            window.clearTimeout(timer);
        });

        return this;

    },

    events:{
        'click .quit': 'quitGame',
        'click .choices' : 'numberPicked',
        'click .ser-check' : 'showCorrects',
        'click .next' : 'finish'
    },

    quitGame: function () {
        //var gameId = this.model.get('gameId');
        //window.saveInterruptedGame(gameId, Settings.get('gameInstanceId'));
        this.undelegateEvents();
        Settings.set({ 'playThruNum'    : 0  });
        Settings.set({ 'correctSeries'  : 0  });
        Settings.set({ 'wrongSeries'    : 0  });
        Settings.set({ 'results'        : [] });

        if (Settings.get('isPotpuriGame')) {
            router.navigate('/potpuri/'+Settings.get('potpuriId'), true);
        }else{
            router.navigate('/', true);
        }
    },

    numberPicked: function (event) {
        var target = event.target.innerHTML;
        $('.actived').html('<p>'+target+'</p>');
        $('.actived').addClass('answered');
        $('.actived').removeClass('black').addClass('dummy-white');
        $('.box').removeClass('actived');
        this.nextRandom();
    },

    nextRandom: function () {
        var availableBoxes = $('.available').length;
        var availableArr = [];
        if(availableBoxes === 0){
            $('.next').addClass('btn-success');
        }else{
            $('.available.box').each(function ( index ) {
                availableArr.push(index);
            });

            var num = Math.floor(Math.random() * availableArr.length);
            $('.available:eq(' + availableArr[num] + ')').addClass('actived').removeClass('available');

        }
    },

    answerCheck: function () {

        var playThruNum = Settings.get('playThruNum');
        var correctSeries = Settings.get('correctSeries');
        var wrongSeries = Settings.get('wrongSeries');

        var nums = $('.box').length;
        var right = 0;
        var answered;
        for(var i=0; i<nums; i++){
            var correct = $('.answers:eq('+i+')').text();
            if( $('.box:eq('+i+')').hasClass('answered')){
                answered = $('.box:eq('+i+')').text();
            } else{
                answered = false;
            }

            if( correct === answered ){
                right++;
            }
        }

        var wrong = nums - right;
        if(wrong === 0){
            correctSeries = (Settings.get('correctSeries'))+1;
            Settings.set({'correctSeries':correctSeries });
        }else{
            wrongSeries = (Settings.get('wrongSeries'))+1;
            Settings.set({'wrongSeries':wrongSeries});
        }
        Settings.set({ 'playThruNum' : playThruNum+1 });

    },

    showCorrects: function () {
        $('.answers').removeClass('hidden');
        $('.numOptions').hide();
    },

    pad2: function(number) {
        return (number < 10 ? '0' : '') + number;
    },

    finish: function () {

        this.undelegateEvents();
        var view;

        if (Settings.get('playThruNum') !== 4) {

            this.answerCheck();
            view = new Sarjamuisti({ model : this.model});
            view.render();

        }else{

            this.answerCheck();

            var seriesLength;
            if(Settings.get('difficulty') === 'easy' ){
                seriesLength = 3;
            }else if(Settings.get('difficulty') === 'medium'){
                seriesLength = 4;
            }else{
                seriesLength = 5;
            }

            var seriesTot = 5;

            //time & date
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10){dd='0'+dd;}
            if(mm<10){mm='0'+mm;}
            var hours = today.getHours();
            var minutes = today.getMinutes();

            var h = this.pad2(hours);
            var m = this.pad2(minutes);

            var results = {
                'pvm' : dd+'/'+mm+'/'+yyyy,
                'klo' : h+':'+m,
                'difficulty' : Settings.get('difficulty'),
                'data' : [
                    {
                        'name' : 'Sarjojen lukumäärä:',
                        'value' : seriesTot
                    },
                    {
                        'name' : 'Sarjojen pituus:',
                        'value' : seriesLength
                    },
                    {
                        'name' : 'Oikeat sarjat:',
                        'value' : Settings.get('correctSeries')
                    },
                    {
                        'name' : 'Väärät sarjat:',
                        'value' : Settings.get('wrongSeries')
                    }
                ]
            };

            var gameId = this.model.get('gameId');
            Settings.set({ 'playThruNum'   : 0 });
            Settings.set({ 'correctSeries' : 0 });
            Settings.set({ 'wrongSeries'   : 0 });


            router.navigate('game/' + this.model.get('gameId') + '/results', true);
            view = new ResultsView({ model: this.model, results: results });
            view.render();

        }
    }
});

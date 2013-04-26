var Sarjamuisti = Backbone.View.extend({
    el: $("#content"),
    template: '#sarjamuistiTemplate',

    render: function () {
        console.log('sarjamuistigame');
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
            arrLength = 5;
            time = arrLength*timePerNum;
        }else{
            arrLength = 7;
            time = arrLength*timePerNum;
        }

        for(i=0; i<arrLength; i++){
            var num = Math.floor(Math.random() * 10);
            numArray.push(num);
        }

        var timer = setTimeout(
            function () {
                $('.numOptions').removeClass('hidden');
                $('.box').addClass('black');
                $('.finish').removeAttr("disabled");
                $('.ser-check').removeAttr("disabled");
                var rand = Math.floor(Math.random() * arrLength);
                $('.box:eq(' + rand + ')').addClass('active').removeClass('available');
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
        'click .finish' : 'finish'
    },

    quitGame: function () {
        this.undelegateEvents();
        Settings.set({ 'playThruNum' : 0 });
        Settings.set({ 'results' : [] });
        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, true);

    },

    numberPicked: function () {
        var target = event.target.innerHTML;
        $('.active').html(target);
        $('.active').addClass('answered');
        $('.active').removeClass('black');
        $('.box').removeClass('active');
        this.nextRandom();
    },

    nextRandom: function () {
        var availableBoxes = $('.available').length;
        var availableArr = [];
        //todo: nyt se lähtee ekan randomin jälkeen aina vasemmalta oikealle
        if(availableBoxes === 0){
            $('.finish').addClass('btn-success');
        }else{
            $('.available.box').each(function ( index ) {
                availableArr.push(index);
            });

            var num = Math.floor(Math.random() * availableArr.length);
            $('.available:eq(' + availableArr[num] + ')').addClass('active').removeClass('available');

        }
    },

    showCorrects: function () {
        $('.answers').removeClass('hidden');
        $('.choices').hide();
    },

    finish: function () {
        this.undelegateEvents();
        var playThruNum = Settings.get('playThruNum');


        function answerCheck () {
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
                var correctSeries = (Settings.get('correctSeries'))+1;
                Settings.set({'correctSeries':correctSeries });
                console.log(correctSeries);
            }else{
                var wrongSeries = (Settings.get('wrongSeries'))+1;
                Settings.set({'wrongSeries':wrongSeries})
            }

            Settings.set({ 'playThruNum' : playThruNum+1 });
        }


        if (Settings.get('playThruNum') === 0) {

            var correctSeries = 0;
            var wrongSeries = 0;
            Settings.set({'correctSeries':correctSeries });
            Settings.set({'wrongSeries':wrongSeries});

            answerCheck();

            var view = new Sarjamuisti({model:this.model});
            view.render();

        }else if (Settings.get('playThruNum') === 1) {

            answerCheck();

            var view = new Sarjamuisti({model:this.model});
            view.render();

        }else if (Settings.get('playThruNum') === 2) {

            answerCheck();

            var view = new Sarjamuisti({model:this.model});
            view.render();

        }else if (Settings.get('playThruNum') === 3) {

            answerCheck();

            var view = new Sarjamuisti({model:this.model});
            view.render();


        }else{

            answerCheck();

            var seriesLength;
            if(Settings.get('difficulty') === 'easy' ){
                seriesLength = 3;
            }else if(Settings.get('difficulty') === 'medium'){
                seriesLength = 5;
            }else{
                seriesLength = 7;
            }

            var seriesTot = 5;
            var correctSeries = Settings.get('correctSeries');
            var wrongSeries = Settings.get('wrongSeries');

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
                        'name' : 'Sarjojen lukumäärä:',
                        'value' : seriesTot
                    },
                    {
                        'name' : 'Sarjojen pituus:',
                        'value' : seriesLength
                    },
                    {
                        'name' : 'Oikeat sarjat:',
                        'value' : correctSeries
                    },
                    {
                        'name' : 'Väärät sarjat:',
                        'value' : wrongSeries
                    }
                ]
            };

            var gameId = this.model.get('gameId');
            this.undelegateEvents();
            Settings.set({ 'playThruNum' : 0 });
            var view = new ResultsView({ model: this.model, results: results });
            view.render();
            router.navigate('game/' + this.model.get('gameId') + '/results', true);



        }




    }

});
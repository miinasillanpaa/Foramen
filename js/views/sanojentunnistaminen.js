var SanojenTunnistaminen = Backbone.View.extend({
    el: (' #content '),
    template: '#sanojenTunnistaminenTemplate',

    render: function () {
        $('#header').empty();
        //todo kategorian saa valita itse?


        Settings.results = [];

        var myView = this;
        var gameId = this.model.get('gameId');

        //todo get rid of debug time 4min
        var exerciseTime = 1000*60*4;
        var moveTime;

        if( Settings.get('difficulty') === 'easy' ){
            moveTime = 1500;
        }else if( Settings.get('difficulty') === 'medium' ){
            //todo more letter is between?
            moveTime = 1000;
        }else{
            moveTime = 500;
        }

        var mover = setInterval(this.scrollText, moveTime);




        var text = this.stringMaker();
        var startPos = text.length - 20;
        Settings.set({startPos : startPos });

        var timer = setTimeout(
            function () {
                clearInterval(mover);
                console.log(this);
                var amount = Settings.get('targetAmount');
                var corrects = Settings.get('scrollerResults').corrects;
                var wrongs = Settings.get('scrollerResults').wrongs - (Settings.get('scrollerResults').selectorPresses)*19;
                var missing = amount - corrects;
                var wrongTot = wrongs+missing;

                var results = {
                  /*  'pvm' : dd+'/'+mm+'/'+yyyy, //todo make global
                    'klo' : h+':'+m, */
                    'difficulty' : Settings.get('difficulty'),
                    'data' : [
                        {
                            'name' : 'Kohteet:',
                            'value' : amount + " kpl"
                        },
                        {
                            'name' : 'Oikein:',
                            'value' : Settings.get('scrollerResults').corrects + " kpl"
                        },
                        {
                            'name' : 'Väärin:',
                            'value' : wrongs + " kpl"
                        },
                        {
                            'name' : 'Puuttuu:',
                            'value' : missing + " kpl"
                        },
                        {
                            'name' : 'Virheet yhteensä:',
                            'value' : wrongTot + " kpl"
                        }
                    ]
                };


                myView.undelegateEvents();
                var view = new ResultsView({ model: myView.model, results: results });
                view.render();
                router.navigate('game/' + gameId + '/results', true);

        },exerciseTime );


        var variables = {
            text : text
        };

        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);

        $('.quit').click(function() {
           clearTimeout(timer);
           clearInterval(mover);
        });

        return this;

    },

    events: {
        'click .onTarget' : 'getSelectorText',
        'click .quit' : 'quitGame'
    },

    quitGame: function () {
        this.undelegateEvents();

        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, {trigger:true});
    },

    scrollText: function () {

        var text = $('.scroller').text().replace(/\s/g, '');
        var selector = "";

        var pos = Settings.get('startPos');
        pos--;
        Settings.set({ startPos : pos });
        $('.scroller').transition({ x: '+=51' })
        selector = text.substr(pos,10);

        Settings.set({ selector : selector })

    },
    stringMaker: function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        var amount;
        var chars;
        var firstRandPos;
        var randomDistance = [];

        if( Settings.get('difficulty') === 'easy'){
            amount = 10;
            chars = 150;
            firstRandPos = Math.floor(Math.random()*(127-137+1)+127);

            for( var j = 0; j < amount; j++ ){
                var to = 5;
                var from = 15;
                var randomDist = Math.floor(Math.random()*(to-from+1)+from);

                randomDistance.push(randomDist);
            }

        }else if( Settings.get('difficulty') === 'medium' ){
            amount = 14;
            chars = 195;
            firstRandPos = Math.floor(Math.random()*(172-182+1)+172);

            for( var j = 0; j < amount; j++ ){
                var to = 5;
                var from = 15;
                var randomDist = Math.floor(Math.random()*(to-from+1)+from);

                randomDistance.push(randomDist);
            }

        }else{
            amount = 20;
            chars = 400;
            firstRandPos = Math.floor(Math.random()*(370-380+1)+370);

            for( var j = 0; j < amount; j++ ){
                 var to = 13;
                 var from = 23;
                 var randomDist = Math.floor(Math.random()*(to-from+1)+from);

                 randomDistance.push(randomDist);
            }
        }

        Settings.set({targetAmount:amount});

        var animals = Settings.get('categories').animals;




        var uniqueItems = [];
        for(var a = 0; a < amount; a++ ){
            var unique = true;
            var randomItem = animals[Math.floor(Math.random() * animals.length )];

            for( var b = 0; b < amount; b++ ){
                if( uniqueItems[b] === randomItem ) {
                    unique = false;
                }
            }

            if(unique){
                uniqueItems.push(randomItem);
            }else{
                a--;
            }
        }






        for( var i=0; i < chars; i++ ){
            text += possible.charAt( Math.floor( Math.random() * possible.length ));

        var arr = [];
        arr.push(firstRandPos);

            //todo haittaako että arr yhden pidempi kuin uniqueItems

            for(var k = 0; k < amount; k++){
                var spot = arr[k]-randomDistance[k];
                arr.push(spot);
                //console.log(k);
                if (i === arr[k] ) {
                    console.log(uniqueItems[k]);
                    text += uniqueItems[k];
                }
            }

        }



        console.log(text);
        //console.log(uniqueItems); //correct answers
        console.log(arr);
        //console.log(randomDistance);
        return text;
    },

    getSelectorText: function () {
        var animals = Settings.get('categories').animals;

        var selectorPresses = Settings.get('scrollerResults').selectorPresses;
        selectorPresses++;
        var corrects = Settings.get('scrollerResults').corrects;
        var wrongs = Settings.get('scrollerResults').wrongs;

        //todo make all vary(randomness)
        var all = 11;
        //var missing = Settings.get('results').missing;
        var _results = _.omit(Settings.get('scrollerResults'));
        var _categories = _.omit(Settings.get('categories'));

        //console.log(animals);
        //todo resuls (kohteeht, oikein, väärin, puuttuu, virheet yhteensä)

        var selector = Settings.get('selector');

        for( var i = 0; i < animals.length; i++){

            if( selector.indexOf(animals[i]) !== -1 ){

                corrects++;
                _results.corrects = corrects;

                console.log('correct '+animals[i] + ' to be removed');
                 delete animals[i];
                _categories.animals = animals;
            }else{
                //todo parse 20=1, 19=0
                wrongs++ ; //remember to parse this ( times 20)
                _results.wrongs = wrongs;

              /*  var wrongs = all-corrects;
                _results.wrongs = wrongs; */
            }
        }
        _results.selectorPresses = selectorPresses;
        Settings.set({ scrollerResults: _results });
        Settings.set({ categories:_categories });

        console.log(Settings.get('scrollerResults'));
        console.log(selector);
    }
});
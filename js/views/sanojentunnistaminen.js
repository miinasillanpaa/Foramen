var SanojenTunnistaminen = Backbone.View.extend({
    el: (' #content '),
    template: '#sanojenTunnistaminenTemplate',

    render: function () {
        $('#header').empty();



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

        var textString = Settings.get('textString');

        var startPos = textString.length - 17;
        Settings.set({startPos : startPos });

        var timer = setTimeout(
            function () {
                clearInterval(mover);
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
        var text = Settings.get('textString');
        var pos = Settings.get('startPos');

        pos--;
        Settings.set({ startPos : pos });

        $('.scroller').transition({ x: '+=50' });
        selector = text.substr(pos,10);
    },
    stringMaker: function () {
        var text = "";
        var textString = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        var amount;
        var chars;
        var firstRandPos;
        var randomDistance = [];

        if( Settings.get('difficulty') === 'easy'){
            amount = 10;
            chars = 150;
            firstRandPos = Math.floor(Math.random()*(127-137+1)+127);

            var to;
            var from;
            var randomDist;

            for( var i = 0; i < amount; i++ ){
                to = 5;
                from = 15;
                randomDist = Math.floor(Math.random()*(to-from+1)+from);

                randomDistance.push(randomDist);
            }

        }else if( Settings.get('difficulty') === 'medium' ){
            amount = 14;
            chars = 195;
            firstRandPos = Math.floor(Math.random()*(172-182+1)+172);

            for( var j = 0; j < amount; j++ ){
                to = 5;
                from = 15;
                randomDist = Math.floor(Math.random()*(to-from+1)+from);

                randomDistance.push(randomDist);
            }

        }else{
            amount = 20;
            chars = 400;
            firstRandPos = Math.floor(Math.random()*(370-380+1)+370);

            for( var k = 0; k < amount; k++ ){
                 to = 13;
                 from = 23;
                 randomDist = Math.floor(Math.random()*(to-from+1)+from);

                 randomDistance.push(randomDist);
            }
        }

        Settings.set({targetAmount:amount});

        var animals = Settings.get('categories').animals;

        var uniqueItems = [];
        for(var l = 0; l < amount; l++ ){
            var unique = true;
            var randomItem = animals[Math.floor(Math.random() * animals.length )];

            for( var m = 0; m < amount; m++ ){
                if( uniqueItems[m] === randomItem ) {
                    unique = false;
                }
            }

            if(unique){
                uniqueItems.push(randomItem);
            }else{
                l--;
            }
        }

        for( var n=0; n < chars; n++ ){
            var posChar = possible.charAt( Math.floor( Math.random() * possible.length ));
            text += '<span>'+ posChar +'</span>';
            textString += posChar;

        var arr = [];
        arr.push(firstRandPos);

            for(var o = 0; o < amount; o++){
                var spot = arr[o]-randomDistance[o];
                arr.push(spot);

                if (n === arr[o] ) {
                    var myItem = uniqueItems[o];
                    textString += myItem;

                    for(var p=0; p<myItem.length; p++) {
                        text += '<span>'+ myItem.charAt(p) +'</span>';
                    }
                }
            }
        }

        Settings.set({ textString:textString });
        return text;
    },

    getSelectorText: function () {
        var animals = Settings.get('categories').animals;

        var selectorPresses = Settings.get('scrollerResults').selectorPresses;
        selectorPresses++;

        var corrects = Settings.get('scrollerResults').corrects;
        var wrongs = Settings.get('scrollerResults').wrongs;

        var _results = _.omit(Settings.get('scrollerResults'));
        var _categories = _.omit(Settings.get('categories'));

        var selector = Settings.get('selector');

        for( var i = 0; i < animals.length; i++ ){

            if( selector.indexOf(animals[i]) !== -1 ){
                corrects++;
                _results.corrects = corrects;

                 delete animals[i];
                _categories.animals = animals;

            }else{
                wrongs++ ;
                _results.wrongs = wrongs;
            }
        }

        _results.selectorPresses = selectorPresses;
        Settings.set({ scrollerResults: _results });
        Settings.set({ categories:_categories });

        console.log(Settings.get('scrollerResults'));
    }
});
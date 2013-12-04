var SanojenTunnistaminen = Backbone.View.extend({
    el: (' #content '),
    template: '#sanojenTunnistaminenTemplate',

    render: function () {
        $('#header').empty().hide();

        var myView = this;
        var gameId = this.model.get('gameId');
        var exerciseTime = 1000*60*4+2000;
        var moveTime;

        var diff = Settings.get('difficulty');
        if( diff === 'easy' ){
            moveTime = 1500;
        }else if( diff === 'medium' ){
            moveTime = 1001;
        }else{
            moveTime = 500;
        }

        var mover = setInterval(this.scrollText, moveTime);

        this.knobify();

        var text = this.stringMaker();

        var textString = Settings.get('textString');

        var startPos = textString.length - 17;
        Settings.set({ startPos : startPos });

        var timer = setTimeout(
            function () {
                window.clearInterval(mover);
                var amount = Settings.get('targetAmount');
                var corrects = Settings.get('scrollerResults').corrects;
                var wrongs = (Settings.get('scrollerResults').wrongs) - (Settings.get('scrollerResults').selectorPresses)*(Settings.get('itemsLenght')-1);
                var missing = amount - corrects;
                var wrongTot = wrongs+missing;

                var date = getDateTime();
                var pvm = date.pvm;
                var klo = date.klo;

                var results = {
                    'pvm' : pvm,
                    'klo' : klo,
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
                Settings.set({ scrollerResults: {   corrects:0,
                                                    wrongs:0,
                                                    selectorPresses:0} });
                Settings.set({ scroller: "" });
                myView.undelegateEvents();

				router.navigate('game/' + gameId + '/results', true);
                var view = new ResultsView({ model: myView.model, results: results });
                view.render();


        },exerciseTime );


        var variables = {
            text : text,
            textCategory : Settings.get('textCategory')
        };

        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);


        $('.quit').click(function() {
           window.clearTimeout(timer);
           window.clearInterval(mover);
        });
        $('.knob').knob({
            change : function (value) {},
            "max": 240,
            "min": 0,
            "readOnly": true

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

    knobify: function () {

        var knobTimer = setInterval(countdown, 1000);
        var totMin, totSec;
        var timeLeft = 240;
        function countdown() {
            if (timeLeft == 0){
                $(".timer").hide();
                window.clearInterval(knobTimer);
            }else{
                totMin = Math.floor(timeLeft/60);
                totSec = Math.floor(timeLeft-(totMin*60));

                function pad2(number){
                    return (number < 10 ? '0' : '') + number
                }

                totSec = pad2(totSec);
                $('.knob').val(timeLeft).trigger("change");
                $('.knob').val(totMin+":"+totSec);
                timeLeft--;

                $('.quit').click( function () {
                    window.clearInterval(knobTimer);
                })
            }
        }
    },

    scrollText: function () {
        var text = Settings.get('textString');
        var pos = Settings.get('startPos');

        pos--;
        Settings.set({ startPos : pos });

        $('.scroller').transition({ x: '+=50' });
        var selector = text.substr(pos,10);
        Settings.set({ selector:selector });
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

        var selectedCat = Settings.get('textCategory');
        var items;
        if(selectedCat === 'eläimet'){
            items = Settings.get('categories').eläimet
        }else if(selectedCat === 'ammatit'){
            items = Settings.get('categories').ammatit
        }else if(selectedCat === 'kasvit'){
            items = Settings.get('categories').kasvit
        }else if(selectedCat === 'kaupungit'){
            items = Settings.get('categories').kaupungit
        }else if(selectedCat === 'miesten nimet'){
            items = Settings.get('categories').miesten
        }else if(selectedCat === 'naisten nimet'){
            items = Settings.get('categories').naisten
        }else if(selectedCat === 'sisustus'){
            items = Settings.get('categories').sisustus
        }else if(selectedCat === 'soittimet'){
            items = Settings.get('categories').soittimet
        }else if(selectedCat === 'työkalut'){
            items = Settings.get('categories').työkalut
        }else if(selectedCat === 'urheilu'){
            items = Settings.get('categories').urheilu
        }else if(selectedCat === 'valtiot'){
            items = Settings.get('categories').valtiot
        }
        Settings.set({ itemsLenght: items.length });

        var uniqueItems = [];
        for(var l = 0; l < amount; l++ ){
            var unique = true;
            var randomItem = items[Math.floor(Math.random() * items.length )];

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
        var category = Settings.get('textCategory');
		if(category === 'miesten nimet') {
			category = 'miesten';
		}else if(category === 'naisten nimet') {
			category = 'naisten';
		}

        var items = Settings.get('categories')[category];

        var selectorPresses = Settings.get('scrollerResults').selectorPresses;
        selectorPresses++;

        var corrects = Settings.get('scrollerResults').corrects;
        var wrongs = Settings.get('scrollerResults').wrongs;

        var _results = _.omit(Settings.get('scrollerResults'));
        var _categories = _.omit(Settings.get('categories'));

        var selector = Settings.get('selector');

        for( var i = 0; i < items.length; i++ ){
            if( selector.indexOf(items[i]) !== -1 ){
                corrects++;
                _results.corrects = corrects;
                 delete items[i];
                _categories.items = items;
            }else{
                wrongs++;
                _results.wrongs = wrongs;
            }
        }
        _results.selectorPresses = selectorPresses;
        Settings.set({ scrollerResults: _results });
        Settings.set({ categories:_categories });
    }
});
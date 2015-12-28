var SanojenTunnistaminen = Backbone.View.extend({
    el: (' #content '),
    template: '#sanojenTunnistaminenTemplate',

    render: function () {

        $('#header').empty().hide();

        var myView, gameId, exerciseTime, moveTime, diff, text, textString, startPos, variables, template;

        Settings.set({itemsArray: []});
        myView = this;
        gameId = this.model.get('gameId');
        exerciseTime = 1000 * 60 * 4 + 2000; //4min+2sec
        diff = Settings.get('difficulty');

        if (diff === 'easy') {
            moveTime = 1500;
        } else if (diff === 'medium') {
            moveTime = 1000;
        } else {
            moveTime = 500;
        }
        window.mover = setInterval(this.scrollText, moveTime);

        this.knobify();
        text = this.stringMaker();
        textString = Settings.get('textString');


        //if user rezises window during the game -> doom
        var textRightOut = this.getWidth();
        startPos = textString.length - textRightOut;
        Settings.set({ startPos : startPos });

        window.timer = setTimeout(
            function () {
                window.clearTimeout(timer);
                window.clearInterval(mover);
                window.clearInterval(knobTimer);

                var amount, corrects, wrongs, missing, wrongTot, date, pvm, klo, results, view, category;

                amount = Settings.get('targetAmount');
                corrects = Settings.get('scrollerResults').corrects;
                wrongs = Settings.get('scrollerResults').wrongs;

                missing = amount - corrects;
                wrongTot = wrongs + missing;

                date = window.getDateTime();
                pvm = date.pvm;
                klo = date.klo;

                results = {
                    'pvm' : pvm,
                    'klo' : klo,
                    'difficulty' : Settings.get('difficulty'),
                    'data' : [
                        {
                            'name' : 'Kuva-aihe',
                            'value' : Settings.get('textCategory').charAt(0).toUpperCase() + Settings.get('textCategory').slice(1).toLowerCase()
                        },
                        {
                            'name' : 'Kohteet:',
                            'value' : amount + " kpl"
                        },
                        {
                            'name' : 'Oikein:',
                            'value' : corrects + " kpl"
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

                Settings.set({
                    scrollerResults: {
                        corrects: 0,
                        wrongs: 0,
                        selectorPresses: 0
                    }
                });

                Settings.set({ scroller: "" });
                myView.unbind();
                myView.undelegateEvents();

				router.navigate('game/' + gameId + '/results', true);
                view = new ResultsView({ model: myView.model, results: results });
                view.render();

        }, exerciseTime );

        variables = {
            text: text,
            textCategory: Settings.get('textCategory')
        };

        template = _.template($(this.template).html(), variables);
        this.$el.html(template);

        $('.quit').click(function() {
           window.clearTimeout(timer);
           window.clearInterval(mover);
           window.clearInterval(knobTimer);
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
      //var gameId = this.model.get('gameId');
      //window.saveInterruptedGame(gameId, Settings.get('gameInstanceId'));
      //$(window).off("resize",this.getWidth);
      this.undelegateEvents();
      this.unbind();

      if (Settings.get('isPotpuriGame')) {
          router.navigate('/potpuri/'+Settings.get('potpuriId'), true);
      }else{
          router.navigate('/', true);
      }

    },

    getWidth: function(){
        'use strict';

        var textRightOut;
        if(window.innerWidth >= 1800){
            textRightOut = 24;
        }else if(window.innerWidth <= 1800 && window.innerWidth > 1700){
            textRightOut = 23;
        }else if(window.innerWidth <= 1700 && window.innerWidth > 1600){
            textRightOut = 22;
        }else if(window.innerWidth <= 1600 && window.innerWidth > 1500){
            textRightOut = 21;
        }else if(window.innerWidth <= 1500 && window.innerWidth > 1400){
            textRightOut = 20;
        }else if(window.innerWidth <= 1400 && window.innerWidth > 1300){
            textRightOut = 19;
        }else if(window.innerWidth <= 1300 && window.innerWidth > 1200){
            textRightOut = 18;
        }else if(window.innerWidth <= 1200 && window.innerWidth > 1100){
            textRightOut = 17;
        }else if(window.innerWidth <= 1100 && window.innerWidth > 950){
            textRightOut = 16;
        }else if(window.innerWidth <= 950 && window.innerWidth > 900){
            textRightOut = 15;
        }else if(window.innerWidth <= 900 && window.innerWidth > 800){
            textRightOut = 14;
        }else if(window.innerWidth <= 800 && window.innerWidth > 700){
            textRightOut = 13;
        }else if(window.innerWidth <=700 && window.innerWidth > 600){
            textRightOut = 12;
        }else{
            textRightOut = 11;
        }

        return textRightOut;
    },

    knobify: function () {
        var totMin, totSec, timeLeft;
        timeLeft = 240;

        function pad2(number){
            return (number < 10 ? '0' : '') + number;
        }
        function countdown() {
            if (timeLeft === 0) {
                $(".timer").hide();
            } else {
                totMin = Math.floor(timeLeft / 60);
                totSec = Math.floor(timeLeft - (totMin * 60));
                totSec = pad2(totSec);
                $('.knob').val(timeLeft).trigger("change");
                $('.knob').val(totMin+":"+totSec);
                timeLeft--;
            }
        }

        window.knobTimer = setInterval(countdown, 1000);

    },

    scrollText: function () {
        var text, pos, selector;
        text = Settings.get('textString');
        pos = Settings.get('startPos') - 1;

        Settings.set({ startPos : pos });
        $('.scroller').transition({ x: '+=50' });
        selector = text.substr(pos,11);
        Settings.set({ selector: selector });

        //debug
        //console.log('selector', selector);
        //$('.hint').html(selector);
    },

    stringMaker: function () {
        var text, textString, possible, amount, chars, firstRandPos, randomDistance, to, from, randomDist, items, selectedCat, uniqueItems, i;
        text = "";
        textString = "";
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        randomDistance = [];

        if( Settings.get('difficulty') === 'easy'){
            amount = 9;
            chars = 150;
            firstRandPos = Math.floor(Math.random()*(127-137+1)+127);

            for( i = 0; i < amount; i++ ){
                to = 5;
                from = 15;
                randomDist = Math.floor(Math.random()*(to-from+1)+from);
                randomDistance.push(randomDist);
            }

        }else if( Settings.get('difficulty') === 'medium' ){
            amount = 12;
            chars = 195;
            firstRandPos = Math.floor(Math.random()*(172-182+1)+172);

            for( i = 0; i < amount; i++ ){
                to = 5;
                from = 15;
                randomDist = Math.floor(Math.random()*(to-from+1)+from);
                randomDistance.push(randomDist);
            }

        }else{
            amount = 18;
            chars = 400;
            firstRandPos = Math.floor(Math.random()*(370-380+1)+370);

            for( i = 0; i < amount; i++ ){
                to = 13;
                from = 23;
                randomDist = Math.floor(Math.random()*(to-from+1)+from);
                randomDistance.push(randomDist);
            }
        }

        Settings.set({targetAmount:amount});

        selectedCat = Settings.get('textCategory');
        if(selectedCat === 'eläimet'){
            items = Settings.get('categories').eläimet;
        }else if(selectedCat === 'ammatit'){
            items = Settings.get('categories').ammatit;
        }else if(selectedCat === 'kasvit'){
            items = Settings.get('categories').kasvit;
        }else if(selectedCat === 'kaupungit'){
            items = Settings.get('categories').kaupungit;
        }else if(selectedCat === 'miesten nimet'){
            items = Settings.get('categories').miesten;
        }else if(selectedCat === 'naisten nimet'){
            items = Settings.get('categories').naisten;
        }else if(selectedCat === 'sisustus'){
            items = Settings.get('categories').sisustus;
        }else if(selectedCat === 'soittimet'){
            items = Settings.get('categories').soittimet;
        }else if(selectedCat === 'työkalut'){
            items = Settings.get('categories').työkalut;
        }else if(selectedCat === 'urheilu'){
            items = Settings.get('categories').urheilu;
        }else if(selectedCat === 'valtiot'){
            items = Settings.get('categories').valtiot;
        }
        Settings.set({ itemsLenght: items.length });

        uniqueItems = [];
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

        for( var n = 0; n < chars; n++ ){
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

        Settings.set({ textString: textString });
        return text;
    },

    getSelectorText: function () {
        var category, items, storeItems, selectorPresses, corrects, wrongs, _results, _categories, selector, correctAnswer, buttonClickedInfoElem;

        category = Settings.get('textCategory');
		if(category === 'miesten nimet') {
			category = 'miesten';
		}else if(category === 'naisten nimet') {
			category = 'naisten';
		}

        if (Settings.get('itemsArray').length > 0) {
            console.log('itemsArray not empty');
            items = Settings.get('itemsArray');
        } else {
            console.log('itemsArray was empty');
            items = Settings.get('categories')[category].slice(0);
        }


        selectorPresses = Settings.get('scrollerResults').selectorPresses+1;

        corrects = Settings.get('scrollerResults').corrects;
        wrongs = Settings.get('scrollerResults').wrongs;
        _results = Settings.get('scrollerResults');
        selector = Settings.get('selector');
        console.warn('selector', selector);
        correctAnswer = false;

        for( var i = 0; i < items.length; i++ ){
            if( selector.indexOf(items[i]) !== -1 ){
                correctAnswer = true;
                _results.corrects++;

                console.warn('item found', items[i]);
                items.splice(i, 1);
                Settings.set({itemsArray: items});
                console.log(items);
            }
        }

        buttonClickedInfoElem = this.$('.onTarget-pressed-info');
        if(correctAnswer){
            buttonClickedInfoElem.show().html('Oikein!').removeClass('danger').addClass('success');
        }else{
            _results.wrongs++;
            buttonClickedInfoElem.show().html('Väärin meni').removeClass('success').addClass('danger');
        }

        buttonClickedInfoElem.fadeOut(4000);
        _results.selectorPresses = selectorPresses;
        Settings.set({ scrollerResults: _results });
        console.log(_results);
    }
});

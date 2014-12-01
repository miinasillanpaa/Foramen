var KIM = Backbone.View.extend({
    el: $(' #content '),
    template: '#KIMTemplate',

    initialize: function () {
		$(".overlay").css("display","block");
        $(".modal").css('display','block');
    },

    render: function () {
        $('#header').empty().hide();

        var visible = this.itemsLength()*4500;
        var targets = this.renderTargets();
        Settings.set({targets:targets});
        var allItems = this.addBluffs(targets);

        var knobMax;
        if (Settings.get('difficulty') === 'easy') {
            knobMax = visible.toString();
        }else if(Settings.get('difficulty')  === 'medium'){
            knobMax = visible.toString();
        }else{
            knobMax = visible.toString();
        }

        var variables = {targets:targets,bluffs:allItems,knobMax:knobMax};
        var template = _.template( $(this.template).html(), variables ) ;

        this.$el.html(template);
        var timer;

       var self = this;
        $("#content").imagesLoaded( function (){
			$(".modal").css('display','none');
			$(".overlay").css('display','none');
            self.knobify();
            timer = setTimeout(
                function() {
                    if( $('.targets').length > 0 ){
                        $('.targets').remove();
                    }
                    $('.allItems').removeClass('hidden');
                },visible);
        });

		$('.finish').click( function () {
			window.clearInterval(timer);
			window.clearInterval(App.knobTimer);
		});

		$('.quit').click( function() {
            window.clearTimeout(timer);
        });

        $('.knob').knob({
            change : function (value) {},
            "max": (knobMax/1000)-1,
            "min": 0,
            "readOnly": true
        });

        return this;

    },

    events: {
        'click .selectable' : 'selectItem',
        'click .finish' : 'checkCorrects',
        'click .quit' : 'quitGame'
    },

    quitGame: function () {
      var gameId = this.model.get('gameId');
      window.saveInterruptedGame(gameId, Settings.get('gameInstanceId'));
        this.undelegateEvents();
        Settings.set({'playThruNum' : 0});
        router.navigate('/', true);
    },

    knobify: function () {
        $('.timer').show();
        App.knobTimer = setInterval(countdown, 1000);
        var totMin, totSec;
        var timeLeft = (this.itemsLength()*4.5)-1;

        function pad2(number){
            return (number < 10 ? '0' : '') + number;
        }

        function countdown() {
            if (timeLeft <= 0) {
                $(".timer").hide();
                window.clearInterval(App.knobTimer);
            } else {
                totMin = Math.floor(timeLeft/60);
                totSec = Math.floor(timeLeft-(totMin*60));
                totSec = pad2(totSec);
                $('.knob').val(timeLeft).trigger("change");
                $('.knob').val(totMin+":"+totSec);
                timeLeft--;

                $('.quit').click( function () {
                    window.clearInterval(App.knobTimer);
                });
                $('.finish').click( function () {
                    window.clearInterval(App.knobTimer);
                });
            }
        }
    },

    selectItem: function () {
        var target = $(event.target);
        if (target.hasClass('selected')) {
            target.toggleClass('selected');
        } else {

            if ($('.selected').length === Settings.get('targets').length) {

                $('#content').find('button').attr('disabled','disabled');
                $('#content').find('img').prop('disabled',true);
				$('.overlay').css('display','block');
                $('.info-modal').show().html(
                    'Olet jo valinnut kaikki '+ $('.selected').length + ' esinettä. <br/><br/>' +
                    'Voit poistaa valinnan koskettamalla. <button onclick="window.hideModal();" class="btn btn-block btn-primary hide-modal"> Ok </button>'
                );

            } else {
                target.toggleClass('selected');
            }
        }
    },

    itemsLength: function () {
        var diff = Settings.get('difficulty');
        var itemsLength;
        if (diff === 'easy') {
            itemsLength = 5;
            this.$('.items').addClass('kim-easy');
        } else if(diff === 'medium') {
            itemsLength = 8;
            this.$('.items').addClass('kim-medium');
        } else {
            itemsLength = 14;
            this.$('.items').addClass('kim-hard');
        }
        return itemsLength;
    },

    renderTargets: function () {
        var itemsLength = this.itemsLength();

        var targetsArr = [];

        for(var i=0; i<itemsLength; i++){
            var unique = true;
            var rand = Math.floor((Math.random()) * 68 );

            for(var j=0; j<itemsLength; j++){
                if(targetsArr[j] === rand ){
                    unique = false;
                }
            }
            if(unique){
                targetsArr.push(rand);
            }else{
                i--;
            }
        }

        return targetsArr;
    },

    addBluffs: function (targets) {
        $('.finish').removeClass('hidden');

        var itemsLength = this.itemsLength();

        var bluffsArr = [];
        for(var i=0; i<itemsLength; i++){
            var unique = true;
            var rand = Math.floor((Math.random()) * 68 );

            for(var j=0; j<itemsLength; j++){
                if(bluffsArr[j] === rand){
                    unique = false;

                }else if(targets[j] === rand){
                    unique = false;
                }
            }

            if(unique){
                bluffsArr.push(rand);
            }else{
                i--;
            }
        }

        for(var k=0; k<itemsLength; k++){
            bluffsArr.push(targets[k]);
        }

        function randomizeArray( myArray ) {
            var i = myArray.length, j, tempi, tempj;
            if ( i === 0 ) return false;
            while ( --i ) {
                j = Math.floor( Math.random() * ( i + 1 ) );
                tempi = myArray[i];
                tempj = myArray[j];
                myArray[i] = tempj;
                myArray[j] = tempi;
            }
        }

        randomizeArray(bluffsArr);

        return bluffsArr;
    },

    checkCorrects: function () {
        $('.finish').addClass('hidden');
        var targets = Settings.get('targets');
        var visible = targets.length*4500;

        var playthruNum = Settings.get('playThruNum');

        playthruNum++;
        Settings.set({playThruNum:playthruNum});

        var targetImg = [];
        for( var i=0; i<targets.length; i++ ) {
            var img = './pics/KIM/'+targets[i]+'.png';
            targetImg.push(img);
        }

        var correct=0;
        var wrong=0;
        var selected = [];

        for(var j=0; j < $('.selected').length; j++){
            var selection = $('img.selected:nth('+j+')').attr('src');
            selected.push(selection);
            if( $.inArray(selection, targetImg) > -1 ){

                correct++;

                if ( $('img.selected:nth('+j+')').attr('src') === selection ){
                    $('img.selected:nth('+j+')').addClass('success-border');
                }

            }else if( $.inArray(selection, targetImg) === -1 ){
                wrong++;
            }
        }

        this.$('.kim-color-hint').removeClass('hidden');
        $('img.selected').removeClass('selected');

        var arr = Settings.get('results');
        var obj = {round:playthruNum, correct:correct, wrong:wrong, tot:targets.length};
        arr.push(obj);
        Settings.set({results:arr});

        for(var k=0; k<targetImg.length; k++){
            if( ($.inArray(targetImg[k], selected)) === -1 ){
                $(".allItems img[src="+'"'+targetImg[k]+'"'+"]").addClass('warning-border');
            }
        }

        var that = this;
        if ((correct === targets.length && wrong === 0) || (playthruNum === 10)) {

            var date = getDateTime();
            var pvm = date.pvm;
            var klo = date.klo;

            var round1 = Settings.get('results')[0];

            var emptyRound = {
                correct:    "-",
                wrong:      "-",
                tot:        "-"
            };

            var round2 = emptyRound;
            var round3 = emptyRound;
            var round4 = emptyRound;
            var round5 = emptyRound;
            var round6 = emptyRound;
            var round7 = emptyRound;
            var round8 = emptyRound;
            var round9 = emptyRound;
            var round10 = emptyRound;

            if(Settings.get('results')[1]){
                round2 = Settings.get('results')[1];
            }
            if(Settings.get('results')[2]){
                round3 = Settings.get('results')[2];
            }
            if(Settings.get('results')[3]){
                round4 = Settings.get('results')[3];
            }
            if(Settings.get('results')[4]){
                round5 = Settings.get('results')[4];
            }
            if(Settings.get('results')[5]){
                round6 = Settings.get('results')[5];
            }
            if(Settings.get('results')[6]){
                round7 = Settings.get('results')[6];
            }
            if(Settings.get('results')[7]){
                round8 = Settings.get('results')[7];
            }
            if(Settings.get('results')[8]){
                round9 = Settings.get('results')[8];
            }
            if(Settings.get('results')[9]){
                round10 = Settings.get('results')[9];
            }

            var results = {
                'pvm' : pvm,
                'klo' : klo,
                'difficulty': Settings.get('difficulty'),
                'data' : [
                    {
                        'name' : 'Kierrosten määrä:',
                        'value' : Settings.get('playThruNum')
                    },
                    {
                        'name' : 'Kierros 1:',
                        'value' : round1.correct +" / "+round1.tot
                    },
                    {
                        'name' : 'Kierros 2:',
                        'value' : round2.correct +" / "+round2.tot
                    },
                    {
                        'name' : 'Kierros 3:',
                        'value' : round3.correct +" / "+round3.tot
                    },
                    {
                        'name' : 'Kierros 4:',
                        'value' : round4.correct +" / "+round4.tot
                    },
                    {
                        'name' : 'Kierros 5:',
                        'value' : round5.correct +" / "+round5.tot
                    },
                    {
                        'name' : 'Kierros 6:',
                        'value' : round6.correct +" / "+round6.tot
                    },
                    {
                        'name' : 'Kierros 7:',
                        'value' : round7.correct +" / "+round7.tot
                    },
                    {
                        'name' : 'Kierros 8:',
                        'value' : round8.correct +" / "+round8.tot
                    },
                    {
                        'name' : 'Kierros 9:',
                        'value' : round9.correct +" / "+round9.tot
                    },
                    {
                        'name' : 'Kierros 10:',
                        'value' : round10.correct +" / "+round10.tot
                    }
                ]
            };

            Settings.set({ 'playThruNum' : 0 });
            this.undelegateEvents();
			router.navigate('game/' +this.model.get('gameId') + '/results', true);
            var view = new ResultsView({model:this.model, results: results});
            view.render();

        }else{

            this.knobify();
            $('.selectable').hide();
            $('.warning-border').show();
            $('.success-border').show();
            var timer = setTimeout(function() {
                    var bluffs = that.addBluffs(targets);
                    for(var i=0; i < $('.allItems img').length; i++){
                        var img = '<img class="kim-item selectable" src="./pics/KIM/'+bluffs[i]+'.png"/>';
                        $('.allItems img:nth('+i+')').replaceWith(img);
                    }
                    $('.kim-color-hint').addClass('hidden');
                    $('.selectable').show().removeClass('warning-border success-border danger-border selected');
            }, visible);

            $('.quit').click( function() {
                clearTimeout(timer);
            });
        }
    }
});

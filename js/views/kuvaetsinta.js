var KuvaEtsinta = Backbone.View.extend({
    el: $("#content"),
    template: '#kuvaEtsintaTemplate',

    render: function () {
        console.log('kalapeli');
        //empty headerview
        $('#header').empty();

       	var startTime = new Date().getTime();
        Settings.set({ startTime : startTime });

        if(Settings.get('difficulty') == 'easy'){
            var easyGame = this.renderEasyGame();
            var variables = { targetPic: easyGame.targetPic, myArr: easyGame.myArr, randomSpots: easyGame.randomSpots };

        }else if(Settings.get('difficulty') == 'medium'){
            var mediumGame = this.renderMediumGame();
            var variables = { targetPic: mediumGame.targetPic, myArr: mediumGame.myArr, randomSpots: mediumGame.randomSpots }

        }else{
            var hardGame = this.renderHardGame();
            var variables = { targetPic: hardGame.targetPic, myArr: hardGame.myArr, randomSpots: hardGame.randomSpots }
        }

        var template = _.template($(this.template).html(), variables);
        this.$el.html(template);

        //render corrects
        for (i = 0; i < variables.randomSpots.length; i++) {
            $('.item-collection img:eq(' + variables.randomSpots[i] + ')').addClass('correct');
        }

        return this;

    },

    renderEasyGame: function () {

        var category = 'kalat';

        //creating target picture
        var targetRandom = Math.floor((Math.random() * 20) + 1);
        var targetPic = './pics/' + category + '/' + targetRandom + '.png';

        //creating random items
        var arr = [];
        for (var i = 0; i < 32; i++) {
            var random = Math.floor((Math.random() * 20) + 1);

            while (random === targetRandom) {
                random = Math.floor((Math.random() * 20) + 1);
            }

            var itemPic = './pics/' + category + '/' + random + '.png';
            var obj = {itemPic: itemPic};
            arr.push(obj);

        }

        //overriding some random items with target items
        var randomSpots = [];

        for (var i = 0; i < 10; i++) {
            var unique = true;
            var randomSpot = Math.floor((Math.random() * 31) + 1);

            for (var j=0; j<10; j++){
                if(randomSpots[j] === randomSpot){
                    unique = false;
                }
            }
            if(unique){
                randomSpots.push(randomSpot);
                arr[randomSpot] = {itemPic: targetPic};
            }else{
                i--;
            }

        }

        console.log(randomSpots);

        return {myArr: arr, targetPic: [{'targetPic':targetPic}], randomSpots: randomSpots}
    },

    renderMediumGame: function () {

        var category = 'kalat';

        //creating target pictures
        var targets = [];

        for(var i=0; i < 2; i++) {
            var unique = true;
            var target = Math.floor((Math.random() * 20) + 1);

            for(var j=0; j<2; j++){
                if(targets[j] === target){
                    unique = false;
                }
            }
            if(unique){
                targets.push(target);
            }else{
                i--;
            }
        }

        var targetPicOne = './pics/' + category + '/' + targets[0] + '.png';
        var targetPicTwo = './pics/' + category + '/' + targets[1] + '.png';

        //creating random items
        var arr = [];
        for (var i = 0; i < 32; i++) {
            var random = Math.floor((Math.random() * 20) + 1);

            while (random === targets[0] || random === targets[1] ) {
                random = Math.floor((Math.random() * 20) + 1);
            }

            var itemPic = './pics/' + category + '/' + random + '.png';
            var obj = {itemPic: itemPic};
            arr.push(obj);

        }

        //overriding some random items with target items
        var randomSpots = [];
        var uniqueNum = 0;
        for (var i = 0; i < 10; i++) {
            var unique = true;
            var randomSpot = Math.floor((Math.random() * 31) + 1);

            for (var j=0; j<10; j++){
                if(randomSpots[j] === randomSpot){
                    unique = false;
                }
            }

            if(unique){
                uniqueNum++;
                randomSpots.push(randomSpot);

                    if(uniqueNum < 6){
                       arr[randomSpot] = {itemPic: targetPicOne};
                    }else{
                       arr[randomSpot] = {itemPic: targetPicTwo};
                   }

            }else{
                i--;
            }

        }

        return {myArr: arr, targetPic: [{ 'targetPic':targetPicOne}, {'targetPic':targetPicTwo }], randomSpots: randomSpots}
    },

    renderHardGame: function () {

        var category = 'kalat';

        //creating target pictures
        var targets = [];

        for(var i=0; i < 3; i++) {
            var unique = true;
            var target = Math.floor((Math.random() * 20) + 1);

            for(var j=0; j<3; j++){
                if(targets[j] === target){
                    unique = false;
                }
            }
            if(unique){
                targets.push(target);
            }else{
                i--;
            }
        }


        var targetPicOne = './pics/' + category + '/' + targets[0] + '.png';
        var targetPicTwo = './pics/' + category + '/' + targets[1] + '.png';
        var targetPicThree = './pics/' + category + '/' + targets[2] + '.png';

        //creating random items
        var arr = [];
        for (var i = 0; i < 32; i++) {
            var random = Math.floor((Math.random() * 20) + 1);

            while (random === targets[0] || random === targets[1] || random == targets[2] ) {
                random = Math.floor((Math.random() * 20) + 1);
            }

            var itemPic = './pics/' + category + '/' + random + '.png';
            var obj = {itemPic: itemPic};
            arr.push(obj);

        }

        //overriding some random items with target items
        var randomSpots = [];
        var uniqueNum = 0;
        for (var i = 0; i < 10; i++) {
            var unique = true;
            var randomSpot = Math.floor((Math.random() * 31) + 1);

            for (var j=0; j<10; j++){
                if(randomSpots[j] === randomSpot){
                    unique = false;
                }
            }

            if(unique){
                uniqueNum++;
                randomSpots.push(randomSpot);

                if(uniqueNum < 4){
                    arr[randomSpot] = {itemPic: targetPicOne};
                }else if(uniqueNum < 7){
                    arr[randomSpot] = {itemPic: targetPicTwo};
                }else{
                    arr[randomSpot] = {itemPic: targetPicThree};
            }

            }else{
                i--;
            }

        }

        return {myArr: arr, targetPic: [{ 'targetPic':targetPicOne }, { 'targetPic':targetPicTwo }, { 'targetPic':targetPicThree }], randomSpots: randomSpots}
    },

    events: {
        'click .selectable': 'selectItem',
        'click .finish': 'gameFinish',
        'click .quit': 'quitGame'
    },

    selectItem: function () {
        var target = $(event.target);
        target.toggleClass('selected');
    },

    quitGame: function () {
		this.undelegateEvents();

        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, true);
    },

    gameFinish: function () {
        var date = getDateTime();
        var pvm = date.pvm;
        var klo = date.klo;

        //other results
        var selectable = $('.selectable').length;
        var selected = $('.selected').length;
        var correctAnswers = $('.selected.correct').length;
        var allCorrects = $('.correct').length;
        var wrong = selected - correctAnswers;
        var missing = allCorrects - correctAnswers;
        var allWrongs = wrong + missing;

        //Snapshot of the game
        var gameScreen = $("#content").html();

        //get timespent
        var startTime = Settings.get('startTime');
        var endTime = new Date().getTime();
        var time = endTime - startTime;

        var timeSpent = msToStr(time);


         var results = {
             'pvm' : pvm,
             'klo' : klo,
             'difficulty': Settings.get('difficulty'),
             'data' : [
                 {
                    'name' : 'Käytetty aika:',
                    'value' : timeSpent
                 },
                 {
                     'name' : 'Kohteiden määrä:',
                     'value' : allCorrects+' kpl'
                 },
                 {
                     'name' : 'Oikeat valinnat:',
                     'value' : correctAnswers+' kpl'
                 },
                 {
                     'name' : 'Väärät valinnat:',
                     'value' : wrong+' kpl'
                 },
                 {
                     'name' : 'Puuttuvat valinnat:',
                     'value' : missing+' kpl'
                 },
                 {
                     'name' : 'Virheet yhteensä:',
                     'value' : allWrongs+' kpl'
                 },
                 {
                     'name' : '',
                     'value' : '<button class="btn btn-large btn-primary btn-block btn-bolder screen">Näytä kuvaruutu</button>'
                 }
             ],
             'hiddenData':
                 {
                     'gameScreen' : gameScreen
                 }

            };

        var gameId = this.model.get('gameId');
        var view = new ResultsView({ model: this.model, results: results });
        view.render();
        router.navigate('game/' + this.model.get('gameId') + '/results', true);

    }




});
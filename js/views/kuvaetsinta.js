var KuvaEtsinta = Backbone.View.extend({
    el: $("#content"),
    template: '#kuvaEtsintaTemplate',
    initialize: function () {

    },
    render: function () {

        //empty headerview
        $('#header').html('');

        var startTime = new Date().getTime();
        Settings.set({ startTime : startTime });

        var category = 'kalat';

        //creating target picture
        var targetRandom = Math.floor((Math.random() * 20) + 1);
        var targetPic = './pics/' + category + '/' + targetRandom + '.png';

        //creating random items
        var arr = [];
        for (i = 0; i < 32; i++) {
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
        for (i = 0; i < 10; i++) {
            var randomSpot = Math.floor((Math.random() * 31) + 1);
            randomSpots.push(randomSpot);
            arr[randomSpot] = {itemPic: targetPic};
        }


        var variables = {targetPic: targetPic, myArr: arr };
        var template = _.template($(this.template).html(), variables);
        this.$el.html(template);

        //add correct class to target fishes
        for (i = 0; i < randomSpots.length; i++) {
            $('.item-collection img:eq(' + randomSpots[i] + ')').addClass('correct');
        }

        return this;

    },
    //TODO: difficulties to kuvaetsinta
    renderEasyGame: function () {

    },

    renderMediumGame: function () {

    },

    renderHardGame: function () {

    },

    events: {
        'click .selectable': 'selectItem',
        'click .finish': 'gameFinish',
        'click .quit': 'quitGame'
    },

    selectItem: function () {

        var $target = $(event.target);
        $target.toggleClass('selected');
    },

    quitGame: function () {
        this.undelegateEvents();
        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, true);

    },

    gameFinish: function () {
        this.undelegateEvents();

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

        //other results
        var selectable = $('.selectable').length;
        var selected = $('.selected').length;
        var correctAnswers = $('.selected.correct').length;
        var allCorrects = $('.correct').length;
        var wrong = selected - correctAnswers;
        var missing = allCorrects - correctAnswers;
        var allWrongs = wrong + missing;

        //get timespent
        var startTime = Settings.get('startTime');
        var endTime = new Date().getTime();
        var time = endTime - startTime;

        function msToStr(ms){
            var sec = ms / 1000;
            var nummin = Math.floor((((sec % 31536000) % 86400) % 3600) / 60);
            var numsec = Math.floor(((sec % 31536000) % 86400) % 3600) % 60;

            if(nummin){
                return nummin +' min ' + numsec +' s';
            }else{
                return numsec + ' s';
            }
        }

        var timeSpent = msToStr(time);


         var results = {
             'pvm' : dd+'/'+mm+'/'+yyyy,
             'klo' : hours+':'+minutes,
             'difficulty': Settings.get('difficulty'),
             'timeSpent' : timeSpent,
             'targets' : allCorrects,
             'correct' : correctAnswers,
             'wrong' : wrong,
             'missing' : missing,
             'allWrongs' : allWrongs
            };

        var gameId = this.model.get('gameId');
        var view = new ResultsView({ model: this.model, results: results });
        view.render();


    }




});
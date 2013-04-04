var Sarjamuisti = Backbone.View.extend({
    el: $("#content"),
    template: '#sarjamuistiTemplate',

    render: function () {

        $('#header').empty();

        var choices = [0,1,2,3,4,5,6,7,8,9]
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
                $('.check').removeAttr("disabled");
                var rand = Math.floor(Math.random() * arrLength);
                $('.box:eq(' + rand + ')').addClass('active').removeClass('available');
            },time);

        var variables = { numArray : numArray, choices : choices };

        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);
        return this;

    },

    events:{
        'click .quit': 'quitGame',
        'click .choices' : 'numberPicked',
        'click .check' : 'showCorrects',
        'click .finish' : 'finish'
    },

    quitGame: function () {
        this.undelegateEvents();

        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, true);

    },

    numberPicked: function () {
        var target= event.target.innerHTML;
        $('.active').html(target);
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
        var view = new Sarjamuisti({model:this.model});
        view.render();

    }

});
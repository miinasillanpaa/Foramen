var Sarjamuisti = Backbone.View.extend({
    el: $("#content"),
    template: '#sarjamuistiTemplate',

    render: function () {

        $('#header').empty();


        var choices = [0,1,2,3,4,5,6,7,8,9]
        var numArray = [];
        var timePerNum = 1500;
        var time;
        var arrLenght;

        if(Settings.get('difficulty') == 'easy'){
            arrLenght = 3;
            time = arrLenght*timePerNum;
        }else if(Settings.get('difficulty') == 'medium'){
            arrLenght = 5;
            time = arrLenght*timePerNum;
        }else{
            arrLenght = 7;
            time = arrLenght*timePerNum;
        }

        for(i=0; i<arrLenght; i++){
            var num = Math.floor(Math.random() * 10);
            numArray.push(num);
        }
        Settings.set({ numArray:numArray });
        console.log(numArray); //oikeat tallessa täällä!

        setTimeout(
            function () {
                $('.numOptions').removeClass('hidden');
                $('.box').addClass('black');

                var rand = Math.floor(Math.random() * arrLenght);
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
        'click .check' : 'checkAnswers',
        'click .finish' : 'finish'
    },

    quitGame: function () {
        this.undelegateEvents();
        this.$el.removeData().unbind();
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

        //todo: nyt se lähtee ekan randomin jälkeen aina vasemmalta oikealle
        if(availableBoxes === 0){
            console.log('finihs')
        }else{
            var available = $('.available').index('.box');
            console.log(available)
            $('.box:eq(' + available+ ')').addClass('active').removeClass('available');
        }


    },

    checkAnswers: function () {
        var numArray = Settings.get('numArray');
        console.log(numArray);
    },

    finish: function () {



    }

});
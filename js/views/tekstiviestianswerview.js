var TekstiviestiAnswerView = Backbone.View.extend({
    el: ( '#content' ),
    template: '#tekstiviestiAnswerTemplate',
    initialize: function () {

    },

    render: function () {
        console.log(this);
        var variables = { questions: this.options.variables.questions,
                          senders: this.options.variables.senders,
                          receivers: this.options.variables.receivers,
                          places: this.options.variables.places,
                          times: this.options.variables.times,
                          items: this.options.variables.items,
                          corrects: this.options.variables.corrects,
                          correctStrings: this.options.variables.correctStrings};
        //console.log(variables);
        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);


        //navigational classes to buttons
        $('button:first').addClass('btn-primary question-sender');
        $('button:eq(1)').addClass('question-receiver');
        $('button:eq(2)').addClass('question-place');
        $('button:eq(3)').addClass('question-time');
        $('button:eq(4)').addClass('question-item');


        //console.log(this.options.variables.corrects.time);

        //correct anwers
        $('.options-senders button:eq('+ this.options.variables.corrects.sender +')').addClass('correct');
        $('.options-receivers button:eq('+ this.options.variables.corrects.receiver +')').addClass('correct');
        $('.options-places button:eq('+ this.options.variables.corrects.place +')').addClass('correct');
        $('.options-times button:eq('+ this.options.variables.corrects.time +')').addClass('correct');
        $('.options-items button:eq('+ this.options.variables.corrects.item +')').addClass('correct');

        return this;
    },

    events:{
        'click .question-sender' : "activateSender",
        'click .question-receiver' : 'activateReceiver',
        'click .question-place' : 'activatePlace',
        'click .question-time' : 'activateTime',
        'click .question-item' : 'activateItem',

        'click .options-senders .a-button' : 'toReceiver',
        'click .options-receivers .a-button' : 'toPlace',
        'click .options-places .a-button' : 'toTime',
        'click .options-times .a-button' : 'toItem',
        'click .options-items .a-button' : 'inItem',

        'click .check' : 'checkAnswers',
        'click .correct-answers' : 'showCorrectAnswers',
        'click .continue' : 'continue'


    },


    activateSender : function () {
        $('.q-button').removeClass('btn-primary');
        $('.question-sender').addClass('btn-primary');

        $('.options').addClass('hidden');
        $('.options-senders').removeClass('hidden');
    },
    activateReceiver : function () {
        $('.q-button').removeClass('btn-primary');
        $('.question-receiver').addClass('btn-primary');

        $('.options').addClass('hidden');
        $('.options-receivers').removeClass('hidden');

    },
    activatePlace : function () {
        $('.q-button').removeClass('btn-primary');
        $('.question-place').addClass('btn-primary');

        $('.options').addClass('hidden');
        $('.options-places').removeClass('hidden');
    },
    activateTime : function () {
        $('.q-button').removeClass('btn-primary');
        $('.question-time').addClass('btn-primary');

        $('.options').addClass('hidden');
        $('.options-times').removeClass('hidden');
    },
    activateItem : function () {
        $('.q-button').removeClass('btn-primary');
        $('.question-item').addClass('btn-primary');

        $('.options').addClass('hidden');
        $('.options-items').removeClass('hidden');
    },



    toReceiver : function () {
        $('.options-senders .a-button').removeClass('btn-primary');
        //given answer
        var $answer = $(event.target);
        $answer.addClass('btn-primary');
        //console.log($answer);

        var dom = event.target;
        Settings.set({ txtSenderDom : dom });

        this.activateReceiver();

    },
    toPlace : function () {
        $('.options-receivers .a-button').removeClass('btn-primary');
        var $answer = $(event.target);
        $answer.addClass('btn-primary');

        var dom = event.target;
        Settings.set({ txtReceiverDom : dom });

        this.activatePlace();
    },
    toTime : function () {
        $('.options-places .a-button').removeClass('btn-primary');
        var $answer = $(event.target);
        $answer.addClass('btn-primary');

        var dom = event.target;
        Settings.set({ txtPlaceDom : dom });

        this.activateTime();
    },
    toItem : function () {
        $('.options-times .a-button').removeClass('btn-primary');
        var $answer = $(event.target);
        $answer.addClass('btn-primary');

        var dom = event.target;
        Settings.set({ txtTimeDom : dom });

        this.activateItem();
    },
    inItem : function () {
        $('.options-items .a-button').removeClass('btn-primary');
        var $answer = $(event.target);
        $answer.addClass('btn-primary');

        var dom = event.target;
        Settings.set({ txtItemDom : dom });

    },

    checkAnswers : function () {
        //$('.options').addClass('hidden');
        $('.q-button').removeClass('btn-primary');

        var senderDom = Settings.get('txtSenderDom');
        var receiverDom = Settings.get('txtReceiverDom');
        var placeDom = Settings.get('txtPlaceDom');
        var timeDom = Settings.get('txtTimeDom');
        var itemDom = Settings.get('txtItemDom');

        $('.options-area').empty();
        $('.options-area').append(senderDom);
        $('.options-area').append(receiverDom);
        $('.options-area').append(placeDom);
        $('.options-area').append(timeDom);
        $('.options-area').append(itemDom);


        $('.q-button').attr("disabled", "disabled");

      //  var correctsNum = $('.a-button.correct').length;
      //  console.log("oikein: "+correctsNum);

        $('.a-button.correct').addClass('btn-success');
        $('.a-button').addClass('btn-danger');

        $('.options-area .a-button').removeClass('btn-primary');

        $('.check').addClass('hidden');
        $('.correct-answers').removeClass('hidden');
        $('.continue').removeClass('hidden');


    },

    showCorrectAnswers : function () {
        var corrects = this.options.variables.correctStrings;
        console.log(corrects);

        var sender = this.options.variables.correctStrings.sender;
        var receiver = this.options.variables.correctStrings.receiver;
        var place = this.options.variables.correctStrings.place;
        var time = this.options.variables.correctStrings.time;
        var item = this.options.variables.correctStrings.item;

        $('.txt-answers').empty();
        $('.txt-answers').append("<div class='bigger-correct'>"+sender+"</div>");
        $('.txt-answers').append("<div class='bigger-correct spaceTop'>"+receiver+"</div>");
        $('.txt-answers').append("<div class='bigger-correct spaceTop'>"+place+"</div>");
        $('.txt-answers').append("<div class='bigger-correct spaceTop'>"+time+"</div>");
        $('.txt-answers').append("<div class='bigger-correct spaceTop'>"+item+"</div>");

        $('.correct-answers').attr("disabled","disabled");




    },

    continue : function () {

        var playThruNum = Settings.get('playThruNum');
        Settings.set({ 'playThruNum' : playThruNum+1 });
        //console.log(Settings.get('playThruNum'));


        if(Settings.get('playThruNum') === 1){
            console.log(this);
            Settings.results = [];
            var corrects = $('.a-button.correct').length;
            var wrongs = 5 - corrects;

            Settings.results.push( [ corrects,wrongs ] );
            console.log(Settings.results);
            console.log(Settings.results[0][0] +' / '+ Settings.results[0][1]);

            var view = new TekstiviestiGameView({ model: this.model });
            view.render();

        }else if(Settings.get('playThruNum') === 2){
            var corrects = $('.a-button.correct').length;
            var wrongs = 5 - corrects;

            Settings.results.push( [ corrects,wrongs ] );



            var view = new TekstiviestiGameView({ model: this.model });
            view.render();

        }else if(Settings.get('playThruNum') === 3){
            var corrects = $('.a-button.correct').length;
            var wrongs = 5 - corrects;

            Settings.results.push( [ corrects,wrongs ] );

            var view = new TekstiviestiGameView({ model:this.model });
            view.render();
        }else if(Settings.get('playThruNum') === 4){
            var corrects = $('.a-button.correct').length;
            var wrongs = 5 - corrects;

            Settings.results.push( [ corrects,wrongs ] );

            var view = new TekstiviestiGameView({ model: this.model });
            view.render();

        }else if(Settings.get('playThruNum') === 5){
            var corrects = $('.a-button.correct').length;
            var wrongs = 5 - corrects;

            Settings.results.push( [ corrects,wrongs ] );

            var correctTot = Settings.results[0][0]+Settings.results[1][0]+Settings.results[2][0]+Settings.results[3][0]+Settings.results[4][0];
            var wrongTot = Settings.results[0][1]+Settings.results[1][1]+Settings.results[2][1]+Settings.results[3][1]+Settings.results[4][1];

            var results = {
                'pvm' : '',
                'klo' : '',
                'difficulty' : Settings.get('difficulty'),
                'data' : [
                    {
                        'name' : 'Tekstiviesti 1:',
                        'value' : Settings.results[0][0] +' oikein / '+ Settings.results[0][1]+' väärin'
                    },
                    {
                        'name' : 'Tekstiviesti 2:',
                        'value' : Settings.results[1][0] +' oikein / '+ Settings.results[1][1]+' väärin'
                    },
                    {
                        'name' : 'Tekstiviesti 3:',
                        'value' : Settings.results[2][0] +' oikein / '+ Settings.results[2][1]+' väärin'
                    },
                    {
                        'name' : 'Tekstiviesti 4:',
                        'value' : Settings.results[3][0] +' oikein / '+ Settings.results[3][1]+' väärin'
                    },
                    {
                        'name' : 'Tekstiviesti 5:',
                        'value' : Settings.results[4][0] +' oikein / '+ Settings.results[4][1]+' väärin'
                    },
                    {
                        'name' : 'Yhteensä:',
                        'value' : correctTot + ' oikein / ' + wrongTot +' väärin'
                    }
                ]
            };

            var gameId = this.model.get('gameId');



            Settings.set({ 'playThruNum' : 0 });
            var view = new ResultsView({ model: this.model, results: results });
            view.render();
        }






        //back to defaults
        var unsetButton = '<button class="btn btn-block a-button btn-danger">Et vastannut tähän</button>';

        Settings.set({'txtSenderDom':unsetButton});
        Settings.set({'txtItemDom':unsetButton});
        Settings.set({'txtPlaceDom':unsetButton});
        Settings.set({'txtReceiverDom':unsetButton});
        Settings.set({'txtTimeDom':unsetButton});
    }




});

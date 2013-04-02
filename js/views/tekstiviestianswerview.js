var TekstiviestiAnswerView = Backbone.View.extend({
    el: ( '#content' ),
    template: '#tekstiviestiAnswerTemplate',
    initialize: function () {

    },

    render: function () {

        var variables = { questions: this.options.variables.questions,
                          senders: this.options.variables.senders,
                          receivers: this.options.variables.receivers,
                          places: this.options.variables.places,
                          times: this.options.variables.times,
                          items: this.options.variables.items,
                          corrects: this.options.variables.corrects,
                          correctStrings: this.options.variables.correctStrings};
        console.log(variables);
        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);


        //navigational classes to buttons
        $('button:first').addClass('btn-primary question-sender');
        $('button:eq(1)').addClass('question-receiver');
        $('button:eq(2)').addClass('question-place');
        $('button:eq(3)').addClass('question-time');
        $('button:eq(4)').addClass('question-item');


        console.log(this.options.variables.corrects.time);

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
        $('.txt-answers').append("<div class='bigger-correct'>"+receiver+"</div>");
        $('.txt-answers').append("<div class='bigger-correct'>"+place+"</div>");
        $('.txt-answers').append("<div class='bigger-correct'>"+time+"</div>");
        $('.txt-answers').append("<div class='bigger-correct'>"+item+"</div>");

        $('.correct-answers').attr("disabled","disabled");




    },

    continue : function () {
        var view = new TekstiviestiGameView({  });
        view.render();
    }




});

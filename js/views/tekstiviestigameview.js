var TekstiviestiGameView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#tekstiviestiGameTemplate',

    render: function () {

        $('#header').html('');

        var randomMessage = this.randomMessage();

        var variables = { message : randomMessage.message, questions : randomMessage.questions,
                          senders : randomMessage.senders, receivers : randomMessage.receivers,
                          places : randomMessage.places, times : randomMessage.times,
                          items : randomMessage.items,
                          corrects : randomMessage.corrects,
                          correctStrings : randomMessage.correctStrings };


        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);


        $('.textmessage').hide();
        //todo: play txt sound

        var txtVisibleTime = 7000;

        setTimeout(
            function() {
              $('.phone').transition({
                    /*width: '1200px',
                    marginTop: '-500px'*/
                    scale: 5

                }, 2500, 'ease', function() {
                    $('.textmessage').show( function() {
                        setTimeout(
                            function () {
                                var view = new TekstiviestiAnswerView({model: this.model, variables: variables });
                                view.render();
                            }, txtVisibleTime
                        )
                    } );
                })
            },4000); //time to wait before zoom in



        return this; //render()
    },

    events: {
        'click .quit': 'quitGame'
    },

    quitGame: function () {
        this.undelegateEvents();
        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, true);

    },

    //todo: all 5 textmessages
    randomMessage: function () {

        var receivers    = ["Ida","Ilona","Laura","Mari","Noora","Pauliina","Riia","Sanni","Sini","Sonia"];
        var senders      = ["Annu","Doris","Hanna","Hilla","Minja","Minna","Nina","Siiri","Sofia","Tea"];
        var items        = ["kamera","kello","laukku","MP3-soitin","peli","pusero","pyöräilykypärä","sarjakuvalehti","takki","tennismaila"];
        var places       = ["asemalla kioskin edessä","elokuvateatterin edessä","meillä","Mäkelänrinteen uimahallissa","ostarilla McDonald'sin edessä",
                            "Puijon tornin kahvilassa","Särkänniemessä vuoristoradan luona","teillä kotona","Tilhen leikkipuistossa","Tuomarinkylän ratsastushallilla"];
        var times = [];
        for(i = 10; i < 20; i++){
           string = "kello "+i;
           times.push(string);
        }

        var questions = [
            "Kuka on tekstiviestin lähettäjä?",
            "Kuka on tekstiviestin vastaanottaja?",
            "Missä tekstiviestin lähettäjä ehdottaa tapaamista?",
            "Milloin?",
            "Mitä pitää ottaa mukaan?"
        ];


        //correct random receiver
        var randR = Math.floor(Math.random() * receivers.length);
        var randReceiver = receivers[randR];

        //correct random sender
        var randS = Math.floor(Math.random() * senders.length);
        var randSender = senders[randS];

        //correct random item
        var randI = Math.floor(Math.random() * items.length);
        var randItem = items[randI];

        //correct random place
        var randP = Math.floor(Math.random() * places.length);
        var randPlace = places[randP];

        //correct random time
        var randT = Math.floor(Math.random() * times.length);
        var randTime = times[randT];

        var corrects = { 'receiver' : randR, 'sender' : randS, 'item' : randI,'place' : randP, 'time' : randT };

        var correctStrings = { 'receiver':randReceiver, 'sender':randSender, 'item':randItem, 'place':randPlace, 'time':randTime }

       var message = "Hei " + randReceiver + "! Tavataan "+randTime+" "+randPlace+". Muista ottaa mukaan "+randItem+", jonka lainasin veljellesi! "+randSender;
       //console.log(message);
        console.log("corrects: "+randReceiver+" "+randSender+" "+randItem+" "+randPlace+" "+randTime);
       return {  message:message,
                 questions: questions,
                 receivers : receivers,
                 senders : senders,
                 times : times,
                 items: items,
                 places : places,
                 corrects : corrects,
                 correctStrings : correctStrings

       }
    }

});
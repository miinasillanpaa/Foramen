var TekstiviestiGameView = Backbone.View.extend({
    el: $( '#content' ),
    template: '#tekstiviestiGameTemplate',

    render: function () {

        $('#header').html('');

        var txtVisibleTime;
        if(Settings.get('difficulty') == 'easy'){
            txtVisibleTime = 90*1000;
        }else if(Settings.get('difficulty') == 'medium'){
            txtVisibleTime = 60*1000;
        }else{
            txtVisibleTime = 30*1000;
        }

        var randomMessage = (Math.floor((Math.random() * 5) + 1));
        var myMsg = "";

        if(randomMessage == 1){
            myMsg = this.message1();
        }else if(randomMessage == 2){
            myMsg = this.message2();
        }else if(randomMessage == 3){
            myMsg = this.message3();
        }else if(randomMessage == 4){
            myMsg = this.message4();
        }else{
            myMsg = this.message5();
        }


        var variables = { message : myMsg.message, questions : myMsg.questions,
                          senders : myMsg.senders, receivers : myMsg.receivers,
                          places : myMsg.places, times : myMsg.times,
                          items : myMsg.items,
                          corrects : myMsg.corrects,
                          correctStrings : myMsg.correctStrings };

        var template = _.template( $(this.template).html(), variables );
        this.$el.html(template);

        $('.textmessage').addClass('hidden');

        var myModel = this.model;


        var timer = setTimeout(
            function() {
                console.log(myModel);
              $('.phone').transition({
                    scale: 5
                }, 2500, 'ease', function() {
                    $('.textmessage').removeClass('hidden');
                    setTimeout(
                        function () {
                            var view = new TekstiviestiAnswerView({ model: myModel, variables: variables });
                            view.render();
                        }, txtVisibleTime
                    )

                });
            },4000); //time to wait before zoom in

        $('.quit').click( function() {
            clearTimeout(timer)
        });

        return this;
    },




    events: {
        'click .quit': 'quitGame'
    },

    quitGame: function (e) {
        this.undelegateEvents();

        var gameId = this.model.get('gameId');
        router.navigate('game/' + gameId, {trigger:true});
    },

    message1: function () {

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
        //console.log("corrects: "+randReceiver+" "+randSender+" "+randItem+" "+randPlace+" "+randTime);
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
    },

    message2: function () {
        var receivers    = ["Henrik","Juuso","Mika","Mikko","Mikko-Pekka","Patrik","Riku","Teemu"];
        var senders      = ["Aki","Jani","Jarmo","Joni","Joonas","Pasi","Pauli","Tommi"];
        var items        = ["Afrikan tähti -peliä","Gameboy-peliä","kannettavaa tietokonetta","matikan kirjaa","melaa","pesäpalloräpylää","Pokémon korttikansiota"];
        var places       = ["bänditreeneissä","kirjastossa","koripallotreeneissä","kuntosalilla","kuoroharjoituksissa","lukusalissa","mikroautoradalla","palloiluhallilla"];
        var times = [];
        for(i = 11; i < 21; i++){
            string = "kello "+i;
            times.push(string);
        }

        var questions = [
            "Kuka on tekstiviestin lähettäjä?",
            "Kuka on tekstiviestin vastaanottaja?",
            "Mikä on sovittu tapaamispaikka?",
            "Milloin?",
            "Mitä tekstiviestin vastaanottaja ei saa unohtaa ottaa mukaan?"
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

        var message = "Moro " + randReceiver + "! Nähdään "+randPlace+" "+randTime+". Älä unohda ottaa mukaan minulta lainaamaasi "+randItem+". "+randSender;
        //console.log(message);
        //console.log("corrects: "+randReceiver+" "+randSender+" "+randItem+" "+randPlace+" "+randTime);
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
    },

    message3: function () {
        var receivers    = ["Anita","Anne","Anu","Arja","Krista","Marja-Liisa","Outi","Paula"];
        var senders      = ["Eeva-Maija","Else","Heli","Liisa","Maija","Ritva","Sirpa","Terhi"];
        var items        = ["ensiapulaukun","eväskorin","hapanleipäjuuren","kahvinkeittimen","kannettavan tietokoneen","matka-TV:n","neulepuikot","taskulampun"];
        var places       = ["Karjaan","Kouvolan","Lahden","Lappeenrannan","Oulun","Rovaniemen","Seinäjoen","Suonenjoen"];
        var times = [];
        for(i = 10; i < 20; i++){
            string = "kello "+i;
            times.push(string);
        }

        var questions = [
            "Kuka on tekstiviestin lähettäjä?",
            "Kuka on tekstiviestin vastaanottaja?",
            "Minkä kaupungin asemalla kohtaamispaikka on?",
            "Milloin?",
            "Mitä tekstiviestin lähettäjä on ottanut mukaan?"
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

        var message = "Tervehdys " + randReceiver + "! Olemme junassa tulossa mökillesi. Juna on myöhässä 15 minuuttia. Tavataan "+randPlace+" asemalla noin "+randTime+". Otimme mukaan "+randItem+". "+randSender;
        //console.log(message);
        //console.log("corrects: "+randReceiver+" "+randSender+" "+randItem+" "+randPlace+" "+randTime);
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
    },

    message4: function () {
        var receivers    = ["Aku","Ilkka","Joel","Jukka","Kai","Mia","Miikka","Mikael"];
        var senders      = ["Aino","Aulikki","Helga","Heta","Kaarina","Kirsti","Kyllikki","Sylvi"];
        var items        = ["uimapuku","rantapallo","uimapatja","uimakellukkeet","Aku Ankat","pelikortit","hammasharja","piirustusvälineet"];
        var places       = ["Tampereen lentokentältä","Joensuun lentokeltältä","Jyväskylän lentokentältä","Mäntyharjun lentokentältä","Mäntyharjun asemalta",
                            "Lohjan linja-autoasemalta","Salon linja-autoasemalta","Korppoon lautaulta","Emsälön sillalta"];
        var times = [];
        for(i = 9; i < 19; i++){
            string = "kello "+i;
            times.push(string);
        }

        var questions = [
            "Kuka on tekstiviestin lähettäjä?",
            "Kuka on tekstiviestin vastaanottaja?",
            "Mikä on sovittu tapaamispaikka",
            "Milloin?",
            "Mitä tekstiviestin vastaanottaja ei saa unohtaa ottaa mukaan?"
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

        var message = randReceiver + "-kulta! Kiva kun tulet mummolaan lomalle! Haemme ukin kanssa sinut "+randPlace+" "+randTime+". Muista "+randItem+". "+randSender+ "-mummi";
        //console.log(message);
        //console.log("corrects: "+randReceiver+" "+randSender+" "+randItem+" "+randPlace+" "+randTime);
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
    },

    message5: function () {
        var receivers    = ["Ahti","Kauko","Martti","Olli","Otto","Paavo","Pentti","Pertti"];
        var senders      = ["Arto","Erik","Erkki","Esa","Harri","Karri","Kimmo","Rauno"];
        var items        = ["edellisen kokouksen pöytäkirja","ensi vuoden budjetti","ensi vuoden toimintasuunnitelma","esityslista","fläppitaulu",
                            "kalvosarja","kivennäisvettä","sanelukone"];
        var places       = ["ensimmäisen kerroksen kokoushuone","kokoushuone 4","luentosali","pohjakerroksen kokoushuone","ruokasalin viereinen kabinetti",
                            "ryhmähuone 3", "ryhmähuone 7", "takkahuone"];
        var times = ["kello 8","kello 9","kello 12","kello 13","kello 13.15","kello 14","kello 14.30","kello 15","kello 16"];

        var questions = [
            "Kuka on tekstiviestin lähettäjä?",
            "Kuka on tekstiviestin vastaanottaja?",
            "Mikä on sovittu tapaamispaikka",
            "Milloin?",
            "Mitä tekstiviestin vastaanottaja ei saa unohtaa ottaa mukaan?"
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

        var message = randReceiver + "! Joudumme sopimaan uuden kokousajan. Uusi aika on "+randTime+". Paikka on entinen "+randPlace+". Ota mukaan "+randItem+". "+randSender;
        //console.log(message);
        //console.log("corrects: "+randReceiver+" "+randSender+" "+randItem+" "+randPlace+" "+randTime);
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